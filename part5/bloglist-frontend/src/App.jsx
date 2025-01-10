import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

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
      console.log('Wrong credentials')
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()

    window.localStorage.removeItem('blogUserToken')
    setUser(null)
  }

  const blogsForm = () => (
    <form onSubmit={handleLogout}>
      <h2>blogs</h2>
      <p>Logged in as {user.name} </p>
      <button type="submit">logout</button><br/>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </form>
  )

  const loginForm = () => (
    <form onSubmit={handleLogin}>
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