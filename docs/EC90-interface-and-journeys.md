# EC-90 — Единый интерфейс и маршруты

## Изменения

- На сайте 16 страниц: добавлена отдельная /club/. Материалы и подписка отделены от консультации. Быстрые страницы /participate/charge/, /participate/solar/, /participate/mining/ сохраняют тему заявки.
- Контекстные CTA оборудования, майнинга, зарядок и материалов; прямой переход из подтверждения заявки к её карточке администратора. Исправлены локальные якоря с base href.
- Удалены декоративные повторы EcoGrid в заголовках и диалогах, техническая подпись про CRM в форме и нижняя строка, которую отметил пользователь. Условия и сведения о рисках остаются в тематических разделах и документах.
- Названия EcoGrid Solar / Charge / Mining / AI / EcoCoin получили крупное начертание и нормальный регистр. Manrope сохранён.
- Обновлена иллюстрация презентации в истории: EcoGrid вместо ECO CHARGE, светлый интерьер, крупнее герой. Это иллюстрация, не документальное подтверждение события. 3 WebP-размера.
- Значки проектов приведены к стилю сервисов. Контраст полей, подписей, ошибок и кнопок в пополнении, выводе, поддержке и профиле исправлен для светлой и тёмной тем. Карточки сохранённых расчётов используют общие цвета.
- Колокольчик перенесён в правый блок рядом с языками и темой. Повторное нажатие возвращает из уведомлений на предыдущий экран.
- Вывод: единая рамка суммы и кнопки «Максимум», правила в трёх пунктах. Пояса только США/Канада; старый неподдерживаемый пояс требует выбора в профиле. Новые локальные состояния не наследуют Asia/Tbilisi от компьютера.
- Исправлен статус переписки после ответа менеджера, в том числе совместимость со старыми сохранёнными обращениями.
- Заявки без телефона не попадают в очередь звонков. Для незавершённых консультаций по email есть отдельный список; знакомство через Club остаётся вне очереди звонков.

## Проверки

- 358 тестов проходят. CHECK и BUILD проходят.
- Адаптивный DOM-аудит: 118 состояний — 16 страниц сайта, 17 разделов клиента, 14 разделов администратора и 12 менеджера, RU на 320 px и EN на 1280 px. Горизонтального переполнения и сломанных загруженных изображений не обнаружено.
- Дополнительный визуальный контроль на 390 px; светлые и тёмные окна вывода, пополнения и поддержки; новые значки. Профиль сохраняет Сент-Джонс после перезагрузки.
- Изолированный сценарий: Mining-заявка с UTM → администратор → назначение менеджера → квалификация → создание учебного клиента → модельное зачисление 250 USD → кабинет → вопрос → ответ менеджера. Club-подписка не попала в очередь звонков.
- Сохранённый расчёт открывается в сравнении; повторное нажатие колокольчика закрывает уведомления. Все статические якоря 16 страниц проверены.

## Границы проверки

GitHub Pages публикует связанную учебную рабочую область. Изменения хранятся в одном браузере; реальные переводы и внешняя доставка сообщений не подключены. Экспорт собран из свежей изолированной базы. Рабочая SQLite, пароли и закрытые серверные файлы не публикуются. Физические телефоны отдельно не тестировались. Адаптивная проверка не означает проверку всех возможных сочетаний пользовательских данных.

## Иллюстрация истории

Инструмент: встроенный image_gen, редактирование предыдущей иллюстрации. Итоговые файлы: dist/assets/story/now-480.webp, now-800.webp, now-1600.webp в ОБЩИЕ ФАЙЛЫ/Исходники. Оригинал сохранён в EC90-source-backup за пределами публикации.

Промпт: Edit this existing illustrative brand-story photo into a polished editorial website image for EcoGrid. Preserve the older man's recognizable face, silver short hair, glasses, and navy polo; he is the same person in the illustration. Replace the dated hotel-room conference composition with a tasteful small clean-energy presentation in a modern airy meeting room. Medium-wide three-quarter composition with the speaker taking roughly one third of frame, clearly visible from waist up at a slim understated lectern; only two or three softly out-of-focus audience shoulders at lower edge, no crowd of backs obscuring the frame. Natural bright side daylight, warm neutral wood, soft off-white walls, balanced emerald accents. A large presentation screen behind him shows only exact text 'EcoGrid' in elegant dark emerald sans-serif plus a simple understated solar-to-storage-to-charging diagram, no other words, no ECO CHARGE, no event dates, awards or claims. Strong natural photo texture, accurate anatomy and hands, premium honest editorial feel, no plastic AI skin, no overdramatic stage lighting, no lime/neon green, no stock-photo handshake. Landscape 3:2 framing, sharp at small website sizes, restrained and contemporary. This remains an illustrative scene, not documentary evidence of an actual event.

## Контекст диплома

EcoGrid — учебный продукт для дипломной работы об инвестициях, маркетинговой воронке и представлении готового продукта. Компания, история CEO и операции рассматриваются как моделируемый сценарий. История обновлена: энергетическая основа, оборудование, Mining, AI, EcoCoin, отдельный раздел Club и переход на /club/. Биографическая хронология сохранена; никаких новых числовых достижений не добавлено. Итоговая проверка экспорта: 79 проверок.
