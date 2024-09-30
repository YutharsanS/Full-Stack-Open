import { useEffect, useState } from 'react';
import Filter from "./components/Filter";
import PersonalForm from "./components/PersonalForm"
import Persons from "./components/Persons"
import Notification from './components/Notification';
import axios from 'axios';
import contact_service from './service/contact'
import './index.css';

function App() {
  const [persons, setPersons] = useState([])
  const [searchContent, setSearchContent] = useState(persons);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newSearch, setNewSearch] = useState('');
  const [notification, setNotification] = useState('');
  const [notificationStatus, setNotificationStatus] = useState('notification-pass')

  //fetching data from the server
  const hook = () => {
    contact_service.getAll()
    .then(response => {
      setPersons(response);
      changeSearchContent(response, newSearch);
    });
  }

  // useeffect hook
  useEffect(hook, []);

  // handlers
  const onSubmit = (event) => {
    event.preventDefault();
    console.log('Clicked', event.target);

    const index = persons.findIndex((person) => person.name === newName)

    if(index != -1){
      const shouldUpdate = confirm(`${newName} is already added to phonebook, replace the old number with new one?`);

      if (shouldUpdate) {
        const person = persons[index]
        const new_entry = { ...person, number: newNumber }

        contact_service.updateEntry(person.id, new_entry)
          .then((response) => {
            const updatedPersons = [...persons]
            updatedPersons[index] = { id: response.id, name: response.name, number: response.number }
            setPersons(updatedPersons)
            changeSearchContent(updatedPersons, newSearch);
            setNewName('');
            setNewNumber('');
            setNotification(`${response.name} was updated`);
            setTimeout(() => {
              setNotification(null)
            }, 3000)
          }).catch(error => {
            showNotification( `Information about ${personToDelete.name} is already removed from server`, true)
          })
      }
    } else {
      const new_entry = { name: newName, number: newNumber }

        contact_service.addEntry(new_entry).then(
        response => {
          const updatedPersons = persons.concat(response);
            setPersons(updatedPersons);
            changeSearchContent(updatedPersons, newSearch);
            setNewName('');
            setNewNumber('');
            setNotification(`${response.name} was added`)
            setTimeout(() => {
            setNotification(null)
          }, 3000)
        }
      ).catch(error => {
        console.log('Error when inserting', error)
      })
    }
  }

  const deleteOnPressed = (id) => {

    const personToDelete = persons.find((person) => person.id === id)

    contact_service
      .deleteEntry(id)
      .then((response) => {
        const updatedPersons = persons.filter((person) => person.id != id)
        setPersons(updatedPersons)
        changeSearchContent(updatedPersons, newSearch)
       }
    ).catch((error) => {
      showNotification( `Information about ${personToDelete.name} is already removed from server`, true)
      }
    )
  }

  const nameOnChanged = (event) => {
    setNewName(event.target.value);
  }

  const numberOnChanged = (event) => {
    setNewNumber(event.target.value);
  }

  const searchOnChanged = (event) => {
    const text = event.target.value;
    setNewSearch(text);
    changeSearchContent(persons, text);
  }

  // helper functions
  const filterSearch = (persons, text) => (
      persons.filter((person) =>
      person.name.toLowerCase().includes(text.toLowerCase())
    )
  );

  const changeSearchContent = (persons, text) => {
    if(text === ''){
      setSearchContent(persons);
    } else {
      setSearchContent(filterSearch(persons, text));
    }
  }

  const showNotification = (message, isError = false) => {
    setNotification(message)
    setNotificationStatus(isError ? 'notification-fail' : 'notification-pass')
    setTimeout(() => {
      setNotification(null)
      setNotificationStatus('notification-pass')
    }, 3000)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} status={notificationStatus} />
      <Filter handler={searchOnChanged} value={newSearch} />
      <h3>Add a new</h3>
      <PersonalForm name={newName} nameHandler={nameOnChanged} number={newNumber} numberHandler={numberOnChanged} submitHandler={onSubmit} />
      <h2>Numbers</h2>
      <Persons content={searchContent} deleteHandler={deleteOnPressed} />
    </div>
  )
}

export default App
