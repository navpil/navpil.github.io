# Da Ling

Da Ling (打零, "play zeroes") is, in my opinion, the most elegant of all gambling games. It is also the only gambling game in which the casino, or banker, is not directly involved in settling the bets.

## Rules 

The game is played with a set of 32 tiles. The banker draws two tiles and places them face up on the table; these are the **table tiles**. If there is no banker, one of the players simply places two tiles face up on the table instead.

Each player receives six tiles. The maximum number of players is five; in that case, all tiles are dealt and none remain.

The two table tiles determine the conditions of the game. The **target score** is calculated using the modulo ten rule (only the last digit of the total counts). When calculating the table score, the tiles [4:2] and [2:1] are counted at face value — that is, as 6 and 3 points respectively.

If there are four or more red pips on the table, the game is considered "red"; otherwise, it is "black". This is the game where the color of the pips is important.

Each player divides their six tiles into three groups:

- one single tile,
- one pair (two tiles),
- and one set of three tiles.

The aim is to make each group equal in points to the table score.

Unlike in the table calculation, the tiles [4:2] and [2:1] are wild in the players’ hands. A player may count them as either 3 or 6 points.

The stakes are fixed:

- one-tile group - 3 chips,
- two-tile group - 7 chips,
- three-tile group - 15 chips.

_Note: in modern gameplay this can be simplified to 1, 2 and 3 chips respectively._

After all players have arranged their tiles, the hands are revealed and the winner is determined.

## Determining the Winner

First, it is checked whether any player has matched the **target score** in all three groups. Such a player is the **absolute winner** and takes all bets.

If more than one player achieves this, they compare the number of pips in the **color of the game**:

- red pips in a red game,
- black pips in a black game.

The player with more pips of the relevant color wins.

If there is no absolute winner, each group is evaluated separately.

For each group:

- The player whose group matches the target score wins that group’s stake.
- If multiple players match the score, the number of pips of the game’s color is used as a tiebreaker.
- The winner of a group collects all bets for that group (for example, all 3-chip stakes for the one-tile group).

If a tie still remains after counting colored pips, the rules do not specify what happens. A simple solution would be:

- If absolute winners tie, treat it as if there were no absolute winner and evaluate by groups.
- If a group cannot produce a clear winner, the bets for that group remain with the players.

## Game examples 

### Example 1

Suppose the table shows [6:6] and [3:2]. There are six red pips (the pips on the double-six also count), so the game is red. The table score is 7: (12 + 5 = 17 → discard the tens → 7).

Suppose one player has the following groups:

- [4:3]
- [6:5][5:1]
- [1:1][6:3][3:3]

Each group totals 7 points, so this player can be considered an absolute winner.

But suppose a player B has:

- [5:2]
- [6:6][4:1]
- [2:2][2:2][5:4]

Then both players qualify as absolute winners, and the red pips must be counted (since the game is red).

First player: 4+1+1+1 = 7 red pips.
Second player: 6+4+1+4 = 15 red pips.

Therefore, the second player wins.

![](/docs/assets/images/gupai/da-ling.jpg)  
_Example of a red table, banker has 7 points_

### Example 2

Suppose the table shows [6:5] and [2:1]. There is only one red pip, so the game is black.

The table score is 4: 11 + 3 = 14 → discard the tens → 4. [2:1] is counted at face value.

Assume no player manages to match 4 points in all three groups. The evaluation is therefore done group by group.

In the first group:

- One player has [2:2],
- Another has [3:1].

Both total 4 points, but [2:2] has more black pips, so that player wins. If on the other hand both players had [2:2], then the group would be tied and no one would collect the bets.

In the second group:

- One player has [4:2][6:5]. He may count [4:2] as 3 points, giving him 4 total.
- Another player has [6:6][1:1].

Even if both total 4, the first player wins because he has more black pips (13 versus 6).

The third group is resolved in the same way.

## The Banker's Role

In the traditional rules, the banker does not participate in determining the winner.

However, there is one special rule: if a player is the absolute winner and takes all bets, he must give one chip to the casino. Since each player stakes a total of 25 chips, in a five-player game the absolute winner would collect 100 chips and pay one chip to the house.

With this rule, the casino can never lose and can only profit.

When played at home, of course, there is no casino fee.

Source: [Book about games played in Macao](https://books.google.com.ua/books/about/Jogos_brinquedos_e_outras_divers%C3%B5es_pop.html?id=m5mf6kxo2L4C&redir_esc=y) 

---  

[Home](/gupai/index.html)
