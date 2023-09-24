/* eslint-disable no-inner-declarations */
import { useState, useReducer, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import { Users, UserBlogs } from './components/users'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/users'
import Togglable from './components/togglable'
import LoginForm from './components/login'
import BlogForm from './components/BlogForm'
import OpContext from './OpContext'
import userReducer from './reducers/userreducer'
import notifyReducer from './reducers/notifyReducer'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { BrowserRouter, Routes, Route } from 'react-router-dom'


const App = () => {
  const [credentials, userDispatch] = useReducer(userReducer, ['',''])
  const queryClient = useQueryClient()
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, msgDispatch] = useReducer(notifyReducer, '')
  const [users, setUsers] = useState([])

  const blogFormRef = useRef()

  const readLocal = () => {
    const loggedUserJSON = JSON.stringify(window.localStorage.getItem('loggedBlogappUser'))
    if (loggedUserJSON!=='null') {
      return JSON.parse(loggedUserJSON)
    }
    else{
      return null
    }
  }

  // load logged user from local storage.
  useEffect(() => {
    const localUser = readLocal()
    if (localUser) {
      setUser(localUser)
      blogService.setToken(localUser.token)
    }
  }, [])

  const _blogs = useQuery({
    queryKey: ['blogs'],
    queryFn: async () => {
      const localUser = readLocal()
      if (localUser) {
        const response = await blogService.getAll()
        //console.log('in query:' + JSON.stringify(response))
        return response.sort((a, b) => b.likes - a.likes)
      } else {
        return null
      }
    },
    refetchOnWindowFocus: false
  })

  const _users = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const localUser = readLocal()
      if (localUser) {
        const response = await userService.users()
        //console.log('in query:' + JSON.stringify(response))
        return response.sort((a, b) => b.blogs.length - a.blogs.length)
      } else {
        return null
      }
    },
    refetchOnWindowFocus: false
  })

  const displayMsg = (msg) => {
    msgDispatch({ payload:msg })
    setTimeout(() => {
      msgDispatch({ payload:null })
    }, 5000)}

  const display = (msg) => {displayMsg(msg)} // to ensure no infinite re-render

  const userMutate = useMutation({
    mutationFn: async () => {
      const usrblogs = await loginService.login(credentials)
      return usrblogs
    },
    onSuccess: async (response) => {
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(response))
      setUser(response)
      //console.log('token:'+response.token)
      blogService.setToken(response.token)
      //userDispatch(['',''])
      await queryClient.invalidateQueries(['blogs']) // Await here
      await queryClient.refetchQueries(['blogs'])
      const fetchedBlogs = queryClient.getQueryData(['blogs'])
      await queryClient.invalidateQueries(['users']) // Await here
      await queryClient.refetchQueries(['users'])
      const fetchedUsers = queryClient.getQueryData(['users'])
      //console.log('fetched:'+JSON.stringify(fetchedBlogs))
      if (_blogs.isSuccess) {
        setBlogs(fetchedBlogs)
      }
      if (_users.isSuccess) {
        setUsers(fetchedUsers)
      }
    },
    onError: (error) => {
      display(error.message)
    }
  })

  const blogsMutate = useMutation({
    mutationFn: async (blogObject) => await blogService.create(blogObject),
    onSuccess: (blogObject) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData({ queryKey: ['blogs'] }, blogs.concat(blogObject))
      setBlogs(blogs.concat(blogObject).sort((a, b) => b.likes-a.likes))
    },
    onError: (error) => {
      display(error.message)
    }
  })

  const blogMutate = useMutation({
    mutationFn: async ({ id, blogObject }) => {
      const updatedBlog = await blogService.update(id, blogObject)
      return updatedBlog
    },
    onSuccess: async (blogObject) => {
      await queryClient.invalidateQueries({ queryKey: ['blogs'] })
      setBlogs(blogs.map(blog => blog.id !== blogObject.id ? blog : blogObject).sort((a, b) => b.likes-a.likes))
    },
    onError: (error) => {
      display(error.message)
    }
  })

  const removeBlogMutate = useMutation({
    mutationFn: async (id) => {
      await blogService.remove(id)
      return id
    },
    onSuccess: (id) => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      setBlogs(blogs.filter(blog => blog.id !== id))
    },
    onError: (error) => {
      display(error.message)
    }
  })

  const handleLogin = (event) => {
    event.preventDefault()
    userMutate.mutate()
  }

  const loginForm = () => (
    <Togglable buttonLabel="log in">
      <LoginForm
        username={credentials[0]}
        password={credentials[1]}
        handleUsernameChange={({ target }) => userDispatch({ payload:[target.value,credentials[1]] })}
        handlePasswordChange={({ target }) => userDispatch({ payload:[credentials[0],target.value] })}
        handleSubmit={handleLogin}
      />
    </Togglable>
  )

  const addBlog =(blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogsMutate.mutate(blogObject)
  }

  const updateBlog = (id, blogObject) => {
    blogMutate.mutate({ id, blogObject })
  }

  const removeBlog = (id) => {
    removeBlogMutate.mutate(id)
  }

  const handleUserClick = (userBlogs) => {
    console.log(userBlogs)
  }
  const blogForm = () => (
    <Togglable buttonLabel='new note' ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )
  if (user === null) {
    return (
      <OpContext.Provider value={[message, updateBlog, removeBlog]}>
        <div>
          <Notification />
          <h2>Log in to application</h2>
          {loginForm()}
        </div>
      </OpContext.Provider>
    )
  } else{
    console
    return (
      <OpContext.Provider value={[message, users, updateBlog, removeBlog]}>
        <BrowserRouter>
          <div>
            <Notification />
            <h2>blogs</h2>
            <p>{user.name} logged-in
              <button onClick={() => {
                window.localStorage.clear()
                setUser(null)
              }}>Log out</button>
            </p>
            <Routes>
              <Route path="/" element={<Users />} />
              <Route path="/users/:id" element={<UserBlogs />} />
            </Routes>
            {/*
          <h2>Create new</h2>
          {blogForm()}
          <div className='bloglist'>
            {blogs?blogs.map(blog => <Blog key={blog.id} blog={blog}/>
              //<Blog key={blog.id} blog={blog} updateBlog={updateBlog} removeBlog={removeBlog}/>
            ):''}
          </div>
           */}
          </div>
        </BrowserRouter>
      </OpContext.Provider>
    )
  }
}

export default App