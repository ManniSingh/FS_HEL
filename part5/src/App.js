/* eslint-disable no-inner-declarations */
import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/togglable'
import LoginForm from './components/login'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(false)

  const blogFormRef = useRef()

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
          const blogs_ = await blogService.getAll()
          setBlogs(blogs_.sort((a, b) => b.likes-a.likes))
        }catch(exception){
          setMessage(exception.message)
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
    <Togglable buttonLabel="log in">
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    </Togglable>
  )

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    try{
      const returnedBlog = await blogService.create(blogObject)
      console.log(returnedBlog)
      setBlogs(blogs.concat(returnedBlog).sort((a, b) => b.likes-a.likes))
    }catch(exception){
      setMessage(exception.message)
      setError(true)
      setTimeout(() => {
        setMessage(null)
        setError(false)
      }, 5000)
    }
  }

  const updateBlog = async (id, blogObject) => {
    try{
      const returnedBlog = await blogService.update(id, blogObject)
      setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog).sort((a, b) => b.likes-a.likes))
    }catch(exception){
      setMessage(exception.message)
      setError(true)
      setTimeout(() => {
        setMessage(null)
        setError(false)
      }, 5000)
    }
  }

  const removeBlog = async (id) => {
    try{
      await blogService.remove(id)
      setBlogs(blogs.filter(blog => blog.id !== id))
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
    <Togglable buttonLabel='new note' ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  if (user === null) {
    return (
      <div>
        <Notification message={message} error={error} />
        <h2>Log in to application</h2>
        {loginForm()}
      </div>
    )
  } else{
    return (
      <div>
        <Notification message={message} error={error} />
        <h2>blogs</h2>
        <p>{user.name} logged-in
          <button onClick={() => {
            window.localStorage.clear()
            setUser(null)
          }}>Log out</button>
        </p>
        <h2>Create new</h2>
        {blogForm()}
        <div className='bloglist'>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} updateBlog={updateBlog} removeBlog={removeBlog}/>
          )}
        </div>
      </div>
    )
  }
}

export default App