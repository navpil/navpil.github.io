# Slovenské 

{% for post in site.pages %}

{% if post.language == 'sk' %}
- [{{post.title}}]({{post.url}}) {{post.date | date_to_string | date: "%Y-%b-%d"}}
  {{ post.excerpt }}
  {% endif %}
{% endfor %}