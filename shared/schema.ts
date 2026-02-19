import {
  pgTable,
  text,
  serial,
  integer,
  boolean,
  doublePrecision,
  timestamp,
  varchar,
  jsonb,
  index,
  real,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// ==========================
// Sessions
// ==========================

export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// ==========================
// Users
// ==========================

export const users = pgTable("users", {
  id: varchar("id").primaryKey().notNull(),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),

  subscriptionPlan: varchar("subscription_plan").default("free"),
  subscriptionStatus: varchar("subscription_status").default("active"),
  subscriptionEndsAt: timestamp("subscription_ends_at"),

  stripeCustomerId: varchar("stripe_customer_id"),
  stripeSubscriptionId: varchar("stripe_subscription_id"),

  monthlyProductGenerations: integer("monthly_product_generations").default(0),
  monthlyContentGenerations: integer("monthly_content_generations").default(0),
  lastResetDate: timestamp("last_reset_date").defaultNow(),

  affiliateCode: varchar("affiliate_code").unique(),
  affiliateEarnings: real("affiliate_earnings").default(0),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
// ==========================
// Tenants
// ==========================

export const tenants = pgTable("tenants", {
  id: varchar("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow(),
});
// ==========================
// Memberships
// ==========================

export const memberships = pgTable("memberships", {
  id: varchar("id").primaryKey(),
  tenantId: varchar("tenant_id").references(() => tenants.id),
  userId: varchar("user_id").references(() => users.id),
  role: varchar("role").default("owner"), // owner/admin/member
  createdAt: timestamp("created_at").defaultNow(),
});

// ==========================
// Products
// ==========================

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").references(() => users.id),

  name: text("name").notNull(),
  description: text("description").notNull(),
  price: text("price").notNull(),
  imageUrl: text("image_url").notNull(),

  rating: doublePrecision("rating"),
  reviews: integer("reviews"),

  trending: boolean("trending").default(false),
  viral: boolean("viral").default(false),
  popular: boolean("popular").default(false),

  views: text("views"),
  tags: text("tags").array(),

  affiliateUrl: text("affiliate_url"),
  commission: real("commission").default(0),

  supplier: text("supplier"),
  supplierUrl: text("supplier_url"),

  createdAt: timestamp("created_at").defaultNow(),
});

// ==========================
// Contents
// ==========================

export const contents = pgTable("contents", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").references(() => users.id),
  productId: integer("product_id").references(() => products.id),

  title: text("title").notNull(),
  description: text("description").notNull(),
  music: text("music").notNull(),
  animation: text("animation").notNull(),
  cta: text("cta").notNull(),
  videoUrl: text("video_url"),

  createdAt: timestamp("created_at").defaultNow(),
});

// ==========================
// Assistants (ALINEADO CON DB REAL)
// ==========================

export const assistants = pgTable("assistants", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").references(() => users.id),

  name: text("name").notNull(),
  role: text("role").notNull(),
  systemPrompt: text("system_prompt").notNull(),

  temperature: real("temperature").default(0.7),
  active: boolean("active").default(true),

  createdAt: timestamp("created_at").defaultNow(),
});

// ==========================
// Insert Schemas
// ==========================

export const insertUserSchema = createInsertSchema(users).pick({
  email: true,
  firstName: true,
  lastName: true,
  profileImageUrl: true,
});

export const insertProductSchema = createInsertSchema(products).pick({
  name: true,
  description: true,
  price: true,
  imageUrl: true,
  rating: true,
  reviews: true,
  trending: true,
  viral: true,
  popular: true,
  views: true,
  tags: true,
  affiliateUrl: true,
  commission: true,
  supplier: true,
  supplierUrl: true,
});

export const insertContentSchema = createInsertSchema(contents).pick({
  productId: true,
  title: true,
  description: true,
  music: true,
  animation: true,
  cta: true,
  videoUrl: true,
});

export const insertAssistantSchema = createInsertSchema(assistants).pick({
  name: true,
  role: true,
  systemPrompt: true,
  temperature: true,
  active: true,
});

// ==========================
// Types
// ==========================

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Product = typeof products.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;

export type Content = typeof contents.$inferSelect;
export type InsertContent = z.infer<typeof insertContentSchema>;

export type Assistant = typeof assistants.$inferSelect;
export type InsertAssistant = z.infer<typeof insertAssistantSchema>;
