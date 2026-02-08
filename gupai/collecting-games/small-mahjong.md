# Small Mahjong

The original name of this game is 打小麻将 (Da Xiao Ma Jiang). It was described on a Chinese blog devoted to Chinese domino games. Unfortunately, the blog did not indicate the origin of the game, so it is unclear whether it is an old traditional game or a relatively modern and little-known invention.

The game attempts to imitate Mahjong. For example, the tiles are arranged in the shape of a wall, just as in real Mahjong (although technically this is not necessary).

![](/docs/assets/images/gupai/mahjong-deck.jpg)  
_Small Mahjong deal in progress_

## Combinations

Before describing the gameplay, it is necessary to explain the special combinations used in Small Mahjong, because they are unique to this game.

Just like with Classic Triplets, a triplet in Small Mahjong is counted as six values, regardless of the specific tiles involved. Each triplet consists of two groups of three values. A group of three values may be one of two types:: 

 - A set - three identical values, for example 3-3-3
 - A straight - three consecutive values, such as 3-4-5

Accordingly, each triplet can belong to three types: 

 - Double set (双同), which is identical to the classic Split triplet, for example [2:2][2:5][5:5] – one set of 2-2-2 plus one set of 5-5-5.
 - Double straight (双连), such as [1:2][3:4][3:5] (1-2-3 + 3-4-5) or [2:5][3:3][4: 4] (2-3-4 + 3-4-5)
 - Set and Straight (连同), but the numerical values may not overlap. For example [2:3][5:4][5:5] (2-3-4 + 5-5-5) is a valid combination. The next combination: [3:4][5:4][4:4] (3-4-5 + 4-4-4) is invalid, because the value 4 appears in both groups.

![](/docs/assets/images/gupai/mahjong-set-set.jpg)  
_Examples of Double sets_

![](/docs/assets/images/gupai/mahjong-straight-straight.jpg)  
_Examples of Double straights_

![](/docs/assets/images/gupai/mahjong-set-straight.jpg)  
_Examples of Set-and-Straight_

## Gameplay

The game is played by three or four players. Each player receives five tiles.

The goal is to collect two triplet combinations (each consisting of three tiles).

On each turn, a player draws one tile and then either:

- declares a win (if two valid combinations are complete), or
- discards one tile to the center.

A player may draw either:

- a face-down tile from the wall, or
- the most recently discarded tile.

However, special rules determine who may claim the last discarded tile:

- If the discarded tile forms a Double Straight, only the next player may take it.
- If it forms a Set-and-Straight, either of the next two players may take it.
- If it forms a Double Set, any player may take it.
- If it completes a winning hand, any player may take it.

If several players are eligible to claim the tile, priority goes to the nearest player in counter-clockwise order. In practice, players may announce in counter-clockwise order whether they wish to claim the discard. If no one does, the next player draws from the wall.

The turn order proceeds counter-clockwise from the player who claimed the discard. If no one claimed it, the next player in order draws from the wall as usual.

As in Mahjong, turns can “jump” across the table, since under certain conditions any player may claim the last discard. Therefore, the game is not strictly sequential, and some players may miss turns.

## Scoring

The first player to complete two combinations wins.

The combinations are worth:

- Double Set — 3 points
- Set-and-Straight — 2 points
- Double Straight — 1 point

All other players pay the winner the corresponding number of chips, or simply record the points.

## Rules Analysis 

Computer simulation suggests that the game rarely ends in a draw (less than 5% of games). In a four-player game, a winner is often determined before the beginning of the third round, meaning the game tends to be relatively short.

Of course, these results are based on simulation. Real-world play may last longer.

## Sources 

The original blog is unfortunately no longer available, and it was not archived by the Wayback Machine. For reference, the link was: 

[http://blog.sina.com.cn/s/blog_62969d840100ucdk.html](http://blog.sina.com.cn/s/blog_62969d840100ucdk.html) 

The blog was titled either Warburg Radar or HuaBaoLeiDa.

---  

[Home](/gupai/index.html)
