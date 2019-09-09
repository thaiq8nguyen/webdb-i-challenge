const express = require("express");
const router = express.Router();
const {
  getAllAccount,
  getAccount,
  createAccount,
  updateAccount,
  deleteAccount
} = require("./accountModel");

router.post("/", async (req, res) => {
  try {
    const account = await createAccount(req.body);
    res.status(201).json({ account });
  } catch (errors) {
    res.status(500).json({ message: "Unable to create account" });
  }
});

router.get("/", async (req, res) => {
  try {
    const accounts = await getAllAccount();

    res.json({ accounts });
  } catch (errors) {
    res.status(500).json({ message: "Unable to retrieve all accounts" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const account = await getAccount(req.params.id);

    res.json({ account });
  } catch (errors) {
    res.status(500).json({ message: "Unable to retrieve account" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const account = await updateAccount(req.params.id, req.body);

    res.json({ account });
  } catch (errors) {
    console.log(errors);
    if (errors.errno === 19) {
      res.status(500).json({
        message:
          "Unable to update account because the account name has been taken"
      });
    }
    res.status(500).json({ message: "Unable to update account" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const account = await deleteAccount(req.params.id);
    res.json({ account });
  } catch (errors) {
    console.log(errors);
    res.status(500).json({ message: "Unable to delete the account" });
  }
});

module.exports = router;
