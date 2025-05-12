# Почесне консульство Шумеру

Тут подані усі статті про Шумер, зазвичай це - переклади шумерських текстів на українську.

{% for post in site.posts %}
 {% if post.tags contains 'sumer' %}
- [{{post.title}}]({{post.url}}) {{post.date | date_to_string | date: "%Y-%b-%d"}}
  {{ post.excerpt }}
  {% endif %}
{% endfor %}