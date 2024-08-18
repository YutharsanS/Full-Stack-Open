const PersonalForm = ({name, nameHandler, number, numberHandler, submitHandler}) => {
    return <form onSubmit={submitHandler}>
        <div>
        name: <input value={name} onChange={nameHandler}/><br/><br/>
        number: <input value={number} onChange={numberHandler} />
        </div>
        <div>
        <button type='submit'>add</button>
        </div>
    </form>
}

export default PersonalForm;