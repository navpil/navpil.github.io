# Kol-ye-si

Kol-ye-si (골여시) is a Korean game in which the banker will lose if the player follows a perfect strategy. Perhaps this is one reason why the game eventually disappeared.

The rules were recorded by Stewart Culin in his work _Chinese Games with Dice and Dominoes_.

## Rules 

The game is played with a set of 32 tiles. The players compete against the banker.

Each player receives one tile and places a bet; the banker must match all bets. The banker then draws two tiles. If the banker’s two tiles are identical (in Gu Pai terminology, a civil pair), the banker immediately wins all bets.

Otherwise, each player chooses to take one or two additional tiles. After that, the banker and all the players reveal their tiles. 

Both the banker and each player total the number of pips on their tiles, divide the sum by ten, and take the remainder as their score (modulo ten scoring). Since this is a Korean game, the tiles [4:2] and [2:1] are not wild; they count at face value as 6 and 3 points respectively.

- If a player’s score is higher than the banker’s, the player wins.
- If it is lower, the banker wins and takes the bet.
- If the scores are equal, it is a draw and both sides keep their stakes.

![](/docs/assets/images/gupai/kol-ye-si.jpg)  
_Example of a game, banker has 7 points, one player won, one player lost, other players are at a draw_

## Rules Analysis 

At first glance, the banker appears to have an advantage, since a civil pair allows the banker to collect all bets immediately. However, the player’s freedom to choose both the bet size and whether to draw an additional tile provides a much stronger advantage in practice.

If the bet size is not strictly limited and can vary widely, an optimal long-term strategy is surprisingly simple: 

Bet one chip on all hands except when holding the tile [6:5], in which case bet the maximum (for example, ten chips). In all cases, choose to draw one additional tile.

Although this strategy seems overly simple, it is profitable in the long run.

If the bet size is limited or fixed, the optimal strategy becomes less obvious — but a winning strategy [still exists](https://github.com/navpil/gupai/blob/master/src/main/java/io/github/navpil/gupai/mod10/kolyesi/ComputerKolYeSiWeightedPlayer.java) . 

## Sources 

[Rules described by Culin](https://healthy.uwaterloo.ca/museum/Archives/Culin/Dice1893/kolyesi.html) 

---  

[Home](/gupai/index.html)
