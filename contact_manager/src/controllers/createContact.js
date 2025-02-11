const Contact = require("../models/contactModel");

const createContact = async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;

    if (!name || !email || !phone || !address) {
      return res
        .status(400)
        .json({ success: false, message: "All the fields are required" });
    }

    const existingContact = await Contact.findOne(
      {
        $or: [{ email }, { phone }],
      },
      { _id: 1 }
    );

    if (existingContact) {
      return res
        .status(400)
        .json({ success: false, message: "Contact already exists" });
    }

    const newContact = await Contact.create({ name, email, phone, address });
    return res.status(201).json({
      success: true,
      message: "Contact created successfully",
      contact: newContact,
    });
  } catch (error) {
    console.log("Error creating contact: ", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = createContact;
