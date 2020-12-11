"use strict";

const Schema = use("Schema");

class MusicSchema extends Schema {
  up() {
    this.create("musics", (table) => {
      table.increments();
      table.string("title", 254).notNullable();
      table.string("singer", 254).notNullable();
      table.string("year", 254).notNullable();
      table.string("genre", 254).notNullable();
      table.string("cover", 254).notNullable().unique();

      table.integer("user_id").unsigned().references("id").inTable("users");
      table.string("name", 80).notNullable().unique();
      table.string("username", 254).notNullable();

      table.string("path", 254).notNullable().unique();

      table.string("icon").defaultTo("");
      table.timestamps();
    });
  }

  down() {
    this.drop("musics");
  }
}

module.exports = MusicSchema;
