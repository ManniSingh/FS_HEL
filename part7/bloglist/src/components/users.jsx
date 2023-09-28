import React, { useState, useContext } from 'react'
import OpContext from '../OpContext'
import { Link, useParams } from 'react-router-dom'
import Tail from '../tail'


function Users() {
  const [ message, blogs, users, updateBlog, removeBlog ] = useContext(OpContext)
  //console.log('users:'+JSON.stringify(users))
  //console.log('blogs:'+JSON.stringify(blogs))
  if (!users){
    return null
  }
  return (
    <Tail.div>
      <Tail.h2>Users</Tail.h2>
      <Tail.table>
        <Tail.tbody>
          <Tail.tr>
            <Tail.th></Tail.th>
            <Tail.th>blogs</Tail.th>
          </Tail.tr>
          {users.map(_user => {
            return(
              <Tail.tr key={_user.id}>
                <Tail.td> <Link className="text-blue-500 hover:underline" to={`/users/${_user.id}`}>{_user.username}</Link> </Tail.td>
                <Tail.td> {_user.blogs.length} </Tail.td>
              </Tail.tr>
            )
          }
          )}
        </Tail.tbody>
      </Tail.table>
    </Tail.div>
  )
}

function UserBlogs() {
  const { id } = useParams()
  const [ message, blogs, users, updateBlog, removeBlog ] = useContext(OpContext)
  if (!users){
    return null
  }
  //console.log('uid:'+id)
  const _blogs = users.find((userData) => userData.id===id).blogs
  return (
    <Tail.div>
      <Tail.h2>user</Tail.h2>
      <Tail.h3>Added Blogs</Tail.h3>
      <Tail.ul>
        {
          _blogs.map(blog => <Tail.li key={blog.id}><Link className="text-blue-500 hover:underline" to={`/blogs/${blog.id}`}>{blog.title}</Link></Tail.li>)
        }
      </Tail.ul>
    </Tail.div>
  )
}

export { Users, UserBlogs }
