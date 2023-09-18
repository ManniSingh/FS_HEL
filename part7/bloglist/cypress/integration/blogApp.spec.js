/* eslint-disable no-undef */
describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Mock User',
      username: 'user',
      password: 'password'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    const user2 = {
      name: 'Mock User 2',
      username: 'user2',
      password: 'password'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user2)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.login({ username: 'user', password: 'password' })
      cy.contains('Mock User logged-in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('log in').click()
      cy.get('#username').type('user')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()
      cy.get('.error')
        .should('contain', 'Wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'Mock User logged-in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'user', password: 'password' })
    })

    it('A blog can be created', function() {
      cy.contains('Mock User logged-in')
      cy.createBlog({ title:'CYTEST', author:'CYTEST', likes:'0', url:'CYTEST' })
      cy.get('html').should('contain','CYTEST by CYTEST')
    })
    it('A blog can be liked', function() {
      cy.contains('Mock User logged-in')
      cy.createBlog({ title:'CYTEST', author:'CYTEST', likes:'0', url:'CYTEST' })
      cy.get('html').should('contain','CYTEST by CYTEST')
      cy.contains('CYTEST by CYTEST').parent().find('button').contains('view').click() //View button
      cy.contains('like').click()
      cy.contains('Likes: 1')
    })
  })
  describe('Access rights check',function() {
    beforeEach(function() {
      cy.login({ username: 'user', password: 'password' })
      cy.contains('Mock User logged-in')
      cy.createBlog({ title:'CYTEST', author:'CYTEST', likes:'0', url:'CYTEST' })
      cy.get('html').should('contain','CYTEST by CYTEST')
    })
    it('A blog can be deleted by authorised user', function() {
      cy.contains('CYTEST by CYTEST').parent().find('button').contains('view').click() //View button
      cy.contains('Remove').click()
      cy.get('html').should('not.contain','view')
    })
    it('A blog can NOT be deleted by unauthorised user', function() {
      cy.contains('Log out').click()
      cy.login({ username: 'user2', password: 'password' })
      cy.contains('Mock User 2 logged-in')
      cy.get('html').should('contain','CYTEST by CYTEST')
      cy.contains('CYTEST by CYTEST').parent().find('button').contains('view').click() //View button
      cy.contains('Remove').click()
      cy.get('.error').should('contain', 'Request failed')
      //Request failed with status code 403
    })
  })
  it('Check the sort order', function() {
    cy.login({ username: 'user', password: 'password' })
    cy.contains('Mock User logged-in')
    cy.createBlog({ title:'CYTEST', author:'CYTEST', likes:'5', url:'CYTEST' })
    cy.get('html').should('contain','CYTEST by CYTEST')
    cy.createBlog({ title:'CYTEST2', author:'CYTEST2', likes:'10', url:'CYTEST2' })
    cy.get('html').should('contain','CYTEST2 by CYTEST2')
    cy.createBlog({ title:'CYTEST3', author:'CYTEST3', likes:'2', url:'CYTEST3' })
    cy.get('html').should('contain','CYTEST3 by CYTEST3')
    const order = ['CYTEST2','CYTEST','CYTEST3']
    cy.get('.visibleBlog')
      .should('have.length', 3)
      .then( elements => {
        return(Array.from(elements.map((index,value) => value.innerText.split(' ')[0])))
      }).should('deep.equal', order)
  })
})