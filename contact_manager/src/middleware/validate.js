const { body, validationResult } = require("express-validator");

const validationRules = [
  body("name")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters long"),
  body("email").trim().normalizeEmail().isEmail().withMessage("Invalid email"),
  body("phone")
    .trim()
    .isMobilePhone("any")
    .withMessage(
      "Phone number must be a valid mobile number with 10-15 digits"
    ),
  body("address")
    .trim()
    .isLength({ min: 5, max: 100 })
    .withMessage("address must be 5 to 100 characters long"),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = { validationRules, validate };
