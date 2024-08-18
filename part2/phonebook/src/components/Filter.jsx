const Filter = ({ handler, value}) => {
    return <div>
        Filter shown with <input onChange={handler} value={value}/>
    </div>
}

export default Filter;