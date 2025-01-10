import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [message, setMessage] = useState(null)
  const [type, setType] = useState(null)

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('blogUserToken', JSON.stringify(user))
      blogService.setToken(user.token)

      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
      showNotification('Wrong credentials', true)
    }
  }

  const handleLogout = async (event) => {
    const name = user.name

    window.localStorage.removeItem('blogUserToken')
    setUser(null)
    showNotification(`${name} logged out`, false)
  }

  const handleAdd = async (event) => {
    event.preventDefault()
    try {
      const response = await blogService.postBlog({
        title,
        author,
        url
      })

      setTitle('')
      setAuthor('')
      setUrl('')
      setBlogs(await blogService.getAll())
      showNotification(`${response.title} ${response.author} added`, false)
    } catch {
      showNotification('Failed adding blog', true)
    }
  }

  const showNotification = (message, isError = false) => {
    setMessage(message)
    setType(isError ? 'notification-fail' : 'notification-pass')
    setTimeout(() => {
      setMessage(null)
      setType('notification-pass')
    }, 3000)
  }

  const addForm = () => (
    <>
      <form onSubmit={handleAdd}>
      <div>
        <h2>Create New</h2>
        <div>
        Title
        <input
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
        />
        </div>

        <div>
        Author
        <input
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
        />
        </div>

        <div>
        Url
        <input
          type="text"
          value={url}
          name="Url"
          onChange={({ target }) => setUrl(target.value)}
        />
        </div>
        <button
          type="submit"
        >create</button>
      </div>
      </form>
    </>
  )

  const blogsForm = () => (
    <div>
      <h2>blogs</h2>
      <Notification message={message} type={type}/>
      <p>{user.name} logged in </p>
      <button onClick={handleLogout}>logout</button><br/>

      {addForm()}<br/>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  const loginForm = () => (
    <>
      <form onSubmit={handleLogin}>
      { <Notification message={message} type={type}/> }
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <br />
      <div>
        password
        <input
          type="password"
          value={password}
          name="password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
      </form>
    </>
  )

  // preserve login
  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('blogUserToken')

    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  // fetch blogs
  useEffect( () => {
    if (user) {
      const getData = async () => {
        const blogs = await blogService.getAll()

        if (blogs) {
          setBlogs(blogs)
        } else {
          setBlogs([])
        }
      }

      getData()
    }
  }, [user])

  return (
    <>
    {user === null ? loginForm() : blogsForm()}
    </>
  )
}

export default App