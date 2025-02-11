const express = require("express");
const router = express.Router();

const { validationRules, validate } = require("../middleware/validate");

const createContact = require("../controllers/createContact");
const allContacts = require("../controllers/allContacts");
const getContact = require("../controllers/getContact");
const updateContact = require("../controllers/updateContact");
const removeContact = require("../controllers/removeContact");

router.get("/", allContacts);
router.get("/:id", getContact);

router.post("/", validationRules, validate, createContact);

router.put("/:id", validationRules, validate, updateContact);

router.delete("/:id", removeContact);

module.exports = router;
