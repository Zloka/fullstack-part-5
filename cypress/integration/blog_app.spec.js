describe('Blog app', function() {
  const name = 'Zakke Levander'
  const username = 'zakke'
  const password = 'testpassword'
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name,
      username,
      password,
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user) 
    cy.visit('http://localhost:3000')
  })

  it('should render login form', function() {
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login',function() {
    it('should succeed with correct credentials', function() {
      cy.get('#username').type(username)
      cy.get('#password').type(password)
      cy.get('#login-button').click()
      cy.contains(`${name} is logged in.`)
    })

    it('should fail with wrong credentials', function() {
      cy.get('#username').type('wrongusername')
      cy.get('#password').type('wrongpassword')
      cy.get('#login-button').click()
      cy.contains('Failed to login!')
    })
  })

  describe.only('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type(username)
      cy.get('#password').type(password)
      cy.get('#login-button').click()
      cy.contains(`${name} is logged in.`)
    })

    it('should be able to create a new blog', function() {
      const title = 'newblogtitle'
      const author = 'newblogauthor'
      const url = 'newblogurl'
      cy.get('#toggle-visible').click()
      cy.get('#title-input').type(title)
      cy.get('#author-input').type(author)
      cy.get('#url-input').type(url)
      cy.get('#create-blog-submit').click()
      cy.contains('Successfully created blog!')
      cy.contains(title)
      cy.contains(author)
    })

    it('should be able to like a blog', function() {
      // Create blog to like
      const title = 'newblogtitle'
      const author = 'newblogauthor'
      const url = 'newblogurl'
      cy.get('#toggle-visible').click()
      cy.get('#title-input').type(title)
      cy.get('#author-input').type(author)
      cy.get('#url-input').type(url)
      cy.get('#create-blog-submit').click()
      cy.contains('Successfully created blog!')
      cy.contains(title)
      cy.contains(author)

      // View the blog
      cy.get('#toggle-view-button').click()
      cy.contains('0')
      cy.get('#like-button').click()
      cy.contains('1')
    })
  })
})