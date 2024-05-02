describe('User Login', () => {
  beforeEach(() => {
    cy.loginAsStudent() // Log in as a student before each test
  })

  it('Searches for a book and requests it', () => {
    cy.get('.dashboard-option').contains('Search Books').click() // Clicks on the search books option
    cy.get('.edit-search-input').type('To Kill a Mockingbird') // Enters the book name in the search bar
    cy.get('.search-edit-book').click() // Clicks the search button
    cy.get('.edit-button').contains('REQUEST').click() // Clicks the request button for the book

    // Checks if there is an alert saying "Book Requested" after clicking the request button
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.equal('Book Requested Successfully 📚')
    })

    // Alternatively, checks if the button text changes from "REQUEST" to "Requested"
    cy.get('.edit-button').contains('Requested').should('be.visible')
  })
})
