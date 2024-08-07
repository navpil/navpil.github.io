# Функціональщина дуже простими словами

Два протилежні підходи - імперативний і функціональний - тезіс Черча(лямбди)-Тюрінга(машина Тюрінга) - обидва підходи аналогічні, хоча працюють зовсім по різному.
Є ще декларативний - але він стоїть осторонь - типу SQL/Prolog

Функціональщина - це не просто List.stream().filter().collect(). 

Функції вищого порядку (передавати фукнції в функції і навіщо це треба - приклад рефакторінгу, коли ми виносимо в метод внутрішню частинку, але іноді треба винести зовнішню частинку (як приклад навести будь який аспект, наприклад котрий створює транзакцію, або логує час виконання).

Рекурсія, іммютабіліті і чисті функції стають абсолютно логічними в цій парадигмі.
Рекурсія замінює цикли (технічна проблема стеку та tail-recursion)

Чисті функції - приймають іммютабл параметри і вертають іммютабл. В них немає бути сайдефектів - ані зміни параметрів, ані якихось зовнішніх викликів.
Їх дуже легко тестувати. 
Усе ІО/mutability має бути строго обмеженим (а не навпаки) - ми маємо чітко бачити де ці "червоні зони".
Навіть ІО може бути монадою. Наприклад IO<User> = DBCall.prepareGetUser(). Якщо ми вертаємо IO прямо з АПІ, то це вже функція фреймворку вирішити коли і як виконувати це ІО.

Ми можемо зробити IO.map, так само як ми можемо використовувати Optional.map, а функція, котра перетворює юзера на список його машин - є чистою. І її можна потестувати не залежно від того, в якому `map` вона була використана.

З чистими функціями пов'язане immutability.
Мало того - в чистій фукнціональщині немає змінних, лише константи. А то й їх немає - можна обійтися лише параметрами до функції.

З immutability пов'язана рекурсія. 

Це дає thread-safety просто з коробки.

Порівняти if vs ternary operator - другий вертає значення.

Все має вертати значення, тому що інакше - це не функціональщина. Саме тому if/case має теж вертати якесь значення.

Без технічних деталей
Монади можна сприймати як конвеєри, або коробки з невідомим значенням, але ми можемо змінювати значення всередині навіть не знаючи його - різниця між map/flatMap - насправді майже лише технічна.
Приклади монад - Optional/Mono/Future/Function/Callalble навіть List - хоча це трохи дивна Монада. 
В джаві майже все, що є параметризоване дженеріками можна вважати монадами.

Розв'язка монади часто робиться pattern-matching. Саме тому в нас є патерн-матчінг в функціональщині. Наприклад

match(monad_value):
   case IOSuccess[User:user] -> print (user.name)
   case IOException[String:message] -> print ('Error : ' + message)

Чим вона конкретно допомагає в реальному програмуванні? Чисті функції - легше тестувати, чисті об'єкти (без багатьох залежностей) - теж.
Ще один інструмент декомпозиції та рефакторінгу - винесення методу навпаки (стратегія і команда)

--------------------

Backward compatibility

API - forever; return objects, never array or primitives (you can add metadata later); if a change requires using array instead of single object - add another field, keep old one for backward compatibility; usually you're not in the position to inform your clients of a backward incompatible change, you're not Google.

SQL - data is important; always add, never remove; always widen, never narrowing; do not rename; think about - "will older version of code work with this DB?"




Мінус функціональщини - для наї треба щоб інакше працювали мізки. Навіть для простих задач треба почесати голову. Наприклад - як поміняти парні і непарні елементи списку місцями - в імперативному це робиться на раз-два. А такі приклади, як fib(n) = fib(n-1) + fib(n-2) - це просто жах, тому що там іде експоненційний ріст складності.

-------------

Functions, which do not exist in scope of objects - something like Utils (in scala it's companion objects), objects do not manage themselves, they are managed from outside. No mutators- but new copies
New copies allow optimisation - for example zero copy clone

Challenges: io, performance (fib example), changing nature of time

Mutations are isolated

DTOs don't need getters

Tuples


Змінюється стан всієї програми з часом, а не стан конкретних підсистем

Треба бути розумним
Експоненційна складність fib
Заворот мізків
Складний ерор хендлінг і робота з io
Складно зробити прості задачі, зміна стану підсистеми іноді означає копіювання великого об'єкту
Побічні ефекти - це те, для чого ми часто програму пишемо. Нам не треба просто щось обчислити. Математики обожнюють фп, але реальний світ - не математика. Також неможливо "довести правильність програми" - принаймні ніхто не втрачає на таке час
Partially applied functions are not interesting.
Why only factorial? There are immediately problems with stack overflow
Sum of all numbers - it's not easily curried. А чого ми власне досягли? Та особливо нічого

Ви побачите деякі шаблони, яких ви раніше не помічали
В джаві - компаратор
Моно пустий - завершує обробку
List head tail

No nulls
https://docs.scala-lang.org/overviews/scala-book/no-null-values.html#:~:text=Functional%20programming%20is%20like%20writing,use%20null%20values%20in%20FP.

Fp більш теоретично чисте, коли як імп. Ближче до металу
Використовуючи математичний апарат можна довести, що програма - правильне
Але асеиблер е міг не бути імперативним
Числа черча

Не залежать від глобального стану, не змінюють стан, не

З часом так не попрацювати 

DOU:

 - https://dou.ua/forums/tags/%D0%A4%D0%9F/
 - https://dou.ua/forums/topic/37548/
 - https://dou.ua/forums/topic/11744/
 - https://dou.ua/forums/topic/26959/?from=similar_topics
 - https://dou.ua/forums/topic/8319/
 - https://dou.ua/forums/topic/8560/
 - https://dou.ua/forums/topic/6540/
 - https://dou.ua/forums/topic/35769/

