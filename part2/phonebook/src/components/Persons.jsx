import Entry from "./Entry";

const Persons = ({ content, deleteHandler }) => {
    return <>
        {content.map((person) => <Entry key={person.id} name={person.name} number={person.number}
            deleteHandler={() => {
                confirm(`Delete ${person.name}?`)
                deleteHandler(person.id)
                }
            }
        />)
        }
        </>
}

export default Persons;