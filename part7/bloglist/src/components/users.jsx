import React, { useState, useContext } from 'react'
import OpContext from '../OpContext'
import { Link, useParams } from 'react-router-dom'


function Users() {
  const [ message, users, updateBlog, removeBlog ] = useContext(OpContext)
  return (
    <div>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>blogs</th>
          </tr>
          {users.map(_user => {
            return(
              <tr key={_user.id}>
                <td> <Link to={`/users/${_user.id}`}>{_user.username}</Link> </td>
                <td> {_user.blogs.length} </td>
              </tr>
            )
          }
          )}
        </tbody>
      </table>
    </div>
  )
}

function UserBlogs() {
  const { id } = useParams()
  const [ message, users, updateBlog, removeBlog ] = useContext(OpContext)
  console.log('uid:'+id)
  const blogs = users.find((userData) => userData.id===id).blogs
  return (
    <div>
      <h2>user</h2>
      <h3>Added Blogs</h3>
      <ul>
        {
          blogs.map(blog => <li key={blog.id}>{blog.title}</li>)
        }
      </ul>
    </div>
  )
}

export { Users, UserBlogs }
