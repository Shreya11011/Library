describe('Adding New Book by Staff Member', () => {
  // Before each test, log in as a staff member
  beforeEach(() => {
    cy.loginAsStaffMember() // Custom command to log in as a staff member
  })

  // Test to verify that a staff member can add a new book
  it('allows staff member to add a new book', () => {
    // Within the add book form, fill in details
    cy.get('.addbook-form').within(() => {
      cy.get('input[name="bookName"]').type('The Great Gatsby') // Enter book name
      cy.get('input[name="author"]').type('F. Scott Fitzgerald') // Enter author name
      cy.get('input[name="language"]').type('English') // Enter language
      cy.get('input[name="copies"]').type('15') // Enter number of copies
      cy.get('.semanticdropdown-addbook').click() // Click to open the genre dropdown
      cy.get('.visible.menu').contains('Fiction').click() // Select the genre (assuming 'Fiction' is an option)
    })

    // Click on the submit button to add the book
    cy.get('.addbook-submit').click({ force: true }) // Using {force: true} to force click if the element is covered or hidden

    // Verify that the added book details are visible in the admin dashboard table
    cy.get('.admindashboard-table').contains('The Great Gatsby').should('be.visible') // Check if book name is visible
    cy.get('.admindashboard-table').contains('F. Scott Fitzgerald').should('be.visible') // Check if author name is visible
    cy.get('.admindashboard-table').contains('15').should('be.visible') // Check if number of copies is visible
  })
})
