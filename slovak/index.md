# Slovenské 

Prežil som na Slovensku šesť rokov.
Bol som vtedy študentom a písal veľa pesničiek a poviedok, ale tie väčšinou boli v Ukrajinčine alebo v Ruštine.
Ale je trochu aj toho, čo som napísal po-Slovensky.

Písal som na prednáškach a seminároch poviedky.
Moji spolužiaci si mysleli že som veľmi poctivý študent a všetko píšem.
Poviedka [Ružomberok](ruzomberok.html) je napísaná v tom istom štýle,

Takisto na seminári bola napísaná paródia na Marketingové skratky [TÚPS Analýza](tups_analyza.html).

Napísal som dve pesničky - jedna tiež na ekonomickú tému - [A je po obchode](a-je-po-obchode.html).
Druha - [Doje\*\*\*\*](doje.html) nie je príliš slušná, a je o bordeli.

Ako paródia na zákony, ktoré som tiež študoval, napísal som [Zákon o súkromnom záchode](zakon_o_zachode.html).
Mal som plán ho vytlačiť a zavesiť na záchodových dveriach, ale nikdy som to neurobil.

Ak máte radi cestovať mestskou dopravou, možno oceníte moju [Iniciatívu MHD Úsmev](mhd_usmev.html).

Tu zoznam ešte raz:

{% for post in site.pages %}

{% if post.language == 'sk' %}
- [{{post.title}}]({{post.url}}) {{post.date | date_to_string | date: "%Y-%b-%d"}}
  {{ post.excerpt }}
  {% endif %}
{% endfor %}