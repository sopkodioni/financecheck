-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('INCOME', 'EXPENSE');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passHash" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

ALTER TABLE "users"
    ADD CONSTRAINT "user_name_check" CHECK (name ~ '^[a-zA-Zа-яА-ЯёЁіІїЇєЄґҐ\s]{2,40}$'),
    ADD CONSTRAINT "user_email_check" CHECK (email ~ '^.+@.+$'),

-- CreateTable
CREATE TABLE "wallets" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "balance" DECIMAL(12,2) NOT NULL,
    "initial_balance" DECIMAL(12,2) NOT NULL DEFAULT 0.00,
    "note" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,
    "currency_id" TEXT NOT NULL,

    CONSTRAINT "wallets_pkey" PRIMARY KEY ("id")
);

ALTER TABLE "wallets"
    ADD CONSTRAINT "wallet_name_check" CHECK (name ~ '[^a-zA-Zа-яА-ЯёЁіІїЇєЄґҐ\s]{3,20}$'),
    ADD CONSTRAINT "wallet_initial_balance_check" CHECK (initial_balance >= 0),
    ADD CONSTRAINT "wallet_note_check" CHECK (note IS NULL OR note ~ '^[a-zA-Zа-яА-ЯёЁіІїЇєЄґҐ0-9\s.,!?-]{1,32}$');

-- CreateTable
CREATE TABLE "currencies" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "user_id" TEXT,

    CONSTRAINT "currencies_pkey" PRIMARY KEY ("id")
);

ALTER TABLE "currencies"
    ADD CONSTRAINT "currency_name_check" CHECK (name ~ '^[a-zA-Zа-яА-ЯёЁіІїЇєЄґҐ\s]{2,20}$'),
    ADD CONSTRAINT "currency_code_check" CHECK (code ~ '^[A-Z_]{2,20}$'),
    ADD CONSTRAINT "currency_symbol_check" CHECK (char_length(symbol) BETWEEN 1 AND 10);


-- CreateTable
CREATE TABLE "transactions" (
    "id" TEXT NOT NULL,
    "amount" DECIMAL(12,2) NOT NULL,
    "note" TEXT,
    "type" "TransactionType" NOT NULL,
    "date" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "wallet_id" TEXT NOT NULL,
    "category_id" TEXT NOT NULL,

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("id")
);

ALTER TABLE "transactions"
    ADD CONSTRAINT "transaction_amount_check" CHECK (amount > 0),
    ADD CONSTRAINT "transaction_note_check" CHECK (note IS NULL OR note ~ '^[a-zA-Zа-яА-ЯёЁіІїЇєЄґҐ0-9\s.,!?-]{1,32}$');


-- CreateTable
CREATE TABLE "categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "TransactionType" NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

ALTER TABLE "categories"
    ADD CONSTRAINT "category_name_check" CHECK (name ~ '^[a-zA-Zа-яА-ЯёЁіІїЇєЄґҐ\s]{1,20}$');

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_login_key" ON "users"("login");

-- CreateIndex
CREATE UNIQUE INDEX "currencies_user_id_name_key" ON "currencies"("user_id", "name");

-- CreateIndex
CREATE UNIQUE INDEX "currencies_user_id_code_key" ON "currencies"("user_id", "code");

-- CreateIndex
CREATE UNIQUE INDEX "categories_userId_name_key" ON "categories"("userId", "name");

-- AddForeignKey
ALTER TABLE "wallets" ADD CONSTRAINT "wallets_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wallets" ADD CONSTRAINT "wallets_currency_id_fkey" FOREIGN KEY ("currency_id") REFERENCES "currencies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "currencies" ADD CONSTRAINT "currencies_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_wallet_id_fkey" FOREIGN KEY ("wallet_id") REFERENCES "wallets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
