import axios from 'axios'

const loginUrl = '/api/login'
const host = 'http://localhost:3003'


const login = async (credentials) => {
    const response = await axios.post(`${host}${loginUrl}`, credentials)
    return response.data
}

export default { login }