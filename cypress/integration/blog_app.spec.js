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
})