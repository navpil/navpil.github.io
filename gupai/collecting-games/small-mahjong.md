# Small Mahjong

Original name is 打小麻将 (Da Xiao Ma Jiang). This game was described on one of the Chinese blogs about Chinese dominoes. Unfortunately, it didn't say where this game came from, so it's not known if it's an old popular game or a modern, little-known creation. The game tries to imitate Mahjong. For example, the tiles there are laid out in the shape of a wall, just like in real mahjong (although technically it is not necessary). 

![](/docs/assets/images/gupai/mahjong-deck.jpg)  
_Small Mahjong deal in progress_

To begin with, it is necessary to explain what combinations are used in this game, because such combinations are used only here. Just like in classic triplets, triplets in Small Mahjong are also counted as six values, regardless of which tile they are on. Each triplet counts as two times three values. Three values can be of only two types: 

 - A set, that is, three identical values, for example 3-3-3
 - A straight, that is, three consecutive values, such as 3-4-5

Accordingly, each triplet can belong to three types: 

 - Double set (双同), which is technically identical to the classic Split triplet, for example [2:2][2:5][5:5] – one set of 2-2-2 plus one set of 5-5-5.
 - Double straight (双连), such as [1:2][3:4][3:5] (1-2-3 + 3-4-5) or [2:5][3:3][4: 4] (2-3-4 + 3-4-5)
 - Set and Straight (连同) but their values cannot match, i.e. [2:3][5:4][5:5] (2-3-4 + 5-5-5) is a valid combination, and [3:4][5:4][4:4] (3-4-5 + 4-4-4) – no, because there is a four in both of them.

![](/docs/assets/images/gupai/mahjong-set-set.jpg)  
_Examples of Double sets_

![](/docs/assets/images/gupai/mahjong-straight-straight.jpg)  
_Examples of Double straights_

![](/docs/assets/images/gupai/mahjong-set-straight.jpg)  
_Examples of Set-and-Straight_

3 to 4 people play. Each player receives five tiles. The player must collect two combinations of three tiles each. Each turn, the player takes one tile and either lays out a winning combination or places one tile in the center. A player can take either a closed tile from the wall or a last discarded tile. However there are special rules as to who has the right to take the last discarded tile: 

 - Double Straight is formed - only the next player can take the last discarded tile
 - Set-and-Straight is formed - only two next players can take the last discarded tile
 - Double Set is formed - anyone can take the last discarded tile
 - Any combination which results in a win - anyone can take the last discarded tile

In case several players can take a last discarded tile then the nearest player has a preference. Technically it can be done this way - people in counter-clockwise order say whether they want to pick the last discarded tile and if no one wants it, then the next player takes a closed tile from the wall. 

The game continues in a counter clock-wise direction from the player who took the last discarded tile, if there was one. If no one took the last discarded tile, then the game continues in the usual way - the next player takes the closed tile and either wins or discarded the tile. Please note - same as in Mahjong turn can pass across the table, since under some circumstances any player can take a last discarded tile, so the game is not strictly counter-clockwise and some players will miss their turn. 

The player who collects two combinations first wins. A Double Set combination is worth 3 points, a Set-and-Straight is worth 2 points, and a Double Straight is worth 1 point. 

All other players pay the corresponding number of chips to the winner. Or you can just write down the points. 

## Rules Analysis 

A computer simulation of this game showed that with a good game, the number of draws is less than 5 percent. In a four-player game, the winner is often determined before the start of the third round. That is, the game does not last too long. Of course, this is just a computer simulation and it may take longer for real people. 

## Sources 

Unfortunately, this blog is no longer available, and [webarchive](https://web.archive.org/) does not archive these sites. But just in case, I will leave the link here: [http://blog.sina.com.cn/s/blog_62969d840100ucdk.html](http://blog.sina.com.cn/s/blog_62969d840100ucdk.html) and this blog was called either Warburg Radar or HuaBaoLeiDa. 

---  

[Home](/gupai/index.html)
