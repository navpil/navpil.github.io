---
tags:
 - geek
source: medium
language: en
title: Testing of DELETE method in JMeter together with Data Preparation
---
HTTP DELETE method is, probably, the trickiest to test out of other CRUD operations, because in order to test it the resources to be deleted need to be pre-created.
Update (PUT) and get methods can use the fixed set of resources and get/update them all the time. 
Create (POST) method requires nothing upfront, however it requires correct data clean-up, which is just another facet of the above stated problem.

Please note - JMeter may run tests in parallel, which is specified by "Number of Threads", and many times in a row, which is specified by "Loop Count" or "Duration".
And every DELETE call requires some data already be created, otherwise you might test 404 response codes and not actual deletes.
So how to correctly set up data for usage in DELETE tests?

There are several approaches you can take.

## Don't test DELETE calls

The simplest one of all, fully in spirit of [Lazy Developer Manifesto](https://github.com/navpil/lazy-developer-manifesto).
Are you sure you actually need to test DELETE calls performance?
Are these calls causing the most issues?
Are they so often used?

Anyway - you do some DELETE calls in your "tearDown Thread Group" (you do use tearDown and setUp Thread Groups, don't you?).
If there is some performance issue - you might see it there.

However, as stated above, correctly deleting all the created data is just another facet of testing the delete calls.
Maybe you simply can't ignore the DELETE calls.

## Test in scenario

Do you actually need to test DELETE calls in isolation?
Maybe you might test them in some scenario: entity created, retrieved, updated and then deleted.
If this is an approach you can take - create a Thread Group, which has several Http Samplers.
First one would be creating, last one would be deleting.

If you can go with this approach - take it.
Obviously this does not test how would 500 DELETE calls perform in parallel. 
It will often test how 100 POST, 300 GET and 100 DELETE calls perform together.
Maybe that's what you need.

But what if not?
What if requirement is actually testing DELETE calls in isolation?

## Synchronizing Timer

A tempting thing to do is to create a single Thread Group as stated above and then put a Synchronizing Timer before the DELETE calls.
But if you configure the Timer so that it will wait for all threads, then there will be a sudden burst of DELETE requests against the server.
No ramp up time specified in Thread Group configuration will be taken into an account.
This is most likely not what you want.

You may make the bursts be smaller by specifying the amount of threads being locked up until they are released.
But this is not much different from the previous solution.
Still many DELETE calls will run in parallel with POST and GET.
Just there will be more DELETE calls in a mix for a while.

You may still play with this solution, for example providing some Sleep element with a random amount of sleep time.
There may be some other ways of providing a ramp up time.
But all these solutions will not make use of a built-in ramp up functionality already existing in Thread Group and look like hacks.

## Two thread groups

You may create two Thread Groups.
One will be for creation and another one for deletion.

For this solution to work you first must configure JMeter to run these Thread Groups consecutively.
Then you must ensure that number of runs for the first group will be the same as for the second group.
This means - same amount of "Number of Threads".
This also means using "Loop Count" and not the "Duration" setting for a Thread Group.
If you use the Duration it is very likely that you will get different amount of POST vs DELETE calls, because they will perform differently.
Please note - however you specify that a Thread Group should run multiple times, be it Loop or Duration, JMeter will first run the first Thread Group many times and then a second Thread Group many times. 
So, given A and B are thread group names, it will not be `A, B, A, B`, but it will be `A, A, B, B`.

If you may provide an ID for the resource (say Books) yourself then make it in a form `BOOK_${__threadNum}_OF_${counter}` and use the same name in both Create and Delete calls.
Where the `__threadNum` is a built-in variable and `counter` is a variable created by a "Counter" config element which we add to both Thread Groups.
You must set up the Counter element so that it does not reset on every loop and is not shared between threads. 

If you can't provide an ID yourself, then you will have to be more creative and save the IDs in some shared map/array.
For example, it can be `Map<Integer, Map<Integer, String>>` and then save identifiers in this map and get them by
`map.get(${__threadNum}).put(${counter}, PARSED_ID_FROM_RESPONSE)` and `map.get(${__threadNum}).get(${counter})` syntax.
I haven't actually tried it, so don't take my word for it, I just suppose something like this should be possible.

Why not put creation in a `setUp Thread Group`?
The reason is that setUp/tearDown Thread Groups are not reconfigured by wrapper tools, such as Blazemeter, and we want both Thread Groups run exactly the same amount of times.

This is a working, but a fragile solution.
It depends on many things setup correctly.
It also requires to pass a person who runs the test an esoteric knowledge that Duration should not be used for specifying Multiple Runs.

Is there something simpler?

## Pre-setup lots of data

In a way this is similar to the previous solution, for example we should use the same naming convention, or map as above.
However, there are differences and this solution looks less fragile and more brute force.

Creation of Books in this solution are done in a `setUp Thread Group`, which means that wrappers over the JMeter (such as Blazemeter) will treat them specially and not try to override the defaults. 
Here lots of Books will be created, so that the actual Thread Group which tests DELETE can safely delete them.
The main Thread Group can be both run in a Loop or Duration mode - this does not matter as long as lots of data is created.
It's a good idea to parametrize the `setUp Thread Group` so that we can prepare enough of data.
After the actual test is run, we need to delete all the left-over data.
We can simply use the same parameters for the `tearDown Thread Group` as for the `setUp Thread Group` and nevermind all the 404 we get when trying to delete an already removed element.

As an example: suppose we want to run 300 concurrent threads for data deletion for 5 minutes. 
We assume that this will require not more than 10000 records for each thread.
This means we parametrize the `setUp Tread Group` with 300 Users and 10000 Loop Count.
During actual test about 4000 Books were deleted by each thread.
Now the `tearDown Thread Group` will try to delete 10000 records for each thread, and each thread will get four thousand 404s and six thousands 200 OK responses.

This solution allows specifying Duration for running the actual Delete calls.
It also does not break the semantics of a Thread Group - because the previous solution treated it as an actual test, even though it was a mere preparation.
However, it requires an excessive data creation, which may be an overkill.
There is also an esoteric knowledge - that the `setUp/tearDown Thread Group` should be parametrized with some appropriate values.
Choosing those values is not a straightforward task.
We may allow not to choose those and set the default values to some maximum amount, such as 10_000 and 1000_000; it is viable, but not desirable.

## Afterword

All the previous solutions have their pros and cons.
It's up to you which one to choose.
I chose the [Two Thread Groups](https://github.com/navpil/java-examples/blob/master/jmeter/HttpDeleteExample.jmx) solution (link goes to the jmx example).
Maybe there is some obvious and simple solution which I missed.
But unfortunately searching through Internet did not give any viable solution to my problem.

I'm definitely not an expert of JMeter.
I was just given a task and was surprised that there was no obvious way of doing that.
If you have any other solutions, I'm open to suggestions.
