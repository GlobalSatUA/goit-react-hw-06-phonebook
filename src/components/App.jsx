import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import { addContact, deleteContact, updateFilter } from '../redux/contactsSlice';
import ls from 'local-storage';
import { nanoid } from 'nanoid';

const App = () => {
  const contacts = useSelector((state) => state.contacts);
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();
  

  useEffect(() => {
    ls.set('contacts', contacts);
  }, [contacts]);

  const handleAddContact = (name, number) => {
    const newContact = {
      id: nanoid(),
      name: name,
      number: number,
    };
    dispatch(addContact(newContact));
  };

  const handleDeleteContact = (id) => {
    dispatch(deleteContact(id));
  };

  const handleFilterChange = (event) => {
    dispatch(updateFilter(event.target.value));
  };

  const filteredContacts = filter ? contacts.filter((contact) =>
  contact.name.toLowerCase().includes(filter.toLowerCase())
) : contacts;


  return (
    <div style={{ maxWidth: '250px', padding: '20px' }}>
      <h1 style={{ marginBottom: '20px' }}>Phonebook</h1>
      <ContactForm contacts={contacts} onAddContact={handleAddContact} />

      <h2 style={{ marginTop: '40px' }}>Contacts</h2>
      <Filter value={filter} onChange={handleFilterChange} />
      <ContactList contacts={filteredContacts} onDeleteContact={handleDeleteContact} />
    </div>
  );
};

export default App;
