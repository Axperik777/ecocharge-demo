# EcoGrid — сайт и интерактивный просмотр

1. [Сайт](https://axperik777.github.io/ecocharge-demo/?lang=ru)
2. [CRM администратора](https://axperik777.github.io/ecocharge-demo/workspace/crm/?lang=ru&role=admin)
3. [Кабинет менеджера](https://axperik777.github.io/ecocharge-demo/workspace/crm/?lang=ru&role=manager)
4. [Кабинет клиента](https://axperik777.github.io/ecocharge-demo/workspace/client/?lang=ru)

Вход без паролей. Это интерактивный учебный просмотр, который хранит изменения в localStorage одного браузера. Вкладки сайта, CRM и кабинета используют общее состояние. Данные не передаются на сервер и не синхронизируются между устройствами. Реальные переводы и отправка Email/SMS не выполняются.

## Что проверить

### Два маршрута привлечения

Быстрые кампании и аффилиаты ведут на тематические страницы:

- [Участие в Charge](https://axperik777.github.io/ecocharge-demo/participate/charge/?lang=en)
- [Участие в Solar](https://axperik777.github.io/ecocharge-demo/participate/solar/?lang=en)
- [Участие в Mining](https://axperik777.github.io/ecocharge-demo/participate/mining/?lang=en)

Второй маршрут: [Club](https://axperik777.github.io/ecocharge-demo/club/?lang=en) → [Academy](https://axperik777.github.io/ecocharge-demo/app/?lang=en#academy) → Telegram, регистрация и обучение. Для рекламы Академии можно вести прямо на её страницу. Telegram-бот, серверная регистрация и выдача EcoCoin пока не подключены. CRM хранит одну отметку членства; инвестиционная консультация запрашивается отдельно. PWA устанавливает только кабинет. Проверка текущего состояния: [EC111](docs/EC111-FUNNEL-AUDIT.html).

Подробности реализации и проверки: [EC87](docs/EC87-DUAL-FUNNEL.md). Темы, сервисные значки и отчёты кабинета: [EC88](docs/EC88-SERVICES-AND-CONTRAST.md).

1. Оставить заявку на сайте.
2. Открыть CRM администратора → «Все заявки» → выбрать заявку → «Назначить менеджера».
3. Открыть кабинет менеджера → «Мои заявки» → создать аккаунт клиента.
4. В карточке клиента открыть кабинет, изменить учебный баланс, подготовить план, ответить в чате.
5. В админской CRM публиковать новости для клиентской ленты и удалять созданных клиентов.

Небольшая кнопка с ползунками открывает выбор клиента, роль и сброс учебных данных. Прямая ссылка на созданного клиента работает в том же браузере, где он создан.

## Публикация

GitHub Actions публикует только `public-site/`. `public-site/workspace/` собран из актуальных исходников переносного проекта с новой изолированной базой примеров. Рабочая SQLite-база, пароли, приватные настройки и серверные маршруты не копируются в публикацию. Старый просмотр `cabinet/client/` оставлен для прежних ссылок.

```sh
node scripts/verify-public-site.cjs public-site
```

Канонические исходники и локальный запуск находятся в переносной папке ECO CHARGE, в карте project-map.json. Репозиторий содержит текущий публичный артефакт и проверки; устаревший дубликат исходников удалён. Экспорт обновлений выполняется scripts/export-public-site.cjs и scripts/export-workspace-preview.cjs с параметром --portable, указывающим на переносной комплект. Подробности текущего аудита: [EC96](docs/EC96-VISUAL-AUDIT.md).
