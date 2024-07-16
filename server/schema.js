import {
  pgTable,
  serial,
  text,
  integer,
  timestamp,
  boolean,
  doublePrecision,
  pgEnum,
  uuid,
  json,
  primaryKey,
} from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";


// Enums
export const orderStatusEnum = pgEnum("order_status", [
  "pending",
  "paid",
  "done",
  "customer_canceled", 
]);
export const accountTypeEnum = pgEnum("account_type", ["user", "admin"]);

// Users table
export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name"),
  phoneNumber: text("phone_number").notNull(),
  email: text("email").unique(),  // email could be null
  passwordHash: text("password_hash").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Address table
export const addresses = pgTable("addresses", {
  id: serial("id").primaryKey(),
  street: text("street").notNull(),
  city: text("city").notNull(),
  state: text("state").notNull(),
  zipCode: text("zip_code").notNull(),
  userId: uuid("user_id").notNull().references(() => users.id).$default(sql`uuid_generate_v4()`),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Accounts table (for additional user info and authentication)
export const accounts = pgTable("accounts", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id),
  type: accountTypeEnum("type").notNull().default("user"),
  provider: text("provider"),
  providerAccountId: text("provider_account_id"),
  refreshToken: text("refresh_token"),
  accessToken: text("access_token"),
  expiresAt: timestamp("expires_at"),
  tokenType: text("token_type"),
  scope: text("scope"),
  idToken: text("id_token"),
  sessionState: text("session_state"),
});

// Products table
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  price: doublePrecision("price").notNull(),
  stock: integer("stock").notNull(),
  categoryId: integer("category_id")
    .notNull()
    .references(() => categories.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Categories table
export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
});

// Orders table
export const orders = pgTable("orders", {
  id: uuid("id").defaultRandom().primaryKey(),  
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id),
  status: orderStatusEnum("status").notNull().default("pending"),
  total: doublePrecision("total").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Order Items table
export const orderItems = pgTable("order_items", {
  id: serial("id").primaryKey(),
  orderId: uuid("order_id")
    .notNull()
    .references(() => orders.id),
  productId: integer("product_id")
    .notNull()
    .references(() => products.id),
  quantity: integer("quantity").notNull(),
  price: doublePrecision("price").notNull(),
});

// Cart table
export const carts = pgTable("carts", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Cart Items table
export const cartItems = pgTable("cart_items", {
  id: serial("id").primaryKey(),
  cartId: uuid("cart_id")
    .notNull()
    .references(() => carts.id),
  productId: integer("product_id")
    .notNull()
    .references(() => products.id),
  quantity: integer("quantity").notNull(),
  addedAt: timestamp("added_at").defaultNow().notNull(),
});

// ==================
// Relations

export const usersRelations = relations(users, ({ many, one }) => ({
  orders: many(orders),
  accounts: one(accounts, { fields: [users.id], references: [accounts.userId] }),
  carts: one(carts, { fields: [users.id], references: [carts.userId] }),
  addresses: many(addresses),
}));

export const productsRelations = relations(products, ({ one, many }) => ({
  category: one(categories, {
    fields: [products.categoryId],
    references: [categories.id],
  }),
  orderItems: many(orderItems),
  cartItems: many(cartItems),
}));

export const ordersRelations = relations(orders, ({ one, many }) => ({
  user: one(users, {
    fields: [orders.userId],
    references: [users.id],
  }),
  orderItems: many(orderItems),
}));

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, {
    fields: [orderItems.orderId],
    references: [orders.id],
  }),
  product: one(products, {
    fields: [orderItems.productId],
    references: [products.id],
  }),
}));

export const cartsRelations = relations(carts, ({ one, many }) => ({
  user: one(users, {
    fields: [carts.userId],
    references: [users.id],
  }),
  cartItems: many(cartItems),
}));

export const cartItemsRelations = relations(cartItems, ({ one }) => ({
  cart: one(carts, {
    fields: [cartItems.cartId],
    references: [carts.id],
  }),
  product: one(products, {
    fields: [cartItems.productId],
    references: [products.id],
  }),
}));

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, {
    fields: [accounts.userId],
    references: [users.id],
  }),
}));

export const addressesRelations = relations(addresses, ({ one }) => ({
  user: one(users, {
    fields: [addresses.userId],
    references: [users.id],
  }),
}));
