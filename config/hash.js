"use strict";

const Env = use("Env");

module.exports = {
  driver: Env.get("HASH_DRIVER", "bcrypt"),
  bcrypt: {
    rounds: 10,
  },
  argon: {
    type: 1,
  },
};
