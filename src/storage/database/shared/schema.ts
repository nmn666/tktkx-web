import { pgTable, serial, timestamp, text, varchar, integer, boolean } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const healthCheck = pgTable("health_check", {
	id: serial().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow(),
});

// 陪跑计划申请表
export const coachingApplications = pgTable("coaching_applications", {
	id: integer("id").primaryKey().default(sql`nextval('coaching_applications_id_seq')`),
	userId: varchar("user_id", { length: 255 }).notNull(),
	name: varchar("name", { length: 100 }).notNull(),
	wechat: varchar("wechat", { length: 100 }).notNull(),
	phone: varchar("phone", { length: 20 }).notNull(),
	experience: text("experience").notNull(),
	specialties: text("specialties").notNull(),
	additionalInfo: text("additional_info"),
	status: varchar("status", { length: 20 }).notNull().default("pending"), // pending, approved, rejected
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).notNull().defaultNow(),
});

// 注册用户表
export const registeredUsers = pgTable("registered_users", {
	id: integer("id").primaryKey().default(sql`nextval('registered_users_id_seq')`),
	username: varchar("username", { length: 100 }).notNull().unique(),
	phone: varchar("phone", { length: 20 }),
	email: varchar("email", { length: 255 }),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).notNull().defaultNow(),
});
