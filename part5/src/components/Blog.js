import React,{ useState } from 'react'

const Blog = ({ blog, updateBlog, removeBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const update = () => {
    const blogObject = {
      title: blog.title,
      author: blog.author,
      likes: blog.likes+1,
      url: blog.url
    }
    updateBlog(blog.id, blogObject)
  }

  const remove = () => {
    const result = window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)
    if (result) removeBlog(blog.id)
  }

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        {blog.title} by {blog.author} <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible}>
        {blog.title} <button onClick={toggleVisibility}>hide</button> <br />
        {blog.url} <br />
        Likes: {blog.likes}  <button onClick={() => update()}>like</button> <br />
        {blog.name} <br />
        <button onClick={() => remove()}>Remove</button>
      </div>
    </div>
  )
}


export default Blog