const Contact = require("../models/contactModel");

const allContacts = async (req, res) => {
  try {
    const { search } = req.query;
    const filter = search
      ? {
          $or: [
            { name: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    const contacts = await Contact.find(filter);

    return res.status(200).json({
      success: true,
      message: contacts.length
        ? "Contacts retrieved successfully"
        : "No contacts found",
      totalContacts: contacts.length,
      contacts,
    });
  } catch (error) {
    console.log("Error fetching contacts: ", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = allContacts;
