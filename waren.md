# War in Ukraine explained

{% for post in site.posts %}
 {% if post.tags contains 'war' and post.language == 'en' and (post.handling != 'special') %}
- [{{post.title}}]({{post.url}}) {{post.date | date_to_string | date: "%Y-%b-%d"}}
  {{ post.excerpt }}
  {% endif %}
{% endfor %}