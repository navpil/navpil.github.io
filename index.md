# Навпіл-сайт

Також мене можна знайти на [Medium](https://medium.com/@navpil), 
[Wordpress](https://navpil.wordpress.com/) 
та [Facebook](https://www.facebook.com/dmytro.polovynka)

Мої пісні можна знайти на [YouTube @DmytroPolovynka channel](https://www.youtube.com/@dmytropolovynka)
та на [Music Cloud zavtra_sereda](https://soundcloud.com/zavtra_sereda)

Articles about Russia invading Ukraine are collected on the [War In Ukraine Explained]({% link waren.md %}) page

Description of Chinese Dominoes can be found on a [GuPai fun site](https://gupai.wordpress.com/)

My GitHub account is [navpil](https://github.com/navpil)

Ігри:

 - [З монетками]({% link games/coins.md %})
 - [З кубиками]({% link games/dice.md %})

Блог:

{% for post in site.posts %}
  {% if post.language == 'ua' and (post.handling != 'special') %}
  - [{{post.title}}]({{post.url}}) {{post.date | date_to_string | date: "%Y-%b-%d"}}
    {{ post.excerpt }}
  {% endif %} 
{% endfor %}


