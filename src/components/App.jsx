
import { useRef } from 'react';
import { useState, useEffect, useMemo } from 'react';
import Form from './form/form';
import FormPhonebook from './formPhonebook/formPhonebook';
import Filter from './filter/filter';
import styles from './form/form.module.css';

export const App = () => {
  const [contacts, setContacts] = useState(
    () => JSON.parse(localStorage.getItem('contacts')) ?? []
  );

  const [filter, setFilter] = useState('');
  const firstStartRef = useRef(false);

  useEffect(() => {
    if (firstStartRef.current) {
      const data = JSON.stringify(contacts);
      localStorage.setItem('contacts', data);
    }
    firstStartRef.current = true;
  }, [contacts]);

  const handleSubmit = obj => {
    setContacts(prev => [...prev, obj]);
  };

  const handleChange = e => {
    setFilter(e.target.value);
  };
  const handleDeleteContacts = id => {
    setContacts(contacts.filter(el => el.id !== id));
  };

  const filterPhonebookContacts = useMemo(
    () =>
      contacts.filter(el =>
        el.name.toLowerCase().includes(filter.toLocaleLowerCase())
      ),
    [filter, contacts]
  );
  return (
    <div className={styles.box}>
      <div className={styles.boxPhone}>
        <h1 className={styles.titlePhone}>Phonebook</h1>

        <Form
          contacts={contacts} handleSubmit={handleSubmit}
        />
      </div>
      <div className={styles.contacts}>
        <h2 className={styles.titleContact}>Contacts</h2>
        <h2 className={styles.titleFind}>Find contacts by name</h2>

        <Filter
          filter={filter}
          handleChange={handleChange}
        />

        <FormPhonebook
          contacts={filterPhonebookContacts}
          handleDeleteContacts={handleDeleteContacts}

        />
      </div>
    </div>
  );
};