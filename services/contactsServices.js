import Contact from '../schemas/contactsModel.js';

async function listContacts() {
  const contacts = await Contact.find();
  return contacts;
}

async function getContactById(contactId) {
  const contact = await Contact.findById(contactId);
  return contact ? contact : null;
}

async function removeContact(contactId) {
  const contact = await Contact.findByIdAndDelete({ _id: contactId });
  return contact;
}

async function addContact(name, email, phone) {
  const newContact = await Contact.create({ name, email, phone });
  return newContact;
}

async function updateContact(id, updatedData) {
  const updContact = await Contact.findByIdAndUpdate({ _id: id }, updatedData, {
    new: true,
  });
  return updContact;
}

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};