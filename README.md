# CarePulse

CarePulse — веб-приложение для управления медицинскими записями пациентов и приёмами врачей. Пациенты могут зарегистрироваться, заполнить медицинский профиль и записаться на приём. Администратор видит список заявок и управляет ими через dashboard.

> **О проекте.** Это учебный pet-проект, реализованный по практическому видеоуроку Youtube канала JavaScript Mastery. Идея, архитектура и основной сценарий взяты из курса; код написан и доработан мной в процессе обучения.

## Возможности

- Регистрация пользователя и создание профиля пациента
- Загрузка документов для верификации личности
- Запись на приём к врачу с выбором даты и времени
- Админ-панель со статистикой и таблицей заявок
- Защита админ-доступа через passkey-модалку

## Стек технологий

| Категория | Технологии |
|-----------|------------|
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router, Server Actions) |
| **Язык** | [TypeScript](https://www.typescriptlang.org/) |
| **UI** | [React 19](https://react.dev/), [Tailwind CSS 4](https://tailwindcss.com/) |
| **Компоненты** | [shadcn/ui](https://ui.shadcn.com/), [Radix UI](https://www.radix-ui.com/) |
| **Формы** | [React Hook Form](https://react-hook-form.com/), [Zod](https://zod.dev/) |
| **Backend / BaaS** | [Appwrite](https://appwrite.io/) (`node-appwrite`) |


## Структура проекта

```
care-pulse/
├── public/
│   └── assets/              # Иконки, логотип, изображения
├── src/
│   ├── app/                 # Страницы (App Router)
│   │   ├── page.tsx         # Главная — форма регистрации пациента
│   │   ├── admin/
│   │   │   └── page.tsx     # Админ-dashboard
│   │   └── patients/
│   │       └── [userId]/
│   │           ├── register/            # Регистрация мед. профиля
│   │           └── new-appointment/     # Запись на приём
│   │               └── success/         # Страница подтверждения
│   ├── components/
│   │   ├── forms/           # Формы: patient, register, appointment
│   │   ├── data-table/      # Таблица заявок для админки
│   │   ├── ui/              # Базовые UI-компоненты (shadcn)
│   │   ├── custom-form-field.tsx
│   │   ├── passkey-modal.tsx
│   │   └── stat-card.tsx
│   ├── lib/
│   │   ├── actions/         # Server Actions (Appwrite API)
│   │   │   ├── patient.actions.ts
│   │   │   └── appointment.actions.ts
│   │   ├── appwrite.config.ts  # Клиент Appwrite (server-only)
│   │   ├── validation.ts    # Zod-схемы валидации
│   │   └── utils.ts
│   └── constants/           # Статические данные (врачи, статусы и т.д.)
├── types/
│   ├── appwrite.types.ts    # Типы Patient, Appointment
│   └── index.d.ts           # Глобальные типы (Status, Gender)
├── .env.local               # Переменные окружения (не в git)
└── package.json
```

## Пользовательский сценарий

```
Главная → Регистрация (имя, email, телефон)
    ↓
Мед. профиль → Личные данные, страховка, документы, согласия
    ↓
Запись на приём → Выбор врача, даты, причины визита
    ↓
Подтверждение → Страница успеха
```

## Доступ к админке

1. Откройте главную страницу с параметром `/?admin=true`
2. В модальном окне введите passkey
3. После успешной проверки откроется `/admin`

**Демо passkey (локально):** `123456`

Passkey задаётся в `.env.local`:

```env
NEXT_PUBLIC_ADMIN_PASSKEY=123456
```

> Passkey используется только для демо-доступа в учебном проекте. Для production его нужно заменить на более надёжный и не публиковать в открытом репозитории.

## Быстрый старт

> **Важно.** Проект не работает «из коробки» только с `npm run dev`.  
> CarePulse использует **Appwrite** как backend: без настроенного проекта Appwrite формы, регистрация и админ-панель работать не будут.

Для локального запуска нужны **два компонента**:

1. **Next.js-приложение** — фронтенд и server actions (этот репозиторий)
2. **Appwrite** — база данных, хранилище файлов и пользователи

Appwrite можно использовать в облаке ([Appwrite Cloud](https://cloud.appwrite.io/)) или развернуть локально. В любом случае в `.env.local` должны быть корректные `PROJECT_ID`, `API_KEY`, `DATABASE_ID` и остальные переменные из вашего Appwrite-проекта.

### 1. Клонировать и установить зависимости

```bash
git clone <repository-url>
cd care-pulse
npm install
```

### 2. Настроить Appwrite

В [консоли Appwrite](https://cloud.appwrite.io/) создайте проект и настройте ресурсы по структуре из урока:

- база данных и таблицы: `patient`, `appointment`, `doctor`
- relation между `appointment` и `patient`
- storage bucket для документов пациента
- API key с нужными правами (Databases, Users, Storage)

Скопируйте значения из Appwrite в `.env.local` (см. шаг 3).

### 3. Настроить переменные окружения

Создайте файл `.env.local` в корне проекта:

```env
PROJECT_ID=your_appwrite_project_id
API_KEY=your_appwrite_api_key
DATABASE_ID=your_database_id
PATIENT_TABLE_ID=patient
DOCTOR_TABLE_ID=doctor
APPOINTMENT_TABLE_ID=appointment
NEXT_PUBLIC_BUCKET_ID=your_bucket_id
NEXT_PUBLIC_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_ADMIN_PASSKEY=123456
```

### 4. Запустить dev-сервер

```bash
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000).

Если переменные Appwrite указаны неверно или проект не настроен, при отправке форм появятся ошибки в консоли сервера.

## Скрипты

| Команда | Описание |
|---------|----------|
| `npm run dev` | Запуск в режиме разработки |
| `npm run build` | Сборка для production |
| `npm run start` | Запуск production-сборки |
| `npm run lint` | Проверка кода ESLint |

## Appwrite

Backend проекта полностью построен на Appwrite. Все данные (пациенты, записи, файлы) хранятся там, а не в Next.js.

| Ресурс | Назначение |
|--------|------------|
| **patient** | Профили пациентов |
| **appointment** | Записи на приём (связь `patient` через relation) |
| **doctor** | Врачи |
| **Storage bucket** | Загрузка документов для верификации |

Запросы к Appwrite выполняются через Server Actions в `src/lib/actions/`. Клиент (`appwrite.config.ts`) работает только на сервере (`server-only`) и не попадает в браузерный бандл.

**Без Appwrite локально проект не запустится в рабочем виде** — интерфейс откроется, но создание пользователей, регистрация пациентов и записи на приём завершатся ошибкой.


