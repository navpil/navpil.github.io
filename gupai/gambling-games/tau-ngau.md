# Tau Ngau

Tau Ngau (鬥牛) is a game that depends almost entirely on luck; the player’s main task is simply to avoid making mistakes. The name is usually translated as Bull Fight, which can cause confusion with Ding Niu, another game sometimes translated the same way.

## Basic rules 

The game is played with a full set of 32 tiles.

Each player, including the banker, receives five tiles.

From these five tiles, the player must choose three whose total number of pips is divisible by ten (i.e., the sum leaves no remainder when divided by ten). These three tiles are set aside and are called the “bull.”

The player then adds the pips on the remaining two tiles and takes the remainder modulo ten. If the remainder is zero, it counts as ten.

If a player cannot form a bull, his hand is worth zero points (a true zero this time, not ten as before). 

The banker performs the same procedure. After that, each player compares his hand with the banker’s hand.

![](/docs/assets/images/gupai/tau-ngau.jpg)  
_Example of.a hand with a Bull (above) and without (below), the top hand values 6 points_

As in most Chinese domino games, the tiles [4:2] and [2:1] may be counted as either 3 or 6 points, at the player’s discretion.

## Settlement - version 1

In the first version of the settlement, the stakes are fixed and equal for all players.

- If a player fails to form a bull, he pays the banker four bets.
- If the player forms a bull and his hand is higher than the banker’s, he receives the bet multiplied by the difference between the two hands.
- If his hand is lower, he pays the banker the difference.
- If the hands are equal, no one pays.

Take an example:

Suppose the player’s remaining tiles are [6:5][4:1], the total is 16, which gives 6 points (16 minus 10).

- If the banker failed to form a bull, the player receives six bets (6 − 0 = 6).
- If the banker formed a bull and has [6:6][4:4], totaling 20 (which counts as 10), the player pays four bets (10 − 6 = 4).
- If the banker has [1:3][1:1], also worth 6 points, no one pays.
- If the banker has [5:4][2:2], totaling 13 (worth 3), he pays the player three bets (6 − 3 = 3).

Interestingly, in this version a player can lose more money by forming a bull than by failing to do so. For example, if the player forms a bull and scores only 1 point ([5:4][1:1]) while the banker scores 10, he pays nine bets. If he fails to form a bull, he pays only four bets.

This means that it matters whether the banker sets aside his bull before or after the players, but the rules do not specify this.

Another unusual feature is that a player without a bull always pays the banker, even if the banker also fails to form a bull.

These rules come from the book _Jogos, brinquedos e outras diversões populares de Macau_. Unfortunately, the author’s description is somewhat unclear, so there may be inaccuracies.

## Settlement - version 2 

According to the description on the Pagat website, zero always counts as zero, bets are not multiplied, and each player chooses his own stake independently.

Players compare their hands with the banker’s:

- The higher hand wins.
- If both fail to form a bull, or if their hands are equal, it is a draw and no money changes hands.
- If one forms a bull and the other does not, the one who formed the bull wins.

This version is much more balanced, but arguably less dramatic.

In this variant, the role of banker passes to the next player if the banker successfully forms a bull. Otherwise, the banker remains the same.

## Analysis 

There is very little strategy in Tau Ngau. The main objective is simply to find three tiles that total 10, 20, or 30.

The only real mistake a player can make is using a wild tile ([4:2] or [2:1]) in the bull when it would be better used to improve the value of the remaining two tiles. If time is limited, a player may overlook a better combination.

If the player always finds the optimal combination (when one exists), then in the Pagat version the casino appears to have no advantage. According to the rules in the Portuguese book, the advantage may even lie slightly with the player.

## Sources 

[Description of the game on Pagat](https://www.pagat.com/domino/adding/taungau.html) 

[Book about the games played in Macao](https://books.google.com.ua/books/about/Jogos_brinquedos_e_outras_divers%C3%B5es_pop.html?id=m5mf6kxo2L4C&redir_esc=y) 

---  

[Home](/gupai/index.html)
