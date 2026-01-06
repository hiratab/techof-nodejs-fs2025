// Migration simplificada para criação da tabela students
export function up(knex) {
  return knex.schema.createTable("students", table => {
    table.increments("id").primary();
    table.string("name", 100).notNullable();
    table.string("email", 100).notNullable().unique();
    table.string("course", 100).notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
}

export function down(knex) {
  return knex.schema.dropTableIfExists("students");
}
