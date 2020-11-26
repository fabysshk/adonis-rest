"use strict";

const { LogicalException } = require("@adonisjs/generic-exceptions");

class ResourseNotExistException extends LogicalException {
  handle(error, { response }) {
    return response.status(404).json({
      error: "Resourse not exists",
    });
  }
}

module.exports = ResourseNotExistException;
