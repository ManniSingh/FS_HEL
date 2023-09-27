import React, { useState, useContext } from 'react'
import OpContext from '../OpContext'
import { useParams } from 'react-router-dom'

function Blog() {
  const [ message, blogs, users, updateBlog, removeBlog ] = useContext(OpContext)
  const { id } = useParams()
  //console.log('BLOGS:'+JSON.stringify(blogs))
  //console.log('USERS:'+JSON.stringify(users))
  //console.log('Blog id from route parameters: ' + id)
  //console.log('All blog IDs: ' + blogs.map(blogData => blogData.id).join(', '))
  const blog = blogs?blogs.find((blogData) => blogData.id===id):[]
  //console.log(JSON.stringify(blog))
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  const [visible, setVisible] = useState(false)
  const [commentInput, setCommentInput] = useState('')
  if (!blog){
    return null
  }
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const update = () => {
    const blogObject = {
      title: blog.title,
      author: blog.author,
      likes: blog.likes + 1,
      url: blog.url,
    }
    //console.log('new blog:'+JSON.stringify(blogObject))
    updateBlog(blog.id, blogObject)
  }

  const pushComment = (event) => {
    event.preventDefault()
    const blogObject = {
      title: blog.title,
      author: blog.author,
      likes: blog.likes,
      url: blog.url,
      comments: [...blog.comments, commentInput],
    }
    console.log('new blog:'+JSON.stringify(blogObject))
    updateBlog(blog.id, blogObject)
    setCommentInput('')
  }

  const remove = () => {
    const result = window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)
    if (result) removeBlog(blog.id)
  }

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible} className="hiddenBlog">
        {blog.title}
        {' '}
        by
        {' '}
        {blog.author}
        {' '}
        <button type="button" onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible} className="visibleBlog">
        {blog.title}
        {' '}
        <button type="button" onClick={toggleVisibility}>hide</button>
        {' '}
        <br />
        {blog.url}
        {' '}
        <br />
        Likes:
        {' '}
        {blog.likes}
        {' '}
        <button type="button" onClick={() => update()}>like</button>
        {' '}
        <br />
        {blog.name}
        {' '}
        <br />
        <button type="button" onClick={() => remove()}>Remove</button>
      </div>
      <div>
        <h2>comments</h2>
        <form onSubmit={pushComment}>
          <div>
            <input
              id="comment"
              type="text"
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
            />
          </div>
          <button id="add_comment" type="submit">add comment</button>
        </form>
        <ul>
          {blog.comments.map((comment, index) => (
            <li key={index}>{comment}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Blog
