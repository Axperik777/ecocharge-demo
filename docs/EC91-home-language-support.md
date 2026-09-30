# EC-91 — Главная, язык и обращения

Дата: 30 сентября 2026 года.

## Изменения

- Первый экран прямо называет инвестиционное предложение: солнечная энергия, зарядки и вычислительные мощности. CTA «Посмотреть проекты» и «Как это работает» ведут к соответствующим разделам главной. Удалены повторяющиеся подписи и карточка поверх изображения.
- Четыре равноправных направления Solar / Charge / Mining / AI: бренд, читаемое пояснение, описание и конкретный переход. Энергетические планы вынесены в следующий шаг; Club и EcoCoin — в отдельные ссылки для знакомства.
- Отдельный блок оборудования ведёт к четырём категориям: панели, накопители, зарядки, EcoMiner. Категории открывают существующие каталоги с нужного раздела.
- EN/RU перенесён из шапки сайта в верхнюю часть правого меню. На быстрых participate-страницах открывается только выбор языка. Тема, UTM и текущая страница сохраняются.
- В обращении к менеджеру и истории переписки удалён блок «Что увидит менеджер». Удалена подпись о сохранении и передаче; данные плана продолжают передаваться в payload.context. После отправки показывается короткое «Сообщение отправлено».
- Календарь: «Начисления и вывод», читаемая дата в обеих темах, понятное пояснение о зачислении. В следующем начислении используется EcoGrid Charge вместо общего слова «Зарядки».
- В закреплённой учебной публикации welcome: Like 1293, Useful 702, Interested 2526. Это сценарные начальные значения, не реальные показатели аудитории. База счётчиков хранится в свежем публичном fixture; сохранённые пользовательские реакции прибавляются к ней без сброса аккаунтов. Новые публикации сохраняют нулевые начальные счётчики.

## Проверки

- 358 тестов проходят; CHECK и BUILD успешны.
- Проверка публичного экспорта: 16 страниц, 84 проверки рабочей области; приватных файлов и внешнего API нет.
- Браузер: 32 состояния сайта — все 16 страниц на 320 px RU и 1280 px EN; 8 состояний четырёх затронутых разделов кабинета в тех же режимах. Переполнений нет. Дополнительный визуальный контроль 390 px.
- EN/RU в панели работает; на Mining-лендинге UTM сохраняются при переключении языка. Все статические якоря 16 страниц проверены.
- Пустое сообщение не отправляется, заполненное появляется в CRM. Обе локализации формы проверены. В календаре проверен цвет даты в светлой и тёмной темах.
- Счётчики проверены на добавление, переключение, отмену и восстановление данных. Браузер: 1293 → 1294 → 1293.

## Иллюстрация

Инструмент: встроенный image_gen. Иллюстрация вымышленного энергетического комплекса для дипломного проекта. Не является фотографическим подтверждением существования объекта. На сайте используются три оптимизированных WebP: dist/assets/ecogrid-campus-640.webp, ecogrid-campus-960.webp, ecogrid-campus-1440.webp в ОБЩИЕ ФАЙЛЫ/Исходники (89 / 193 / 389 КБ).

Промпт:

Create a photorealistic editorial architectural illustration for the homepage of EcoGrid, a fictional clean-energy company in a university investment and marketing case study. One coherent, believable North American clean-energy campus, photographed from a moderately elevated drone three-quarter angle, not an infographic or collage. Foreground and left: neat rows of dark blue photovoltaic panels in a grassy field. Midground right: a modest modern low-rise data-center building with discreet industrial cooling equipment and several utility battery storage cabinets. Near the building a small parking court with four understated EV charging stalls and two ordinary electric cars. Low rolling tree-lined landscape in the distance, no residential rooftops, no huge city skyline, no wind turbines. Make solar generation visually dominant while charging and computing infrastructure are clearly recognizable within the same realistic site. Soft late-afternoon daylight, natural green grass, warm neutral architecture, restrained emerald accents, accurate engineered proportions, contemporary but ordinary infrastructure, premium documentary-style composition. Landscape 3:2 composition that crops well to 4:3 and 16:9, sharp subject matter at small web size. No text, no logos, no financial symbols, no overlays, no exaggerated futuristic elements. This is an illustrative fictional campus, not evidence of an operating facility.

## Границы

Учебный продукт. Реальные переводы и внешняя доставка не подключались. Рабочая SQLite-база не читалась и не изменялась. Проверки выполнены в браузере с заданной шириной; физические телефоны отдельно не проверялись.
