"use strict";

const Model = use("Model");

class Musics extends Model {
  user() {
    return this.belongsTo("App/Models/User");
  }
}

module.exports = Musics;
