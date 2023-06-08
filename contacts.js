
import { nanoid } from 'nanoid';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const contactsPath = path.join(__dirname,"db", "contacts.json");

// TODO: задокументувати кожну функцію
// const listContacts = async () => {
export const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);

}

// const getContactById = async contactId => {
export const getContactById = async contactId => {
  const contacts = await listContacts();
  const result = contacts.find(contact => contactId === contact.id);
  return result;

}

// const removeContact = async contactId => {
export const removeContact = async contactId => {
  const contacts = await listContacts();
  const findIndex = contacts.findIndex(contact => contactId === contact.id);
    if (findIndex === -1) {
        return null;
    }
    const [result] = contacts.splice(findIndex, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return result;
  
};

// const addContact = async (name, email, phone) => {
export const addContact = async (data) => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    ...data
    // name: name,
    // email: email,
    // phone: phone,
  }
  contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  
}

// module.export = {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact
// }