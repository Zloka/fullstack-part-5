import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'

describe('<Blog />', () => {
  const authenticatedUsername = 'username'
  const user = {
    id: 'userid',
    name: 'name',
    username: authenticatedUsername
  }
  const blogId = 'blogid'
  const blog = {
    user,
    likes: 0,
    id: blogId,
    author: 'author',
    title: 'title',
    url: 'url',
  }
  const updateBlog = jest.fn()
  const removeBlog = jest.fn()

  beforeEach(() => {
    render(
      <Blog blog={blog} authenticatedUsername={authenticatedUsername} updateBlog={updateBlog} removeBlog={removeBlog} />
    )
  })

  test('should display the correct content by default', () => {
    expect(screen.getByText(blog.title)).toBeInTheDocument()
    expect(screen.getByText(blog.author)).toBeInTheDocument()
    expect(screen.queryByText(blog.url)).not.toBeInTheDocument()
    expect(screen.queryByText(String(blog.likes))).not.toBeInTheDocument()
  })
})