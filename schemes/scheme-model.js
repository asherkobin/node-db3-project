const DB = require("../data/db-config");

function find() {
  return DB("schemes");
}

function findById(id) {
  return DB("schemes")
    .where({ id: id })
    .first();
}

function findSteps(id) {
  return DB("steps")
    .select("steps.id", "schemes.scheme_name", "steps.step_number", "steps.instructions")
    .join("schemes", { "steps.scheme_id": "schemes.id" })
    .where("schemes.id", id);
}

function add(scheme) {
  return DB("schemes")
    .insert(scheme)
    .then(ids => {
      return findById(ids[0]);
    });
}

function update(changes, id) {
  return DB("schemes")
    .update(changes)
    .where({ id })
    .then(() => {
      return findById(id)
    });
}

function remove_XXXXX(id) {
  return findById(id)
    .then(schemeToRemove => {
      DB("schemes")
        .delete()
        .where({ id })
        .then(() => {
          return new Promise((resolve, reject) => {
            resolve(schemeToRemove);
          });
        });
    });
}

function remove(id) {
  return DB("schemes")
    .delete()
    .where({ id });
}

module.exports = {
  find,
  findById,
  findSteps,
  add,
  update,
  remove
};