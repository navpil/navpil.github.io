# Почесне консульство Шумеру

Тут подані усі статті про Шумер, зазвичай це - переклади шумерських текстів на українську.

{% for post in site.posts %}
 {% if post.tags contains 'sumer' %}
- [{{post.title}}]({{post.url}}) {{post.date | date_to_string | date: "%Y-%b-%d"}}{% if post.exts != nil and post.exts != empty%}; backups({{post.exts.size}}){% endif %}
  
{{ post.excerpt }}
  {% endif %}
{% endfor %}