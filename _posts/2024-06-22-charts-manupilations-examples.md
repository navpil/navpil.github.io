---
source: medium
tags:
  - misc
title: "Як дурять графіками. Обрані маніпуляції."
---
Для того, щоб підкріпити свою думку, люди часто використовують графіки. 
Але часто ці графіки малюються не дуже чесно і вони можуть ввести в оману.

В цій статті я наводжу типові маніпуляції з графіками, на які вам треба зважати. 
Також покажу декілька абсурдних графіків, які не несуть жодної цінності, але все одно використовуються в підтвердженні своїх тез

Певним чином це неформальне продовження статті "Поширені помилки з відсотками, що дорого коштують", яку, втім, не обов'язково читати для розуміння цієї статті.

## Графік, обрізаний знизу

Це - найпоширеніша маніпуляція з графіком, коли в місці, де має бути нуль, зовсім не нуль.
Бо цілком можливо, що графік, котрий має вигляд чудового росту прибутку:

![Графік росту](/docs/assets/images/charts-manipulations/graph-rist.png)

виявиться зовсім не таким захоплюючим, якщо його намалювати з правильним нулем:

![Графік росту з правильним нулем](/docs/assets/images/charts-manipulations/real-y.png)

Що відбулося? В першому графіку замість нуля стоїть число 9950, тому зріст з 10000 на 10100 вражає.
Хоча насправді це лише одновідсоткове зростання, як майже не помітне, якщо в нуль координат, таки поставити число нуль.

В таких графіках, звісно, є зміст.
Так, наприклад, зручніше спостерігати за курсом росту акцій.
Але якщо вам хтось демонструє графік, завжди дивіться, яке число стоїть на початку координат.
Якщо там не нуль, то, можливо, вас хочуть надурити.

## Графік обрізаний по боках

Це - друга найпоширеніша маніпуляція з графіками.
В ній є зміст, тому що якщо по іксу ми показуємо час, то якщо ми не хочемо показувати дані за всю історію, то все одно в якийсь момент маємо зупинитися.
Так часто показують історію курсів валют.
Але питання в тому - де ми зупиняємося і чи ми, бува, не обрали маніпулятивні дані.

Якщо ми повернемося до графіка з попереднього прикладу, котрий показував безпрецедентний ріст, то ось, як він виглядає, якщо додати трохи більше даних.
Як виявилося, ріст був лише в січні-липні, але цьому передувало сильне падіння:

![Графік падіння](/docs/assets/images/charts-manipulations/real-x.png)

Якщо ціль була - показати зростання за рік, то так робити, звісно, можна, хоча можна все одно вказати на те, що порівняно з минулим роком прибутки впали. Але якщо графік використовується, щоб довести якусь тезу, то будьте уважними - він може бути обрізаним по іксу.

