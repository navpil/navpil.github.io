# When you should use floating point for money (yes you read it right)

Using floating point arithmetic for money sounds like heresy to most developers (if it doesn’t to you, then please read the first part carefully). But I will explain my point.

But let’s start from the beginning.

## Why you should NOT use floating point for money

If you already know why, safely skip this part and go right to the next one.

When we study programming we learn that there are two numeric types — the integer one, mostly used for counting and the floating point one, like float, intended for measuring. Integers don’t have a decimal part, so when you need whole numbers, like the number of cows, you use integers. If you need a decimal part, like a cow’s tail length, you use floats. So far so good.

Things get tricky when you get to money. Since you count money and not measure it, theoretically you should use integers. But then you have those pesky currencies with decimals, like dollars, euros and pounds. And an inexperienced programmer switches to floats since it seems natural to him. Unfortunately floats are not exact in some circumstances. This has something to do with how floats are represented in the computer. It uses binary and representing 1/10th in binary exactly is as tricky as representing 1/3rd in decimals. I will not explain this in the details, read the articles listed at the end of the page — those are great.

But just to show a very simple example, try adding 0.1 + 0.2 in your favorite language. You will see something like this:

    0.1 + 0.2 = 0.30000000000000004

I hope you can already spot the problem. Yes, adding 0.1 to 0.2 is not equal to 0.3. And that’s an issue for counting money, as with money we should be exact.

So what should we do?

One obvious solution is to use integers and calculate everything in cents. This, however, does not solve all the problems and is also not too convenient. So some languages introduce a special type, which is called BigDecimal in Java, other languages get libraries which produce a similar result. BigDecimal is slower than float, but you can be sure that if you add 0.1 and 0.2 you get 0.3.

    jshell> new BigDecimal(“0.1”).add(new BigDecimal(“0.2”))
    $1 ==> 0.3

We should always represent money in BigDecimals. That’s true. No doubts.

## Why you should use floating point for money

Start by asking yourself a philosophical question — how to equally divide one dollar by three people. Pause for a moment, let that sink in. See the problem? It’s not 0.33 or even 0.3333333 dollars. We will always get some rounding errors, whatever we do.

But let’s get back to our BigDecimals and let’s divide and multiply by three:

    jshell> var three = new BigDecimal(“3”);
    jshell> int scale = 10;
    jshell> new BigDecimal(“1”)
    .divide(three, scale, RoundingMode.HALF_EVEN)
    .multiply(three);
    $3 ==> 0.9999999999

We divide by three (using scale 10) and this is evaluated to 0.9999999999

If we used higher scales we would simply get more nines.

What do doubles (higher precision floating point in Java) do?

    jshell> 1.0 / 3 * 3
    $4 ==> 1.0

Not only is the code easier to read, it is actually more correct. You may rarely need to divide money by three and then multiply it again, I agree. But please note, that while BigDecimals shine when adding and subtracting, they do not shine that much when dividing. If there is some complicated algorithm calculating money, you may get into a situation, where doubles will behave better. By the way, if we used integer cents here, then we would be restricted to simple 33 cents, which is worse than BigDecimals.

But now it will get even worse. Let’s say we have a bank which provides 7.25% yearly percentage, calculated monthly with compound interest. How much will you get, when you put 1000$ into your account? This is the actual formula:

    1000 * (1 + 0.0725 / 12)¹²

If you don’t quite understand what is going one here, let me briefly explain. 7.25% is a yearly percentage. So if you want to calculate how much you get per month you should divide 7.25% by 12 — and those will be your percentages per month. However, for the next month you do not simply multiply the original amount by this percentage, but you should add to your 1000$ those few bucks you already earned the previous month. This is called APY (Annual Percentage Yield), you may search for this term if you want to understand better. And this is why the formula is more complicated than simple multiplication and it contains power 12.

We may still use BigDecimals for this calculation, even if it contains some rounding when dividing 0.0725 by 12 (I chose inconvenient numbers on purpose). Let’s check whether results differ for BigDecimals and doubles?

BigDecimals:

    jshell> new BigDecimal(“0.0725”)
    .divide(new BigDecimal(“12”), 10, RoundingMode.HALF_EVEN)
    .add(BigDecimal.ONE)
    .pow(12)
    .multiply(new BigDecimal(“1000”));
    $13 ==> 1074.958297848728823269576854642820845552668698844685655864635757560108099580669023520110760163309451351513655054283518161000

doubles:

    jshell> Math.pow(1 + 0.0725 / 12, 12) * 1000
    $14 ==> 1074.9582974213286

Note that numbers differ only in the seventh position after the decimal point. Maybe BigDecimal is better here (true to say I did not check), but the difference is not big. The (approximate) actual yield (APY) here is 7.496%:

    jshell> new BigDecimal(“0.0725”)
    .divide(new BigDecimal(“12”), 10, RoundingMode.HALF_EVEN)
    .add(BigDecimal.ONE)
    .pow(12)
    .subtract(BigDecimal.ONE);
    $9 ==> 0.074958297848728823269576854642820845552668698844685655864635757560108099580669023520110760163309451351513655054283518161

which is, logically, higher than the originally stated 7.25%.

Now comes the interesting part. Given the APY of 7.496%, let’s calculate the initial percentage. Technically we should simply do the reverse. This is how it would look with doubles.

    jshell> (Math.pow(0.07495829 + 1, 1.0/12) — 1) * 12;
    $10 ==> 0.07249999305446053

Pretty close.

Killer question — how to do the same calculation with BigDecimals? Answer: it’s impossible. BigDecimal.pow expects integer as an argument. Not floats. BigDecimals are simply not created for float roots. Nor for logarithms. Basically what you can safely do with BigDecimals are addition, subtraction and multiplication. Even division is problematic. There is no API for doing anything more complex.

## Conclusion

Working with money may be problematic. It cannot be perfect even theoretically (try dividing one dollar by three people) and numbers are often rounded. Using floats for representing money is definitely a bad idea. However — sometimes we simply have to resort to floats depending on a calculation we need.

Oh, and, by the way, you should be happy that the original British money system is more than 50 years gone. Simply imagine if we had to deal with this (note the 12-base):

    2 farthings = 1 halfpenny
    2 halfpence = 1 penny
    3 pence = 1 thruppence
    6 pence = 1 sixpence
    12 pence = 1 shilling
    2 shillings = 1 florin
    5 shillings = 1 Crown (5s)

If you have found any errors, or you think I’m fundamentally wrong, I’m open to discussion

Great resources for understanding floating point arithmetic and when it can bite you:

https://introcs.cs.princeton.edu/java/91float/

https://docs.oracle.com/cd/E19957-01/806-3568/ncg_goldberg.html

Website with British money prior to 1971:

http://projectbritain.com/moneyold.htm

