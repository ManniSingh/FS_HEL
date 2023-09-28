import React, { useState } from 'react'

import Tail from '../tail'
function BlogForm({ createBlog }) {
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

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuth,
      url: newUrl,
    }
    createBlog(blogObject)
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <Tail.form onSubmit={addBlog}>
      title:
      {' '}
      <Tail.input id="title" value={newTitle} onChange={handleTitleChange} />
      <br />
      author:
      {' '}
      <Tail.input id="author" value={newAuth} onChange={handleAuthChange} />
      <br />
      url:
      {' '}
      <Tail.input id="url" value={newUrl} onChange={handleUrlChange} />
      <br />
      <Tail.button type="submit">create</Tail.button>
    </Tail.form>
  )
}

export default BlogForm
