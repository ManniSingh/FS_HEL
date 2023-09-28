import React, { useState, useContext } from 'react'
import OpContext from '../OpContext'
import { useParams } from 'react-router-dom'
import Tail from '../tail'

function Blog() {
  const [ message, blogs, users, updateBlog, removeBlog ] = useContext(OpContext)
  const { id } = useParams()
  //console.log('BLOGS:'+JSON.stringify(blogs))
  //console.log('USERS:'+JSON.stringify(users))
  //console.log('Blog id from route parameters: ' + id)
  //console.log('All blog IDs: ' + blogs.map(blogData => blogData.id).join(', '))
  const blog = blogs?blogs.find((blogData) => blogData.id===id):[]
  //console.log(JSON.stringify(blog))

  // const blogStyle = {
  //   paddingTop: 10,
  //   paddingLeft: 2,
  //   border: 'solid',
  //   borderWidth: 1,
  //   marginBottom: 5,
  // }

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
      comments: (blog.comments)?[...blog.comments, commentInput]:[commentInput],
    }
    //console.log('new blog:'+JSON.stringify(blogObject))
    updateBlog(blog.id, blogObject)
    setCommentInput('')
  }

  const remove = () => {
    const result = window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)
    if (result) removeBlog(blog.id)
  }

  return (
    <Tail.div>
      <div className='flex flex-col items-center mb-4' style={hideWhenVisible}>
        {blog.title}
        {' '}
        by
        {' '}
        {blog.author}
        {' '}
        <Tail.button type="button" onClick={toggleVisibility}>view</Tail.button>
      </div>
      <div style={showWhenVisible} className="visibleBlog">
        {blog.title}
        {' '}
        <Tail.button type="button" onClick={toggleVisibility}>hide</Tail.button>
        {' '}
        <br />
        {blog.url}
        {' '}
        <br />
        Likes:
        {' '}
        {blog.likes}
        {' '}
        <Tail.button type="button" onClick={() => update()}>like</Tail.button>
        {' '}
        <br />
        {blog.name}
        {' '}
        <br />
        <Tail.button type="button" onClick={() => remove()}>Remove</Tail.button>
      </div>
      <Tail.div>
        <Tail.h2>comments</Tail.h2>
        <Tail.form onSubmit={pushComment}>
          <Tail.div>
            <Tail.input
              id="comment"
              type="text"
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
            />
          </Tail.div>
          <Tail.button id="add_comment" type="submit">add comment</Tail.button>
        </Tail.form>
        <Tail.div>
          <Tail.ul>
            {blog.comments && blog.comments.length > 0 && (
              <Tail.ul>
                {blog.comments.map((comment, index) => (
                  <Tail.li key={index}>{comment}</Tail.li>
                ))}
              </Tail.ul>
            )}
          </Tail.ul>
        </Tail.div>
      </Tail.div>
    </Tail.div>
  )
}

export default Blog
