const fs = require('fs').promises;
const path = require('path');

const contactsPath = path.join("./db/contact.json");

const fetchContacts = async () => {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
};

const listContacts = async () => {
  const contacts = await fetchContacts();
 console.table(contacts);
  return; 
};


const getContactById = async (contactId) => {
    const contacts = await fetchContacts();
    const contact = contacts.find((contact) => contact.id === contactId);
    console.log(contact);
    return;
    
}

const removeContact = async (contactId) => {
    try {
    const contacts = await fetchContacts();
    const contactsUpdated = contacts.filter(contact => contact.id !== contactId)
    await fs.writeFile(contactsPath, JSON.stringify(contactsUpdated));
    console.log(`Contact with id ${contactId} has been removed`);
 } catch (error) {
        console.error(error);
 }
}

const addContact = async (name, email, phone) => {
  try {
    const contacts = await fetchContacts();
    const id = contacts.length ? Math.max(...contacts.map(contact => parseInt(contact.id))) + 1 : 1;
    const newContact = { id, name, email, phone };
    const updatedContacts = [...contacts, newContact];
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts));
    console.log(`Contact "${name}" with id ${id} has been added.`);
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
        listContacts,
        getContactById,
        removeContact,
        addContact
}