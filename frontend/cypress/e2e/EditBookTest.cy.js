describe('Edit Book Feature', () => {
  // Before each test, login as a staff member and navigate to the "Edit Book" option
  beforeEach(() => {
    cy.loginAsStaffMember() // Custom command to log in as a staff member
    cy.get('.dashboard-option').contains('Edit Book').click() // Click on the "Edit Book" option in the dashboard
  })

  // Test to verify that staff members can add a new book
  it('allows staff member to add a new book', () => {
    // Type the book name in the input field and click the search button
    cy.get('[data-test="editBookInput"]').should('be.visible').type('To Kill a Mockingbird')
    cy.get('[data-test="searchButton"]').click()

    // Find the newly added book in the list and edit its details
    cy.contains('[data-test^="bookName-"]', 'To Kill a Mockingbird').parents('tr').within(() => {
      cy.get('[data-test="editButton"]').contains('Edit').click() // Click on the "Edit" button for the book
      cy.get('[data-test="bookCountInput"]').then($input => {
        $input.val('') // Clear the existing book count
      });
      cy.get('[data-test="bookCountInput"]').type('50') // Enter the new book count
      cy.contains('[data-test="saveButton"]', 'Save').click() // Click the "Save" button to save the changes
    });

    // Verify that the book details are updated and displayed correctly
    cy.contains('[data-test^="bookName-"]', 'To Kill a Mockingbird').should('exist') // Check if the book exists
    cy.contains('50').should('exist') // Check if the book count is updated to 50
  })
})
