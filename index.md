# Навпіл-сайт

Також мене можна знайти на [Medium](https://medium.com/@navpil), 
[Wordpress](https://navpil.wordpress.com/), 
[Facebook](https://www.facebook.com/dmytro.polovynka) 
та [Highload Today](https://highload.today/uk/author/dmytro-polovynka/)

Мої пісні можна знайти на _(my music can be found on)_ [YouTube @DmytroPolovynka channel](https://www.youtube.com/@dmytropolovynka)
та на [Music Cloud zavtra_sereda](https://soundcloud.com/zavtra_sereda)

Articles about Russia invading Ukraine are collected on the [War In Ukraine Explained]({% link waren.md %}) page

Description of Chinese Dominoes can be found on a [GuPai fun site](https://gupai.wordpress.com/)

My GitHub account is [navpil](https://github.com/navpil)

Here are my [BoardGameGeek threads](https://boardgamegeek.com/threads/user/1391611?parenttype=boardgame).

Мої фото знаходяться тут _(my photos can be found on)_ [Flickr](https://www.flickr.com/photos/198108909@N05/)

Ігри:

 - [З монетками]({% link games/coins.md %})
 - [З кубиками]({% link games/dice.md %})
 - [Нарди]({% link games/nardi.md %})

Блог:

{% for post in site.posts %}
  {% if post.language == 'ua' and (post.handling != 'special') %}
  - [{{post.title}}]({{post.url}}) {{post.date | date_to_string | date: "%Y-%b-%d"}}
    {{ post.excerpt }}
  {% endif %} 
{% endfor %}


