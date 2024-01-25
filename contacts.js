const fs = require('fs').promises;
const path = require('path');

const contactsPath = path.join("./db/contact.json");

const fetchContacts = async () => {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
};

const listContacts = async () => {
  try 
 { const contacts = await fetchContacts();
    console.table(contacts);
    return contacts
  } catch (error) {
    throw error;
  }
};


const getContactById = async (contactId) => {
  try
  { const contacts = await fetchContacts();
    const contact = contacts.find((contact) => contact.id === contactId);
    console.log(contact);
    return contact;
    } catch (error) {
    throw error;
  }
    
}

const removeContact = async (contactId) => {
    try {
    const contacts = await fetchContacts();
    const contactsUpdated = contacts.filter(contact => contact.id !== contactId)
    await fs.writeFile(contactsPath, JSON.stringify(contactsUpdated), null, 2);
    console.log(`Contact with id ${contactId} has been removed`);
 } catch (error) {
        throw error;
 }
}

const addContact = async (name, email, phone) => {
  try {
    const contacts = await fetchContacts();
    const contactIds = contacts.map(contact => parseInt(contact.id)).filter(id => !isNaN(id));
    const id = contactIds.length ? Math.max(...contactIds) + 1 : 1;
    const newContact = { id, name, email, phone };
    const updatedContacts = [...contacts, newContact];
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
    console.log(`Kontakt "${name}" o identyfikatorze ${id} został dodany.`);
  } catch (error) {
    throw error;
  }
}

module.exports = {
        listContacts,
        getContactById,
        removeContact,
        addContact
}