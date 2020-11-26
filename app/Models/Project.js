"use strict";

const Model = use("Model");

class Project extends Model {
  user() {
    return this.belongsTo("App/Models/Project");
  }
}

module.exports = Project;
