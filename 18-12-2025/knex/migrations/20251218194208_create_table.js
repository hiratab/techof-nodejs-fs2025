/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    .createTable('tb_students', table => {
      table.increments('student_id').primary();
      table.string('name', 100).notNullable();
      table.string('email', 100).notNullable().unique();
      table.timestamp('created_at').defaultTo(knex.fn.now());
    })
    .createTable('tb_courses', table => {
      table.increments('course_id').primary();
      table.string('name', 100).notNullable();
      table.string('category', 100).notNullable();
      table.integer('duration').defaultTo(0);
      table.string('duration_unit', 100);
    })
    .createTable('tb_students_courses', table => {
      table.increments('id').primary();

      table
        .integer('student_id')
        .unsigned()
        .references('student_id')
        .inTable('tb_students')
        .onDelete('CASCADE')

      table
        .integer('course_id')
        .unsigned()
        .references('course_id')
        .inTable('tb_courses')
        .onDelete('CASCADE')

      table.unique(['student_id', 'course_id'])
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('tb_students_courses')
    .dropTableIfExists('tb_students')
    .dropTableIfExists('tb_courses')
};
