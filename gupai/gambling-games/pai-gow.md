# Pai Gow

Pai Gow (牌九) is one of the most famous games played with Chinese dominoes. In fact, when purchasing a set of Chinese dominoes, it is often labeled specifically as a "Pai Gow set."

The basic idea of the game is quite simple. It is played with a set of 32 tiles. Each player places a bet, and the banker must match each bet individually. All players, including the banker, receive four tiles.

From these four tiles, each player forms two groups of two tiles. One group will rank higher and the other lower. The player does not choose which is higher or lower arbitrarily — if the two groups are different, their rank is determined naturally according to the hierarchy described below. 

_Note: I avoid using the word pair for these groups, so as not to confuse them with the Civil and Military pairs in the traditional terminology._

After the groups are formed, all players reveal them.

Each player’s groups are compared with the banker’s groups: the higher group is compared with the banker’s higher group, and the lower group with the banker’s lower group. These are essentially two separate mini-contests.

- If the player wins both comparisons, he wins the bet.
- If he wins only one comparison, the result is a push (draw), and both the player and the banker keep their bets.
- In all other cases, the player loses to the banker.

There are no ties in an individual mini-contest. Any technical tie is considered a win for the banker - this is the house advantage.

## Group Hierarchy

The complexity of Pai Gow lies in the ranking of the groups. However, if you are already familiar with the [hierarchy from Tien Gow](/gupai/tiles-and-pairs-hierarchy.html), it becomes much easier.

The highest group is the **Supreme Pair**, followed by the **Civil pairs** in descending order, and then the **Military pairs**.

![](/docs/assets/images/gupai/paigow-pairs.jpg)  
_Pai Gow pairs hierarchy, Left to Right, Top to Bottom_

Next come two special combinations found only in Pai Gow: Wong and Kong.

- **Wong** consists of a double-six or double-one combined with a Nine ([6:3] or [5:4]). Combinations containing double-six rank higher than those containing double-one.
- **Kong** is similar but lower than Wong. It consists of a double-six or double-one combined with an Eight (either the military eight or the civilian double-four). Again, combinations with double-six rank higher than those with double-one.

The superiority of double-six over double-one follows naturally from the following rules.

![](/docs/assets/images/gupai/paigow-wongs.jpg)  
_Wongs_

![](/docs/assets/images/gupai/paigow-kongs.jpg)  
_Kongs_

## Ordinary Hands

All other groups are scored by adding the total number of pips on both tiles, dividing by ten, and taking the remainder (modulo ten). The group with the higher remainder wins.

When calculating totals, the tiles [4:2] and [2:1] may be counted as either 6 or 3 points, at the player’s discretion.

If both groups have the same remainder, then the highest-ranking tile in each group is compared. The standard tile hierarchy (as in Tien Gow) is used, with Civil tiles ranking above Military ones. The highest tile is double-six, and the lowest is [2:1].

If the highest tiles are also identical, the result is a technical tie — which in practice means a win for the banker.

Importantly, in this comparison only the higher tile of each group matters. The lower tile plays no role. For example, the groups [6:5][5:1] and [6:5][4:2] are considered equal: both total 7 (modulo ten), and their highest tile is [6:5]. The fact that [5:1] ranks higher than [4:2] is irrelevant. This is a technical tie and therefore a banker’s win.

## Additional information

There are many detailed guides online explaining optimal strategies for dividing tiles into groups. If you are interested, they are easy to find.

It is also easy to find opportunities to play Pai Gow - not only in casinos, but also online or through smartphone apps. Simply search for "Pai Gow".

There is also a simplified "home" or "family" version of Pai Gow. In this variant, each player receives two tiles and compares hands directly. This version is purely a game of luck and is sometimes played casually with children, for example to distribute candy during celebrations.

## Sources 

[Pai Gow on Wikipedia](https://en.wikipedia.org/wiki/Pai_gow) 

[Pai Gow on Pagat](https://www.pagat.com/domino/partition/paigow.html) 

Since Pai Gow is very well known, a search will produce many results. Just be careful not to confuse it with Pai Gow Poker, which is a card game.

---  

[Home](/gupai/index.html)
