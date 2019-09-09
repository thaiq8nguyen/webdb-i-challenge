const db = require("../data/dbConfig");

const getAllAccount = query => {
  console.log(query);
  return db("accounts")
    .select()
    .limit(query.limit ? query.limit : 100000)
    .orderBy(query.sortby ? query.sortby : "id", query.sortdir)
    .then(accounts => accounts);
};

const getAccount = id => {
  return db("accounts")
    .where({ id: id })
    .select()
    .then(account => account);
};

const createAccount = newAccount => {
  return db("accounts")
    .insert({
      name: newAccount["name"],
      budget: newAccount["opening_budget"]
    })
    .then(ids => {
      return getAccount(ids[0]);
    });
};

const updateAccount = (id, account) => {
  return db("accounts")
    .where({ id: id })
    .update({
      name: account["name"],
      budget: account["opening_budget"]
    })
    .then(account => account);
};

const deleteAccount = id => {
  return db("accounts")
    .where({ id: id })
    .del()
    .then(account => account);
};

module.exports = {
  getAllAccount,
  getAccount,
  createAccount,
  updateAccount,
  deleteAccount
};
