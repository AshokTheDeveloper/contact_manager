const request = require("supertest");
const app = require("../src/app");
const mongoose = require("mongoose");

let contactId;
process.env.NODE_ENV = "test";

describe("Contact API", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI_TEST);
  });

  // 1.Test for creating a new contact
  test("Should create a new contact", async () => {
    const newContact = {
      name: "Sophie",
      email: "sophie@example.com",
      phone: "8847895647",
      address: "123 Street, City",
    };

    const response = await request(app).post("/contacts").send(newContact);

    expect(response.status).toBe(201);
    expect(response.body.contact).toHaveProperty("name", "Sophie");

    contactId = response.body.contact._id;
  });

  // 2.Test for fetching all contacts
  test("Should fetch all contacts or filter contacts using search query", async () => {
    // Fetch all contacts without search query
    const allContactsResponse = await request(app).get("/contacts");
    expect(allContactsResponse.status).toBe(200);
    expect(allContactsResponse.body.contacts.length).toBeGreaterThan(0);

    // Fetch contacts using search query
    const searchQuery = "Sophie";
    const searchResponse = await request(app).get(
      `/contacts?search=${searchQuery}`
    );

    expect(searchResponse.status).toBe(200);
    expect(searchResponse.body.contacts.length).toBeGreaterThan(0);

    searchResponse.body.contacts.forEach((contact) => {
      expect(
        contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          contact.email.toLowerCase().includes(searchQuery.toLowerCase())
      ).toBeTruthy();
    });
  });

  // 3.Test for fetching a single contact
  test("Should fetch a single contact by ID", async () => {
    const response = await request(app).get(`/contacts/${contactId}`);
    expect(response.status).toBe(200);
    expect(response.body.contact).toHaveProperty("_id", contactId);
  });

  // 4.Test for updating a contact by ID
  test("Should update a contact by ID", async () => {
    expect(contactId).toBeDefined();

    const updatedData = {
      name: "Sophie Updated",
      email: "sophieupdated@example.com",
      phone: "9876543210",
      address: "456 New Street, City",
    };

    const response = await request(app)
      .put(`/contacts/${contactId}`)
      .send(updatedData);

    expect(response.status).toBe(200);
    expect(response.body.updatedContact).toHaveProperty(
      "name",
      "Sophie Updated"
    );
  });

  // 5.Test for deleting a contact by ID
  test("Should delete a contact by ID", async () => {
    const response = await request(app).delete(`/contacts/${contactId}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Contact deleted successfully");

    const checkResponse = await request(app).get(`/contacts/${contactId}`);
    expect(checkResponse.status).toBe(404);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });
});
