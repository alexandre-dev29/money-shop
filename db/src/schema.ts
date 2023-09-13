import {
  pgEnum,
  pgTable,
  text,
  uniqueIndex,
  varchar,
  uuid,
  timestamp,
  doublePrecision,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const devise = pgEnum('devise', ['CDF', 'USD']);
export const genreTransation = pgEnum('genre_transation', [
  'Equity',
  'Airtel',
  'Vodacom',
  'Africell',
  'Orange',
  'MainAccount',
]);
export const role = pgEnum('role', ['Admin', 'Manager', 'User']);
export const typeTransaction = pgEnum('type_transaction', [
  'Depot',
  'Retrait',
  'Approvisionement',
]);

export const users = pgTable('users', {
  id: uuid('id').primaryKey().notNull(),
  fullName: text('full_name').notNull(),
  phoneNumber: text('phoneNumber').notNull().unique(),
  password: text('password').notNull(),
  role: role('role').default('User').notNull(),
  accountNumber: varchar('account_number')
    .notNull()
    .references(() => account.phonenumber, {
      onDelete: 'restrict',
      onUpdate: 'cascade',
    }),
  shopid: uuid('shopid')
    .notNull()
    .references(() => shop.id, { onDelete: 'restrict', onUpdate: 'cascade' }),
});
export const userRelations = relations(users, ({ one, many }) => ({
  shop: one(shop, {
    fields: [users.shopid],
    references: [shop.id],
  }),
  account: one(account, {
    fields: [users.accountNumber],
    references: [account.phonenumber],
  }),
  transactions: many(transaction),
}));

export const shop = pgTable(
  'shop',
  {
    id: uuid('id').primaryKey().notNull(),
    shopName: text('shop_name').notNull(),
    shopInformations: text('shop_informations').notNull(),
    createAt: timestamp('createAt', { precision: 3, mode: 'string' })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updatedAt', {
      precision: 3,
      mode: 'string',
    }).notNull(),
  },
  (table) => {
    return {
      shopNameKey: uniqueIndex('shop_shop_name_key').on(table.shopName),
    };
  }
);

export const shopRelations = relations(shop, ({ many }) => ({
  users: many(users),
}));

export const account = pgTable(
  'account',
  {
    phonenumber: varchar('phonenumber').primaryKey().notNull(),
    agentcode: text('agentcode').notNull(),
    agentname: text('agentname').notNull(),
  },
  (table) => {
    return {
      agentcodeKey: uniqueIndex('account_agentcode_key').on(table.agentcode),
    };
  }
);
export const accountRelations = relations(account, ({ many, one }) => ({
  sub_accounts: many(subAccount),
  users: many(users),
}));

export const subAccount = pgTable('sub_account', {
  id: uuid('id').primaryKey().notNull(),
  type: text('type').notNull(),
  devise: devise('devise').notNull(),
  amount: doublePrecision('amount').notNull(),
  accountNumber: varchar('account_number')
    .notNull()
    .references(() => account.phonenumber, {
      onDelete: 'restrict',
      onUpdate: 'cascade',
    }),
  transationGenre: genreTransation('transation_genre')
    .default('Airtel')
    .notNull(),
});

export const subAccountRelations = relations(subAccount, ({ one, many }) => ({
  shop: one(account, {
    fields: [subAccount.accountNumber],
    references: [account.phonenumber],
  }),
  transactions: many(transaction),
}));

export const transaction = pgTable('transaction', {
  id: uuid('id').primaryKey().notNull(),
  transationType: typeTransaction('transation_type').notNull(),
  amount: doublePrecision('amount').notNull(),
  numeroReference: text('numero_reference').notNull(),
  identityPiece: text('identityPiece').notNull(),
  phoneNumber: text('phoneNumber').notNull(),
  clientName: text('clientName').notNull(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, {
      onDelete: 'restrict',
      onUpdate: 'cascade',
    }),
  createAt: timestamp('createAt', { precision: 3, mode: 'string' })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updatedAt', { precision: 3, mode: 'string' }).notNull(),
  subAccountId: uuid('sub_account_id')
    .notNull()
    .references(() => subAccount.id, {
      onDelete: 'restrict',
      onUpdate: 'cascade',
    }),
  amountBefore: doublePrecision('amount_before').notNull(),
});

export const transactionRelations = relations(transaction, ({ one, many }) => ({
  user: one(users, {
    fields: [transaction.userId],
    references: [users.id],
  }),
  subAccount: one(subAccount, {
    fields: [transaction.subAccountId],
    references: [subAccount.id],
  }),
}));
