# CarePulse

CarePulse — веб-приложение для управления медицинскими записями пациентов и приёмами врачей. Пациенты могут зарегистрироваться, заполнить медицинский профиль и записаться на приём. Администратор видит список заявок и управляет ими через dashboard.

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
| **Таблицы** | [TanStack Table](https://tanstack.com/table) |
| **Backend / BaaS** | [Appwrite](https://appwrite.io/) (`node-appwrite`) |
| **Прочее** | `react-datepicker`, `react-dropzone`, `react-phone-number-input`, `lucide-react` |

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

Администратор заходит через ссылку `/?admin=true`, вводит passkey и попадает на `/admin`.

## Быстрый старт

### 1. Клонировать и установить зависимости

```bash
git clone <repository-url>
cd care-pulse
npm install
```

### 2. Настроить переменные окружения

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
```

### 3. Запустить dev-сервер

```bash
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000).

## Скрипты

| Команда | Описание |
|---------|----------|
| `npm run dev` | Запуск в режиме разработки |
| `npm run build` | Сборка для production |
| `npm run start` | Запуск production-сборки |
| `npm run lint` | Проверка кода ESLint |

## Appwrite

Проект использует Appwrite TablesDB для хранения данных. Основные коллекции:

- **patient** — профили пациентов
- **appointment** — записи на приём (связь `patient` через relation)
- **doctor** — врачи

Server Actions в `src/lib/actions/` выполняют все операции с базой на сервере. Клиент Appwrite (`appwrite.config.ts`) помечен как `server-only` и не попадает в браузерный бандл.

## Лицензия

Private project.

