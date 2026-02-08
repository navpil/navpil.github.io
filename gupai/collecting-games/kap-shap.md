# Kap Shap

Kap Shap (夾十), usually translated as “Grasp Tens,” is a Chinese collecting game described by Stewart Culin. It is played by two players with a single set of 32 Chinese dominoes.

The first player receives eight tiles (since he is not allowed to take an already exposed tile on the very first move), and the second player receives seven. The remaining tiles form a face-down deck.

During a turn, a player may first take any previously discarded tile into his hand and discard another tile. After that, he must draw one tile from the deck and discard again. In this way, a player may effectively take two tiles during a single turn. The only exception concerns the first player at the very beginning of the game: since he already holds eight tiles, he must first discard one tile, then draw from the deck, and discard again.

At any moment, if a player holds a winning combination of eight tiles, he lays them down and declares victory.

A winning hand consists of: 

 - An eye - two identical tiles (in other words, a civil pair)
 - Three pairs of tiles such that the total pip value of each pair equals 10 or 20 (i.e., divisible by ten).
 
 For scoring purposes, the tile [4:2] always counts as 3 points.

![](/docs/assets/images/gupai/kap-shap.jpg)  
_Example of a winning hand, "eye" is on the left, three pairs which divide by ten - on the right_

## Many players variant 

There is also a multi-player version called Kap Tai Shap (夾大十), “Grasp Many Tens.” It follows the same general principles, with several differences:

- It may be played by many participants (from 2 up to 20 or even more).
- Multiple decks are used — approximately two decks for every five players.
- Because several decks are in play, the “eye” may consist of identical military tiles as well.
- The first player receives 10 tiles; all others receive 9.
- A winning hand consists of an eye plus four pairs (instead of three).

![](/docs/assets/images/gupai/kap-tai-shap.jpg)  
_Example of a winning hand, "eye" is on the left, four pairs on the right, [4:2] counts as three points_

## Rules Analysis 

Since the game was recorded by Culin, there are reasons to question whether the description is entirely accurate.

First, the fact that a player may take two tiles per turn is unusual. This mechanic is more typical of fishing games. In most collecting games, a player must choose either to take the last discarded tile or to draw from the deck — not both in the same turn.

Second, the rule allowing a player to take any previously discarded tile (not just the most recent one) is highly unusual. No other known collecting game grants such freedom. To be fair, the Western card game Canasta allows a player to take the entire discard pile under certain conditions, but this is still very different from simply choosing any individual tile at will.

If you think about it: under the “take any tile” rule, each subsequent player has a better chance of winning than the previous one, because more discarded tiles are available to choose from. In Kap Shap, assembling a winning hand is not particularly difficult if a player has a broad selection of tiles.

Using a simulator, I experimented with Kap Tai Shap played by ten players with four decks. Under Culin’s rules, the game frequently ends in the very first round, on average around the eighth player’s turn. This is hardly surprising: by then, that player may choose from seven previously discarded tiles. Some players may not even get a meaningful chance to compete. It seems unlikely that experienced players would not have noticed such a pattern.

If one instead applies more “classical” collecting-game rules — that is, allowing only one tile to be taken per turn, and if a discard is taken, only the most recent one — the duration of the game more than doubles. With the same number of players, it usually lasts about two full rounds.

In the two-player version (Kap Shap), the contrast between rule sets is less dramatic, since both players are on more equal footing. With Culin’s rules, the game lasts on average about three rounds (roughly 5–6 moves). With the more classical restriction, it lasts around four rounds (8–9 moves).

From this, I would draw the following conclusion: the game can technically be played either according to Culin’s description or according to more conventional collecting-game mechanics. However, in games with many players, Culin’s version tends to end too quickly. It therefore seems more plausible that, in practice, a more restrictive rule was used. For that reason, I would recommend adopting the classical limitation in multi-player play.

That said, a computer simulator is not a human table. Actual results in live play may differ.

## Sources 

[Game description by Culin](https://healthy.uwaterloo.ca/museum/Archives/Culin/Dice1893/kaptaishap.html) 

---  

[Home](/gupai/index.html)
