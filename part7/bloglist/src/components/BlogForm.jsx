import React, { useState } from 'react'

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
    <form onSubmit={addBlog}>
      title:
      {' '}
      <input id="title" value={newTitle} onChange={handleTitleChange} />
      <br />
      author:
      {' '}
      <input id="author" value={newAuth} onChange={handleAuthChange} />
      <br />
      url:
      {' '}
      <input id="url" value={newUrl} onChange={handleUrlChange} />
      <br />
      <button type="submit">create</button>
    </form>
  )
}

export default BlogForm
