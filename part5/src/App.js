import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login' 

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null) 
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    if (user!==null){
      async function fetch() {
        try{
          const blogs = await blogService.getAll()
          setBlogs(blogs)
        }catch(exception){
          setMessage(exception)
          setError(true)
          setTimeout(() => {
            setMessage(null)
            setError(false)
          }, 5000)
        }
      }
      fetch()
    }
  },[user])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage('Wrong credentials')
      setError(true)
      setTimeout(() => {
        setMessage(null)
        setError(false)
      }, 5000)
    }
  }

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
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )

  const [newTitle, setNewTitle] = useState('')
  const [newAuth, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')


  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }
  const handleAuthChange = (event) => {
    setNewAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const addBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuth,
      url: newUrl
    }
    try{
      const returnedBlog = await blogService.create(blogObject)
      console.log(returnedBlog)
      setBlogs(blogs.concat(returnedBlog))
      setNewTitle('')
      setNewAuthor('')
      setNewUrl('')
      setMessage(`A new blog ${newTitle} is created by ${newAuth}`)
      setTimeout(() => {
        setMessage(null)
        setError(false)
      }, 5000)
    }catch(exception){
      setMessage(exception.message)
      setError(true)
      setTimeout(() => {
        setMessage(null)
        setError(false)
      }, 5000)
    }
    }

  const blogForm = () => (
    <form onSubmit={addBlog}>
      title: <input value={newTitle} onChange={handleTitleChange} /><br />
      author: <input value={newAuth} onChange={handleAuthChange} /><br />
      url: <input value={newUrl} onChange={handleUrlChange} /><br />
      <button type="submit">create</button>
    </form>  
  )


  if (user === null) {
    return (
      <div>
        <Notification message={message} error={error} />
        <h2>Log in to application</h2>
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <Notification message={message} error={error} />
      <h2>blogs</h2>
      <p>{user.name} logged-in
      <button onClick={()=>{
              window.localStorage.clear()
              setUser(null)
              }}>Log out</button>
      </p>
      <h2>Create new</h2>
      {blogForm()}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
    
}

export default App