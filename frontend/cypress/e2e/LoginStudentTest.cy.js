describe('User Login', () => {
  it('Logging in as Student', () => {
    // Visit the signin page
    cy.visit('/signin')

    // Ensure that no dashboard options are visible before login
    cy.get('.dashboard-option').should('not.exist')

    // Fill in the signin form for user login
    cy.get('.signin-container').within(() => {
      // Uncheck the checkbox indicating staff member status
      cy.get('.persontype-question').contains('Are you a Staff member ?')
      cy.get('input[type="checkbox"]').uncheck()

      // Enter user-specific credentials
      cy.get('.signin-textbox[name="admissionId"]').type('student')
      cy.get('.signin-textbox[name="psw"]').type('student')

      // Click the login button
      cy.get('.signin-button').click()
    });

    // After login, check if dashboard options are visible
    cy.get('.dashboard-options').should('be.visible')

    // Check if the "Profile" option is visible and clicked after login
    cy.get('.dashboard-option.clicked').contains('Profile').should('be.visible')
  })
})
