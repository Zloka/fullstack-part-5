import React, { useState } from 'react'

const HiddenBlogContent = ({ url, likes, onLike, name }) => {
  const handleLikeClick = (event) => {
    event.preventDefault()
    onLike()
  }
  return (
    <>
      <div>{url}</div>
      <div>{likes} <button onClick={handleLikeClick}>like</button></div>
      <div>{name}</div>
    </>
  )
}

const Blog = ({ blog }) => {
  const [hidden, setHidden] = useState(true)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  console.log(blog)

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author} <button onClick={() => setHidden(!hidden)}>{hidden ? 'view' : 'hide'}</button>
      </div>
      {hidden ? null : <HiddenBlogContent url={blog.url} likes={blog.likes} onLike={() => undefined} name={blog.user.name} />}
  </div>
)}

export default Blog
