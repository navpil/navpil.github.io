# Fox, Geese & Co

Hunt games are games where players play with different armies - one plays with a large number of weak pieces, or hunters, and the other with a small number of strong ones, or prey. The hunters' goal is to catch prey, and in some games - to fill a fortress. The prey's goal is to prevent the hunters from doing so. To balance such different armies, prey is given the opportunity to beat the hunter by jumping over him (as in checkers), and hunters are often limited in their moves.

Fox and Geese is a popular European hunt game, which is played on a special cross-shaped field, and the pieces move along lines. Originally there was one fox and thirteen geese. But over time, people began adding a second fox, increasing the number of geese, changing the size of the board, or adding a special part - a fortress - that the geese must fill to win. Such variants may have different names - for example Wolves and Sheep, or Siege (Asalto).

These games were not standardized and different sources give different rules. Most computer implementations are based on a single variation with minimal possibility of changing the rules, and some games are not implemented at all. That is why I decided to write a small program that allows you to try these games right in the browser, in which you can choose different rule options, different boards, and also adjust the number of pieces on the field yourself. And thanks to this program I understood that 13 geese are indeed enough to defeat the fox, and seven foxes (officers) are too many for the game of "Officers and Sepoys".

## Program description and settings

The main variants are: ["Fox and Geese"](index.html?preset=GEESE) - the classic variant; ["Wolves and Sheep"](index.html?preset=SHEEP) - a game with two wolves, where the sheep must fill the fortress; ["Asalto"](index.html?preset=ASALTO), or "Siege" - where there are more hunters, but they have even more limited moves; "Great Siege" or ["Officers and Sepoys"](index.html?preset=SEPOYS) - a variant of "Asalto" on a large board; and ["Fox and Geese" on a large field](index.html?preset=RHOMBUS) - the least popular game of all. Additionally, the game ["Catch the Hare"](index.html?preset=HARE) is included - which is played on a square Alquerque board and is probably the ancestor of all the above games. Regardless of the game, all hunters in this program are called geese, and prey - foxes.

Most of the rules can be changed - for example, whether geese can move backwards, or whether they can move sideways, how they move in the fortress, etc. As there are many variants of the rules, there are also many settings. For example, one of the variants of "Officers and Sepoys" allows horizontal movement for geese in the fortress, but only the last line, other horizontal movements there are prohibited. In order to play according to such rules, you need to check the option "Last line" in the section "Geese can move horizontally inside fortress".

In the settings, you first need to turn on the game option (rule preset) itself, then you can change the following settings:

 - Can the geese move freely on the board anytime (standard for fox and geese)
 - If not, whether they can move sideways, i.e. horizontally (the most common rule)

There are "asalto" variants, where you can always move horizontally, if you want to play like that - turn on the previous setting, because by default in "asalto" sideways movement is prohibited.

The following settings apply to movement in the fortress, if movement is not regulated by the rules defined above:

 - Can you move backwards inside the fortress
 - Can you move horizontally in the fortress and if so, on which lines

For example, in some "Asalto" variants, you can move forward and backward inside fotress, but no horizontal movements in the fortress are allowed.

By default, the computer plays the fox, and the geese move first. This can also be changed in the "Settings".

It is possible to set if the capture is mandatory. If it is mandatory, and the player does not capture but moves differently, then one of the foxes is removed from the board ("huffed").

In the settings, you can change the number of pieces on the board - to do this, you need to click on the piece, and then click on the field where you want to put it. So, for example, you can increase the number of foxes in "Officers and Sepoys", or change the initial position of the foxes in "Fox and Geese".

The computer can enter a closed loop of repeating the same moves - to prevent this the option "Repetition is loos for geese" can be enabled. Then, if during the last forty-five moves the situation on the board is repeated three times, then this will be a loss for geese. Then the computer, if playing for the geese, will avoid repetitions.

The section "Conditions for filling the fortress" is special. The rules do not usually specify what will happen if the fortress is full, but not only with geese. There are three options to choose from - the fortress should be filled with geese only; geese and immobilized foxes; geese and foxes, even if they are not immobilized. The second option is selected by default, as the most logical. To make the geese task harder, you can choose the first option.

And finally, there are settings for the AI. Please note that the computer plays better as the fox, because when playing the geese you need to calculate the position strategically, which this primitive "brute force" algorithm cannot do. The computer plays a little differently each time, because the moves are processed in a random order.

You can choose who the computer plays for - for geese or for foxes. You can choose both options, or neither. Then you can watch how the computer plays against itself, or, respectively, play with one of your friends. Playing for geese is more interesting, because filling the fortress or immobilizing the fox can be perceived as a puzzle, while playing for foxes is more trivial. In addition, as already mentioned, the computer plays better for foxes.

Next are two parameters that can be a little confusing. The first parameter - "depth" - says how many moves the computer calculates in advance. The larger the number - the "smarter" the computer. If you set the number to more than 5, the browser may start to hang - this partly depends on the computer computational power, but not too much. The second parameter - "width" - says how many moves from the available ones need to be calculated in general. The smaller this number, the more likely the computer will make a "human" error, missing an obviously good move - and this applies more to geese than to foxes, simply because they have a larger number of moves in general. If you set this number too high, the computer will calculate the probabilities for all available moves, which in itself is not a problem. After a certain limit, increasing the "width" parameter does nothing.

If you want to play against a rather primitive computer, set the depth value to 2, and the width to 10, or even less. To play with a smarter opponent, I advise you to gradually increase the values up to 5 and 100, respectively. You can increase the values even further, but keep in mind that the browser may freeze.

The last parameter - the speed of the computer movement - only indicates what are the pauses that should be made when the computer plays with itself, or when it makes multiple captures - so that it is easier for a person to follow it. 500 milliseconds is a good value, but to speed up the simulation it can even be set to zero.

After any changes, do not forget to save them.

To start the game again, click the "Restart" button. The "Stop" and "Continue" buttons are only needed when the computer plays with itself.

## What options to try

In "Officers and Sepoys": increase the number of foxes (officers) to four, or even five. Forbid geese (sepoys) from moving horizontally along all lines except the last line of the fortress. Allow geese to move freely in the fortress.

In "Asalto": allow horizontal movement of geese on the entire field - this, however, gives a great advantage to geese, but such rules are often used. Change the initial location of foxes. Forbid horizontal movement across the entire field, but allow horizontal movements in the fortress.

In "Fox and Geese": increase the number of geese to 15, or 17, but prohibit backward movements, allowing only horizontal movements - such rules are often found online. In this case, if the fox breaks through the fence of geese, consider this as the defeat of the geese (the program will not do this automatically).

In "Wolves and Sheep": remove one sheep from the last row - this somewhat balances the game. Remove another sheep if you want to make the task of the geese (sheep) even more difficult.

In "Fox and Geese" on a large field: increase the number of geese by two more. Allow the geese to move around the field in all directions. Add another fox, but add another row of geese - find the right balance for the two foxes. This is the least researched game of all the above.

In "Сatch the Hare", reduce the number of geese (hunters) to eleven or ten.

The previous tips are based on real rules that you can find. But, of course, you can experiment with different variations of the rules as you like.

Now it's time for you to play [Fox and Geese](index.html?preset=GEESE) yourself.
