describe('Admin Login', () => {
  it('Logging in as an Admin', () => {
    // Visit the signin page
    cy.visit('/signin')

    // Ensure that no dashboard options are visible before login
    cy.get('.dashboard-option').should('not.exist')

    // Fill in the signin form for admin login
    cy.get('.signin-container').within(() => {
      // Check the checkbox indicating admin status
      cy.get('.persontype-question').contains('Are you a Staff member ?')
      cy.get('input[type="checkbox"]').check()

      // Enter admin credentials
      cy.get('.signin-textbox[name="employeeId"]').type('admin2')
      cy.get('.signin-textbox[name="psw"]').type('admin2')

      // Click the login button
      cy.get('.signin-button').click()
    });

    // After login, check if "Add Book" option is visible
    cy.get('.dashboard-option').contains('Add Book').should('be.visible')
  })
})
