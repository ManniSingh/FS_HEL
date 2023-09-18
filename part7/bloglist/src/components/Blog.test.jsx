import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import BlogForm from './BlogForm'

describe('All Tests', () => {
  let component
  let blogObject
  const updateBlog = jest.fn()

  beforeEach(() => {
    blogObject = {
      title: 'title',
      author: 'author',
      likes: 0,
      url: 'url',
    }
    component = render(
      <Blog blog={blogObject} updateBlog={updateBlog} />,
    )
  })

  test('renders exclusively AUTH+TITLE', () => {
    const div = component.container.querySelector('.hiddenBlog')
    expect(div).toHaveTextContent(`${blogObject.title} by ${blogObject.author}`)
    expect(div).not.toHaveTextContent(`Likes: ${blogObject.likes}`)
  })

  test('after clicking the view button, likes and url is shown', () => {
    const button = component.getByText('view')
    fireEvent.click(button)

    const div = component.container.querySelector('.visibleBlog')
    expect(div).not.toHaveStyle('display: none')
    expect(div).toHaveTextContent(`Likes: ${blogObject.likes}`)
    expect(div).toHaveTextContent(`${blogObject.url}`)
  })

  test('Likes button clicked twice with two calls to the supplied prop', () => {
    let button = component.getByText('view')
    fireEvent.click(button)
    button = component.getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)
    expect(updateBlog.mock.calls).toHaveLength(2)
  })

  test('<BlogForm /> sanity check', () => {
    const createBlog = jest.fn()

    const component = render(<BlogForm createBlog={createBlog} />)

    const author = component.container.querySelector('#author')
    const title = component.container.querySelector('#title')
    const url = component.container.querySelector('#url')
    const form = component.container.querySelector('form')

    fireEvent.change(author, {
      target: { value: 'authorA' },
    })
    fireEvent.change(title, {
      target: { value: 'titleA' },
    })
    fireEvent.change(url, {
      target: { value: 'urlA' },
    })
    fireEvent.submit(form)

    expect(createBlog.mock.calls).toHaveLength(1)
    console.log(createBlog.mock.calls[0][0])
    expect(createBlog.mock.calls[0][0].title).toBe('titleA')
    expect(createBlog.mock.calls[0][0].author).toBe('authorA')
    expect(createBlog.mock.calls[0][0].url).toBe('urlA')
  })
})
