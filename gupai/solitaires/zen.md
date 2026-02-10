# Game of Zen

The game is called 參禪 (Can Chan, Zen Meditation) in Chinese. It exists in several forms. The version described first is also known as Xiang Shi Fu (相十副), "Watching Ten Sets"

This is a solitaire game played with a standard 32-tile Chinese domino set. To play it, the player must be familiar with both [Classic Triplets](/gupai/classical-triplets.html) and [Classic Pairs](/gupai/tiles-and-pairs-hierarchy.html). 

The tiles are shuffled and divided into ten groups of three tiles and one group of two tiles. All tiles are placed face up. Usually, the pair is positioned in the center, surrounded by the ten triplets.

![](/docs/assets/images/gupai/zen.jpg)  
_Example of a deal_

## Basic rules

On each move, the player selects two groups and exchanges one or two tiles between them(exchanging a pair of tiles does not make much sense for triplets, but can be used to replace a pair in the middle). 

After every exchange, both involved groups must form valid combinations:

- A group of three must be a valid [classic triplet](/gupai/classical-triplets.html).
- A group of two must be a [valid pair](/gupai/tiles-and-pairs-hierarchy.html) (civilian, military, or supreme).

For example, given two groups [1:1][2:2][6:6] and [4:4][5:5][3:3] you can exchange [6:6] and [3:3] resulting in a Small Dragon and a Big Dragon — both valid triplets.

But it is not possible to exchange the same two tiles between the next two groups: [1:1][2:2][6:6] and [4:1][5:5][3:3], because although [1:1][2:2][3:3] is a proper triplet, but [4:1][5:5][6:6] is not, so this move is not allowed. 

Tiles may also be exchanged between already valid triplets, provided both remain valid after the swap.

Although the rules are simple, the game is extremely challenging in practice, especially if one is not accustomed to recognizing valid triplet patterns quickly. It is helpful to practice with a game like "[Guo Wu Guan](/gupai/solitaires/guo-wu-guan.html)" first, to develop familiarity with classic triplets.

An online implementation of the Xiang Shi Fu variant is available at:

[http://www.onlinedominogames.com/xiang-shi-fu](http://www.onlinedominogames.com/xiang-shi-fu) 

## Variants 

There are several variants of this game.

### Watching Eight Sets

Tiles are arranged into eight groups of three and four groups of two. 

At the end of the game, all four pairs must be either military pairs or the top four civilian pairs (Heaven, Earth, Human, Harmony).

![](/docs/assets/images/gupai/zen-8.jpg)  
_Eight triplets variant_

### ShangHai Variant

In this version, the tiles [4:2] and [6:4] are removed from the set. The remaining tiles are arranged into ten triplets.

At the end of the game, the triplets must be of specific types:

- Four Full Dragons
- Two Small Dragons
- Two Large Dragons
- One Gold Ingot (金元宝)
- One Silver Ingot (银元宝)

Gold and Silver Ingots are special forms of the Five Points combination:

- Gold Ingot: two [6:1] tiles and one [6:3] tile
- Silver Ingot: two [5:1] tiles and one [5:3] tile

Unlike standard triplet rules, Ingots require specific physical tiles, not merely matching pip values. Thus, [1:1][5:5][5:3] is not a Silver Ingot, even though the pip values match.

### Thematic restrictions

In the original "Watching Ten Sets" version additional constraints may be imposed.

For example: 

**Five dragons fight for the throne (五龙争位)** - The central pair must be [2:2][2:2], surrounded by five Full Dragons and five Five Sons.

![](/docs/assets/images/gupai/zen-dragons.jpg)  
_Example of a finished game "Five dragons fighting for the throne"_

**Generals in Mutual Harmony (将相和)** – The center must contain a Harmony pair ([3:1][3:1]). Every other group must be a regular triplet consisting of two identical civilian tiles and one military tile. 

## Dead groups problem and solutions 

Certain three-tile combinations can never form a classic triplet under any circumstances.Specifically, these are:

 - [1:4][2:4][3:3]
 - [1:4][2:4][4:5]
 - [1:5][2:5][3:3]
 - [1:5][2:5][4:4] 
 - [2:3][2:4][3:4]. 

If such a group appears in the initial layout, the solitaire cannot be completed. There are several solutions to this problem. One simple solution is to recognize these groups and redeal if these groups were dealt.

The most radical solution is to replace the 2-3-Kao (223366) combination with the Mixed Dragon (雜龍) combination, which consists of one two, two threes, two fours and one five (233445), for example [3:3][5:4] [4:2]. Such a dragon is exactly in the middle between the Big and Small dragons. 2-3-Kao, although a historical combination, is the least elegant of all the classical ones, so its replacement with Mixed Dragon seems quite logical. In addition, such rules are described in the Chinese Wikipedia. 

I once wrote a simulator that solved any given layout of a Zen game (with Mixed Dragon instead of 2-3-Kao). No matter how many times I ran it, it never failed to solve a deal. This suggests that it may in fact be possible to complete any layout, even when it initially appears hopeless.

## Personal note

The game of “Zen” was what originally drew me into a deeper study of Chinese dominoes. Surprisingly, almost no information about it was available in English at the time. 

I translated the rules, corresponded with the Mr. Ming FanXin (闵凡信) to clarify unclear moments. And now, fortunately, not only the rules of this game are available in English but there is also a freely available computer game, which I already mentioned. I am glad that part of this is also my merit.

## Sources 

[Rules described on Pagat](https://www.pagat.com/domino/solitaire/xiangshifu.html) 

[Rules on Chinese Wikipedia](https://zh.wikipedia.org/wiki/%E5%8F%83%E7%A6%AA_(%E9%AA%A8%E7%89%8C)) 

You may play the Xiang Shi Fu variant here: [onlinedominogames.com](http://www.onlinedominogames.com/xiang-shi-fu) 

---  

[Home](/gupai/index.html)
