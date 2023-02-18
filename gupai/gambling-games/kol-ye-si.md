# Kol-ye-si

Kol-ye-si (골여시) is a Korean game in which the banker loses if the player plays perfectly. Maybe that's why this game disappeared. 

The rules of the game are given by Stewart Culin in his work on Chinese Games with Dice and Dominoes. 

## Rules 

A set of 32 tiles is used. Players play against the banker. Players get one tile each and make bets, the banker has to match them all. The banker takes two tiles. If these two tiles are the same (or in Gu Pai terminology - a civil pair), then the banker immediately wins all the bets. Otherwise, each player chooses one or two tiles at their discretion. After that, both the banker and the players reveal their tiles. 

Each player and banker divides the number of spots on their tiles by ten and takes the remainder, which is their points. Since the game is Korean, the tiles [4:2] and [2:1] are not jokers and are worth 6 and 3 respectively. If the player has more points than the banker, he wins. If it is less, then the banker wins and takes the bet for himself. If it's the same, then both of them keep their stakes. 

![](/docs/assets/images/gupai/kol-ye-si.jpg)  
_Example of a game, banker has 7 points, one player won, one player lost, other players are at a draw_

## Rules Analysis 

Although it would seem that the banker has an advantage, because with a civil pair he takes all the bets, but the player's ability to independently choose the bet and the number of tiles that he selects gives a much greater advantage. 

If the size of the bet is not strictly limited and can vary significantly, then the winning strategy is to bet one chip for any layouts, except for the tile [6:5], where you have to bet all ten chips. In any case, choose to draw a single additional tile. It would seem that this is an extremely simple strategy, but, nevertheless, it is profitable in the long run. 

If the amount of the bet is limited, or even fixed, then the winning strategy is not so obvious, but, nevertheless, it is [present](https://github.com/navpil/gupai/blob/master/src/main/java/io/github/navpil/gupai/mod10/kolyesi/ComputerKolYeSiWeightedPlayer.java) . 

## Sources 

[Rules described by Culin](https://healthy.uwaterloo.ca/museum/Archives/Culin/Dice1893/kolyesi.html) 

---  

[Home](/gupai/index.html)