Я колись [читав статтю](https://zbroya.info/uk/blog/7838_pavlo-fris-pravo-gromadian-na-zbroiu-pro-et-contra/), в котрій переконували, що треба дозволити вільне носіння вогнепальної зброї, тому що в Великій Британії кардинально зріс рівень злочинності після заборони такого вільного носіння.

![Графік росту злочинності](/docs/assets/images/charts-manipulations/uk-graph-ban.png)

Хоча насправді, якщо розширити графік по координаті ікс, тобто додати більше історії що з одного, що з іншого боку, то [все виглядало інакше](https://skeptics.stackexchange.com/questions/40697/did-the-uk-homicide-rate-go-up-after-handgun-ownership-was-banned).

![Графік злочинності](/docs/assets/images/charts-manipulations/uk-gun-ban-large.png)

Загальний рівень злочинності ріс і до того, а в тому місці, де в статті вирішили графік "зупинити", то злочинність насправді почала падати.

Якщо когось цікавить - то і з цим графіком не все гаразд. Сплеск злочинності у 2003му - це просто статистична аномалія, пов'язана з особливістю реєстрації злочинів у Великій Британії.

## Графік, що показує відносні величини

В залежності від того, що люди хочуть донести, вони малюють або абсолютні числа, або відносні.

Почну з відносних.
Ось графік, який показує відсотки, що платять багаті і бідні. 
Але без вказування абсолютних значень (https://texty.org.ua/articles/111518/ukrayinci-z-vysokymy-zarplatamy-platyat-menshi-podatky-nizh-ti-hto-zaroblyaye-malo-u-rozvynenomu-sviti-navpaky/)

![Відносні значення податків](/docs/assets/images/charts-manipulations/medium_4.original.png)

Теза статті, що багаті платять менше, ніж бідні.
І дійсно - якщо вірити цьому графіку, багаті платять менше.
Питання того, як маніпулюють відсотками і податками, я підіймав у попередній статті про відсотки.
Але для прикладу, ось як виглядає графік, якщо його перевести в абсолютні числа.

![Абсолютні значення податків](/docs/assets/images/charts-manipulations/podatky-absolutni.png)

Тут очевидно, що багаті аж ніяк не платять менше податків.
І що звинувачувати людину, котра платить в десятки, а то й в сотню разів більше податків у тому, що вона платить їх менше, якось безглуздо.

## Графік, що показує абсолютні величини

Але можна робити і навпаки - малювати абсолютні числа, де вартувало б малювати відносні.

Поширеною тезою в західних соц-мережах є графіки, котрі порівнюють ріст зарплат і ріст цін на нерухомість.
Часто ці графіки виглядають ось так.

![Ріст цін](/docs/assets/images/charts-manipulations/nerukhomist-example.png)

І дійсно - схоже, що червона лінія росте швидше, ніж синя - яка несправедливість!
Ми бідніємо, бо зарплати ростуть повільніше!
Проблема в тому, що червона лінія росте настільки ж швидко, як і синя.
Значення по синій лінії є рівно в п'ять разів менше ніж по червоній.
Але для людей це не очевидно, бо ми - не комп'ютери і не вміємо сприймати таку інформацію очима.

## Графік, в якому одна з величин - взагалі неправильна 

Ще продовжимо говорити про ріст ціни за нерухомість.

Якщо попередній графік я намалював сам, то наступний графік [був намальований в статті]((https://www.visualcapitalist.com/median-house-prices-vs-income-us/), що описувала ту ж проблему - ціни на нерухомість ростуть швидше ніж зарплати.

![Housing Gap](/docs/assets/images/charts-manipulations/OC-U.S.-Income-Housing-Gap_Feb14.jpg)

Тут вони навіть цілком чесно намалювали, що різниця між двома величинами на початку графіку складала 3.5, а в кінці - 5.8.
Здавалося б - вони праві.
Де ж каверза?

Каверза в тому, що ціни на нерухомість вказані не за метр квадратний, а за будинок в цілому (median sale price).
А середні розміри будинків з 1984 до 2022 виросли приблизно на 60%.
Що і дає основну зміну графіка з 3.5 до 5.8 (якщо до 3.5 додати 60%, то виходить 5.6).
Тобто люди хочуть купувати більші будинки, але при цьому жаліються, що вони дорожчі ніж малі.
І основна причина росту ціни на нерухомість - це не ріст ціни за квадратний метр, а ріст бажаних квадратних метрів.
Якщо б графік використовував не ціну за будинок, а ціну за квадратний метр, то виявилося б, що впродовж усього цього періоду ціна то росте, то падає і переважно лишається в таких самих межах.

Це - не зовсім звичайна маніпуляція.
І її трохи складніше вирахувати і її не так часто використовують.
Але завжди враховуйте, що реально показує графік.
І думайте - чого він не показує.

## Абсурдний графік №1: падіння показується як ріст

Про те, що відсотки підступні, я вже писав у статті про відсотки.
Цей графік показує всю абсурдність порівняння негативних відсотків.

![Ріст ВВП](/docs/assets/images/charts-manipulations/rist-vvp.jpg)

Зверніть увагу - зміна динаміки падіння ВВП з -31% до -10% вже показується як ріст, бо намальований жовтеньким кольором.
Хоча насправді це просто падіння ВВП на 10%.

Та й ріст у 19% ВВП хоч і є позитивним явищем, але якщо порахувати, що це порівнюється з минулорічним показником падіння на 37% (адже, щоб нас ще більше заплутати, ВВП в цьому графіку порівнюється поквартально), то це навіть не вихід на попередні показники.
Зверніть увагу на підзаголовок - "реальний ВВП зріс на 0.8%" - хоча з графіку цього не видно взагалі.

## Абсурдний графік №2: ріст показується, як його відсутність

Цей графік підписаний так: "Шість місяців ціни не ростуть"

![Ріст ВВП](/docs/assets/images/charts-manipulations/polski-bank.jpeg)

А сам графік показує, що інфляція падає.
Інфляція, котра падає - це добре, але поки інфляція - не нуль, то ріст цін продовжується.
З цього графіка можна зробити висновок, що ціни ростуть повільніше, але не те, що ціни не ростуть взагалі.

Що найгірше - що цей графік, як і попередній, не показує порівняння з минулим місяцем, але лише порівняння з тим самим місяцем минулого року.
Такі графіки взагалі не є інформативними.
Як виявилося, ціни дійсно не ростуть, але для того, щоб це показати, краще було б намалювати графік інфляції, що порівнюється з минулим місяцем.
Тоді б на графіку була гарна пряма лінія в нулі і все було б ясно.
А так - інфляція є, вона падає, ціни ніби і ростуть, але ніби не так швидко, а може і взагалі не ростуть, а може і падають.
Нічого не ясно.

Це, звісно, не єдині маніпуляції з графіками. 
Якщо вам відомий інший цікавий приклад, буду радий про нього почути.