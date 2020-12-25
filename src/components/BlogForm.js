import React, { useState } from 'react'

const TextInput = ({ name, value, onValueChange }) => {
  return (
    <div>
      {name}
      <input type="text" value={value} name={name} onChange={({ target }) => onValueChange(target.value)} />
    </div>
  )
}

const BlogForm = ({ onCreate }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreate = (event) => {
    event.preventDefault()
    onCreate(title, author, url)
  }

  return (
    <>
    <h2>create new</h2>
    <form onSubmit={handleCreate}>
      <TextInput name="Title" value={title} onValueChange={setTitle} />
      <TextInput name="Author" value={author} onValueChange={setAuthor} />
      <TextInput name="URL" value={url} onValueChange={setUrl} />
      <button type="submit">create</button>
    </form>
    </>
  )
}

export default BlogForm