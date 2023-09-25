# Усі статті

{% for post in site.posts %}
  - [{{post.title}}]({{post.url}}) {{post.date | date_to_string | date: "%Y-%b-%d"}}
  {{ post.excerpt }}
{% endfor %}