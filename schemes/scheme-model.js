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

async function remove(id) {
  const toRemove = await findById(id);
  
  await DB("schemes").where({id}).delete();

  return toRemove;
}

// function remove(id) {
//   return DB("schemes")
//     .delete()
//     .where({ id });
// }

module.exports = {
  find,
  findById,
  findSteps,
  add,
  update,
  remove
};