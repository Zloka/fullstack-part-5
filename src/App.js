import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import { userStateStorageKey } from './config'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem(userStateStorageKey)
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        userStateStorageKey, JSON.stringify(user)
      )
      setUser(user)
      blogService.setToken(user.token)
    } catch (error) {
      handleSetMessage('Failed to login!')
      console.log(error)
    }
  }

  const handleSetMessage = (newMessage) => {
    setMessage(newMessage)
    setTimeout(() => {
      setMessage(null)
    }, 5 * 1000)
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem(userStateStorageKey)
    setUser(null)
  }

  const handleCreateBlog = async (title, author, url) => {
    try {
      const result = await blogService.create({ title, author, url })
      setBlogs(blogs.concat({ ...result, user }))
      handleSetMessage('Successfully created blog!')
    } catch (error) {
      handleSetMessage('Failed to create blog!')
      console.log(error)
    }
  }

  return (
    <div>
      <Notification message={message} />
      {user === null ? (
        <LoginForm onLogin={handleLogin} />
      )
      : (
        <>
          <h2>blogs</h2>
          <div>{user.name} is logged in. <button onClick={handleLogout}>log out</button></div>
          <br />
          <BlogForm onCreate={handleCreateBlog} />
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </>
      )
    }
    </div>
  )
}

export default App