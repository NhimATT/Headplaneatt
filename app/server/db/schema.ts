import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { HostInfo } from '~/types';

export const ephemeralNodes = sqliteTable('ephemeral_nodes', {
	auth_key: text('auth_key').primaryKey(),
	node_key: text('node_key'),
});

export type EphemeralNode = typeof ephemeralNodes.$inferSelect;
export type EphemeralNodeInsert = typeof ephemeralNodes.$inferInsert;

export const hostInfo = sqliteTable('host_info', {
	host_id: text('host_id').primaryKey(),
	payload: text('payload', { mode: 'json' }).$type<HostInfo>(),
	updated_at: integer('updated_at', { mode: 'timestamp' }).$default(
		() => new Date(),
	),
});

export type HostInfoRecord = typeof hostInfo.$inferSelect;
export type HostInfoInsert = typeof hostInfo.$inferInsert;

export const users = sqliteTable('users', {
	id: text('id').primaryKey(),
	sub: text('sub').notNull().unique(),
	caps: integer('caps').notNull().default(0),
	onboarded: integer('onboarded', { mode: 'boolean' }).notNull().default(false),
});

export type User = typeof users.$inferSelect;
export type UserInsert = typeof users.$inferInsert;

// IP Whitelist table
export const ipWhitelist = sqliteTable('ip_whitelist', {
	id: text('id').primaryKey(),
	ipAddress: text('ip_address').notNull().unique(),
	description: text('description').notNull(),
	enabled: integer('enabled', { mode: 'boolean' }).notNull().default(true),
	createdBy: text('created_by').notNull(),
	createdAt: integer('created_at', { mode: 'timestamp' })
		.notNull()
		.$defaultFn(() => new Date()),
	updatedAt: integer('updated_at', { mode: 'timestamp' })
		.notNull()
		.$defaultFn(() => new Date()),
});

export type IpWhitelist = typeof ipWhitelist.$inferSelect;
export type IpWhitelistInsert = typeof ipWhitelist.$inferInsert;
