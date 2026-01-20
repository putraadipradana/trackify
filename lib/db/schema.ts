import { relations, sql } from "drizzle-orm";
import { pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const customer = pgTable("customer", {
    id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
    name: varchar("name").notNull(),
    email: varchar("email").notNull().unique(),
    phone: varchar("phone").notNull(),
    address: text("address").notNull(),
    status: varchar('customer_status', { enum: ['fleet', 'retail', 'not-set'] }).notNull().default('not-set'),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .defaultNow()
        .$onUpdate(() => /* @__PURE__ */ new Date())
        .notNull(),
})

export type Customer = typeof customer.$inferSelect

export const order = pgTable("order", {
    id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
    customerId: varchar('customer_id').notNull().references(() => customer.id, { onDelete: 'cascade' }),
    orderNumber: varchar("order_number", { length: 30 }).notNull().unique(),
    status: varchar('order_status', { enum: ['not-started', 'on-progress', 'done'] }).notNull().default('not-started'),
    priority: varchar('order_priority', { enum: ['low', 'medium', 'high'] }).notNull().default('low'),
    amount: varchar("amount").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .defaultNow()
        .$onUpdate(() => /* @__PURE__ */ new Date())
        .notNull()
})

export type Order = typeof order.$inferSelect
export type InsertOrder = typeof order.$inferInsert

export const orderRelations = relations(order, ({ many, one }) => ({
    material: many(material),
    customer: one(customer, {
        fields: [order.customerId],
        references: [customer.id]
    })
}))

export const material = pgTable('material', {
    id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
    orderId: varchar("order_id").notNull().references(() => order.id, { onDelete: 'cascade' }),
    number: varchar('number').notNull(),
    description: text("description").notNull(),
    qty: varchar("qty").notNull(),
    status: varchar('material_status', { enum: ['order', 'open'] }).notNull().default('open'),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .defaultNow()
        .$onUpdate(() => /* @__PURE__ */ new Date())
        .notNull()
})

export type Material = typeof material.$inferSelect

export const materialRelations = relations(material, ({ one }) => ({
    order: one(order, {
        fields: [material.orderId],
        references: [order.id]
    })
}))

export const schema = { customer, order, material }