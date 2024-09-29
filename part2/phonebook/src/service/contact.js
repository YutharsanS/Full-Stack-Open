import axios from 'axios';

const url = 'http://localhost:3001/persons'

const addEntry = (entry) => {
    return axios.post(url, entry).then(res => res.data)
}

const getAll = () => {
    return axios.get(url).then(res => res.data)
}

const deleteEntry = (id) => {
    const targetUrl = `${url}/${id}`
    console.log(targetUrl)
    const request = axios.delete(targetUrl)
    return request
}

const updateEntry = (id, entry) => {
    const newUrl = `${url}/${id}`
    return axios
        .put(newUrl, entry)
        .then(res => res.data)
}

export default {addEntry, getAll, deleteEntry, updateEntry}