const Contact = require("../models/contactModel");
const mongoose = require("mongoose");

const removeContact = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid contact ID",
      });
    }

    const deletedContact = await Contact.findByIdAndDelete(id);

    if (!deletedContact) {
      return res
        .status(404)
        .json({ success: false, message: "Contact not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Contact deleted successfully" });
  } catch (error) {
    console.log("Error deleting contact: ", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = removeContact;
