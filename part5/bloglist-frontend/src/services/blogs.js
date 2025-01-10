import axios from 'axios'
const baseUrl = '/api/blogs'
const host = 'http://localhost:3003'

let token = null;

const getAll = async () => {

  const config = {
    headers: {
      Authorization: token
    },
  }

  const response = await axios.get(`${host}${baseUrl}`, config)
  return response.data
}

const postBlog = async ({ title, author, url }) => {
  const newBlog ={
    title,
    author,
    url
  }

  const config = {
    headers: {
      Authorization: token
    },
  }

  const response = await axios.post(`${host}${baseUrl}`, newBlog, config)
  return response.data
}

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}


export default { getAll, setToken, postBlog }