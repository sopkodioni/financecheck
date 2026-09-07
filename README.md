# Finance Check (MVP)
Finance Check – це веб-додаток для відстеження фінансових операцій. 

## **1. Технічні вимоги**
### **Стек**: TS, ReactJS, NestJS, PostgreSQL, Prisma ORM
### **Стилізація та UI**: Tailwind CSS 
### **Методологія розробки UI**: Mobile-first

## **2. База даних**
<img width="1185" height="737" alt="ER diagram DB" src="https://github.com/user-attachments/assets/b347f0fb-4f8d-4174-9b0f-dbad3a2be786" />

## **3. Проєктування API (In progress)**
### Модуль users
* **Endpoints:**
  * PATCH `/users/me` - оновлення імені поточного користувача
  * GET `/users/me` - отримання даних поточного користувача
* **DTOs:**
  * CreateUserDto (`name`,`email`, `password`)
  * UpdateUserDto (`name?`)
* **Service methods:**
  * create(dto)
  * updateProfile(userId: string, newName: string)
  * updateEmail(userId: string, newEmail: string)
  * updatePassword(userId: string, newPass: string)
  * delete(userId)
  * findById(userId)

### Модуль auth
* **Endpoints:**
  * POST `/auth/login` - вхід в систему, видача JWT-токену
  * POST `/auth/send-code` - відправка коду підтвердження на почту
  * POST `/auth/verify-code` - перевірка коду з пошти
  * POST `/auth/register` -  створення користувача після верифікації
  * POST `/auth/logout` - вихід з системи
* **DTOs:**
  * LoginDto (`email`, `password`)
  * SendCodeDto (`email`)
  * VerifyCodeDto (`email`, `code`)
  * RegisterDto (`email`, `name`, `password`)
* **Guards**
  * JwtAuthGuard
* **Service methods:**
  * sendCode(email)
  * verifyCode(email, code)
  * register(dto)
  * login(dto)

## **4. План реалізації**
### Основні етапи (MVP):

1. Проєктування БД та API.
2. Реалізація базового функціоніоналу:
    - Авторизація та аутентифікація (реєстрація через Email, JWT)
    - Управління рахунками (створення, редагування, перегляд балансу, видалення)
    - Управління транзакціями (додавання доходів/витрат, історія операцій, фільтрація)
    - Управління категоріями (кастомні категорії для доходів та витрат)
    - Управління валютами (підтримка мультивалютності)

### Додаткові фічі на майбутнє:

1. Перенесення коштів між рахунками
2. Система боргів
3. Загальний доступ до рахунків
4. Система планування бюджету

