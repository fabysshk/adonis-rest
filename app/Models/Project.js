"use strict";

const Model = use("Model");

class Project extends Model {
  user() {
    return this.belongsTo("App/Models/Project");
  }
  tasks() {
    return this.hasMany("App/Models/Task");
  }
}

module.exports = Project;
