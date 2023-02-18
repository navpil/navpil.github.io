# Game of Zen

The game is named 參禪 in Chinese. There are several options in this game. The one that is described first is also called Xiang Shi Fu (相十副) "Watching ten sets". 

This is a solitaire game, i.e. for a single person, with one standard set of Chinese dominoes and to play it a player should know both [Classic Triplets](/gupai/classical-triplets.html) and [Classic Pairs](/gupai/tiles-and-pairs-hierarchy.html) . The dominoes are randomly distributed into ten groups of three and one group of two. Then all the dominoes a turned over. Usually the pair is in the middle and the triplets surround it. 

![](/docs/assets/images/gupai/zen.jpg)  
_Example of a deal_

The rules of the game are simple - with each turn, the player can choose two groups and exchange one or two tiles between them. Exchanging a pair of tiles is meaningless for triplets, but can be used to replace a pair in the middle. 

After such an exchange, both groups must belong to one of the valid triplet types if it is a group of three tiles, or be a correct pair (military, civilian, or supreme) if it is a group of two. 

For example, given two groups [1:1][2:2][6:6] and [4:4][5:5][3:3] you can exchange [6:6] and [3:3] and so get a big and a small dragon. But it is no longer possible to exchange these two tiles between the next two groups: [1:1][2:2][6:6] and [4:1][5:5][3:3], because although [1:1][2:2][3:3] is a proper triplet, but [4:1][5:5][6:6] is not proper one, so this move is forbidden. You can exchange tiles between already existing triplets if both triplets remain correct afterwards. 

On the one hand, the rules are quite simple. On the other hand, this game is very difficult to play, especially if you are not used to seeing all those right triplets. You might want to start by playing a game of " [Guo Wu Guan](/gupai/solitaires/guo-wu-guan.html) " to get used to what the triplets might be like. You can try to play "Zen" here: 

[http://www.onlinedominogames.com/xiang-shi-fu](http://www.onlinedominogames.com/xiang-shi-fu) 

## Variants 

There are several variants of this game. 

Watching eight sets - to arrange the tiles into eight groups of three and four groups of two. At the end of the game, all four pairs must belong to either the military or the top four civilian pairs (ie Heaven, Earth, Human, and Harmony). 

![](/docs/assets/images/gupai/zen-8.jpg)  
_Eight triplets variant_

The Shanghai variant removes the following tiles from the deck: [4:2] and [6:4]. After that, lay out ten groups of three tiles. At the end of the game, not only must all tiles be correct triplets, but they must be of specific types – four Full Dragons, two Small Dragons, two Large Dragons, one Gold Ingot (金元宝) and one Silver Ingot (银元宝). Gold and Silver Ingots are two special variants of Five Points. A Gold Ingot is two [6:1] plus one [6:3], and a Silver Ingot is two [5:1] and one [5:3]. Contrary to the usual Triplet rules, Ingots require specific tiles, not only specific values, which means that [1:1][5:5][5:3] is not a Silver Ingot, even though pip values there are the same. 

In the original version, you can also come up with additional restrictions for ten triplets and one pair. For example, the following game options are offered: 

Five dragons fight for the throne (五龙争位) - the end result should be a pair [2:2][2:2] in the middle, and it should be surrounded by five Full Dragons and five Five Sons . 

![](/docs/assets/images/gupai/zen-dragons.jpg)  
_Example of a finished game "Five dragons fighting for the throne"_

Generals in Mutual Harmony (将相和) – there must be a Harmony pair in the middle ([3:1][3:1]), all other triplets except that they must be regular, each must have two identical tiles. That is, in other words, there must be two identical civilian and one military tile in each group. 

## Dead groups problem and solutions 

There are some groups of three tiles, which, no matter what, cannot be turned into a classic triplet. Specifically, these are [1:4][2:4][3:3], [1:4][2:4][4:5], [1:5][2:5][3:3], [1:5][2:5][4:4] and [2:3][2:4][3:4]. If such a group is found in the layout, then solitaire cannot be finished. There are various solutions to this problem, such as remembering these groups and redealing the tiles if such group is found in the layout. 

The most radical solution is to replace the 2-3-Kao (223366) combination with the Mixed Dragon (雜龍) combination, which consists of one two, two threes, two fours and one five (233445), for example [3:3][5:4] [4:2]. Such a dragon is exactly in the middle between the Big and Small dragons. 2-3-Kao, although a historical combination, is the least elegant of all the classical ones, so its replacement with Mixed Dragon seems quite logical. In addition, such rules are described in the Chinese Wikipedia. 

I once wrote a simulator that solved any given layout of a Zen game (with Mixed Dragon instead of 2-3-Kao). No matter how many times I ran it, there was no time it couldn't solve the deal. That is, there is a possibility that in fact any deal can be finished, even if it seems difficult at first glance. 

I would like to add that this game - "Zen" - became the impetus that forced me to explore Chinese dominoes more deeply, because, strangely enough, nothing was known about this game on the English-speaking Internet. I translated the rules, corresponded with the Mr. Ming FanXin (闵凡信) to clarify unclear moments and now, fortunately, not only the rules of this game are available in English but there is also a freely available computer game, which I already mentioned. I am glad that this is also my merit. 

## Sources 

[Rules described on Pagat](https://www.pagat.com/domino/solitaire/xiangshifu.html) 

[Rules on Chinese Wikipedia](https://zh.wikipedia.org/wiki/%E5%8F%83%E7%A6%AA_(%E9%AA%A8%E7%89%8C)) 

You may play the Xiang Shi Fu variant here: [onlinedominogames.com](http://www.onlinedominogames.com/xiang-shi-fu) 

---  

[Home](/gupai/index.html)
