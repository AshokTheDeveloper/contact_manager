const Contact = require("../models/contactModel");
const mongoose = require("mongoose");

const updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, address } = req.body;

    if (!name && !email && !phone && !address) {
      return res.status(400).json({
        success: false,
        message: "At least one field is required to update",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid contact ID",
      });
    }

    const contact = await Contact.findById(id);
    if (!contact) {
      return res
        .status(404)
        .json({ success: false, message: "Contact not found" });
    }

    const updatedContact = await Contact.findByIdAndUpdate(
      id,
      {
        name,
        email,
        phone,
        address,
      },
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      success: true,
      message: "Contact updated successfully",
      updatedContact,
    });
  } catch (error) {
    console.log("Error updating contact: ", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = updateContact;
