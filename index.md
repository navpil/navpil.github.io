# Навпіл-сайт

Ігри:

 - [З монетками]({% link games/coins.md %})
 - [З кубиками]({% link games/dice.md %})

Блог:

{% for post in site.posts %}
  - [{{post.title}}]({{post.url}})
{% endfor %}

