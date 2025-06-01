/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
  pgm.createTable("users", {
    id: "id",
    name: { type: "varchar(100)", notNull: true },
    email: { type: "varchar(100)", unique: true, notNull: true },
    password: { type: "text", notNull: true },
    role: { type: "varchar(20)", notNull: true },
    created_at: { type: "timestamp", default: pgm.func("current_timestamp") },
  });

  pgm.createTable("tickets", {
    id: "id",
    user_id: { type: "integer", references: "users(id)", notNull: true },
    assigned_to: { type: "integer", references: "users(id)", default: null },
    title: { type: "text", notNull: true },
    description: { type: "text", notNull: true },
    status: { type: "varchar(20)", notNull: true },
    created_at: { type: "timestamp", default: pgm.func("current_timestamp") },
  });

  pgm.createTable("comments", {
    id: "id",
    ticket_id: { type: "integer", references: "tickets(id)", notNull: true },
    user_id: { type: "integer", references: "users(id)", notNull: true },
    comment_text: { type: "text", notNull: true },
    created_at: { type: "timestamp", default: pgm.func("current_timestamp") },
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.dropTable("comments");
  pgm.dropTable("tickets");
  pgm.dropTable("users");
};
