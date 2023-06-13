
import { nanoid } from 'nanoid';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const contactsPath = path.join(__dirname,"db", "contacts.json");

export const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
  }
  catch (error) {
    console.log(error);
  }
}

export const getContactById = async contactId => {
  try {
    const contacts = await listContacts();
    const result = contacts.find(contact => contactId === contact.id);
    return result;
  }
  catch (error) {
    console.log(error);
  }
}

export const removeContact = async contactId => {
  try {
    const contacts = await listContacts();
    const findIndex = contacts.findIndex(contact => contactId === contact.id);
    if (findIndex === -1) {
      return null;
    }
    const [result] = contacts.splice(findIndex, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return result;
  }
  catch (error) {
    console.log(error);
  }
};

export const addContact = async (data) => {
  try {
    const contacts = await listContacts();
    const newContact = {
      id: nanoid(),
      ...data
    }
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  }
  catch (error) {
    console.log(error);
  }
}