const Entry = ({ name, number, deleteHandler }) => {
    return (
        <>
        <p>{name} {number}</p><button onClick={deleteHandler}>delete</button>
        </>
    )
}

export default Entry