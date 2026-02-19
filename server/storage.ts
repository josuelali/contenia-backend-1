import {
  users,
  type User,
  type InsertUser,
  products,
  type Product,
  type InsertProduct,
  contents,
  type Content,
  type InsertContent,
  assistants,
  type Assistant,
  type InsertAssistant,
} from "@shared/schema";

import { db } from "./db";
import { eq, desc } from "drizzle-orm";

// ==========================
// INTERFACE
// ==========================

export interface IStorage {
  // USERS
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: InsertUser & { id: string }): Promise<User>;

  // PRODUCTS
  getProduct(id: number): Promise<Product | undefined>;
  getRecentProducts(limit?: number): Promise<Product[]>;
  getUserProducts(userId: string, limit?: number): Promise<Product[]>;
  createProduct(product: InsertProduct & { userId: string }): Promise<Product>;

  // CONTENT
  createContent(content: InsertContent & { userId: string }): Promise<Content>;

  // ASSISTANTS
  createAssistant(
    assistant: InsertAssistant & { userId: string },
  ): Promise<Assistant>;

  getAssistant(id: number): Promise<Assistant | undefined>;

  getUserAssistants(userId: string): Promise<Assistant[]>;
}

// ==========================
// IMPLEMENTATION
// ==========================

export class DatabaseStorage implements IStorage {
  // USERS
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: InsertUser & { id: string }): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: userData,
      })
      .returning();
    return user;
  }

  // PRODUCTS
  async getProduct(id: number): Promise<Product | undefined> {
    const [product] = await db
      .select()
      .from(products)
      .where(eq(products.id, id));
    return product;
  }

  async getRecentProducts(limit: number = 10): Promise<Product[]> {
    return db.select().from(products).orderBy(desc(products.id)).limit(limit);
  }

  async getUserProducts(
    userId: string,
    limit: number = 10,
  ): Promise<Product[]> {
    return db
      .select()
      .from(products)
      .where(eq(products.userId, userId))
      .orderBy(desc(products.id))
      .limit(limit);
  }

  async createProduct(
    productData: InsertProduct & { userId: string },
  ): Promise<Product> {
    const [product] = await db.insert(products).values(productData).returning();
    return product;
  }

  // CONTENT
  async createContent(
    contentData: InsertContent & { userId: string },
  ): Promise<Content> {
    const [content] = await db.insert(contents).values(contentData).returning();
    return content;
  }

  // ==========================
  // ASSISTANTS
  // ==========================

  async createAssistant(
    assistantData: InsertAssistant & { userId: string },
  ): Promise<Assistant> {
    const [assistant] = await db
      .insert(assistants)
      .values(assistantData)
      .returning();
    return assistant;
  }

  async getAssistant(id: number): Promise<Assistant | undefined> {
    const [assistant] = await db
      .select()
      .from(assistants)
      .where(eq(assistants.id, id));
    return assistant;
  }

  async getUserAssistants(userId: string): Promise<Assistant[]> {
    return db
      .select()
      .from(assistants)
      .where(eq(assistants.userId, userId))
      .orderBy(desc(assistants.id));
  }
}

export const storage = new DatabaseStorage();
