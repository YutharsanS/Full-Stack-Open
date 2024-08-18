import { useState } from 'react';
import Filter from "./components/Filter";
import PersonalForm from "./components/PersonalForm"
import Persons from "./components/Persons"

function App() {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [searchContent, setSearchContent] = useState(persons);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newSearch, setNewSearch] = useState('');
  
  // handlers
  const onSubmit = (event) => {
    event.preventDefault();
    console.log('Clicked', event.target);
    
    if(persons.map((person) => person.name).indexOf(newName) != -1){
      alert(`${newName} is already added to phonebook`);
    } else {
      const updatedPersons = persons.concat({ name: newName, number: newNumber});
      setPersons(updatedPersons);
      changeSearchContent(updatedPersons, newSearch);
      setNewName('');
      setNewNumber('');
    }
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

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handler={searchOnChanged} value={newSearch} />
      <h3>Add a new</h3>
      <PersonalForm name={newName} nameHandler={nameOnChanged} number={newNumber} numberHandler={numberOnChanged} submitHandler={onSubmit} />
      <h2>Numbers</h2>
      <Persons content={searchContent} />
    </div>
  )
}

export default App
