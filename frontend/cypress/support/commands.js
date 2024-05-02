// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


//This command retrieves an element using a data-test attribute selector. 
//It takes a data test selector as an argument and returns the element with the corresponding data-test attribute value.
Cypress.Commands.add('getDataTest', (dataTestSelector) => { 
    return cy.get(`[data-test="${dataTestSelector}"]`)
 })


 //This command simulates the login process as a staff member. It visits the signin page, 
 //fills in the login form with staff member credentials, and verifies if the "Add Book" option is visible in the dashboard after login.
 Cypress.Commands.add('loginAsStaffMember', () => {
  cy.visit('/signin') // Visit the signin page
  cy.get('.dashboard-option').should('not.exist') // Ensure that no dashboard options are visible before login
  cy.get('.signin-container').within(() => { // Within the signin container
    cy.get('.persontype-question').contains('Are you a Staff member ?') // Check if the question "Are you a Staff member?" is present
    cy.get('input[type="checkbox"]').check() // Check the checkbox to indicate that the user is a staff member
    cy.get('.signin-textbox[name="employeeId"]').type('admin2') // Type the staff member's employee ID
    cy.get('.signin-textbox[name="psw"]').type('admin2') // Type the staff member's password
    cy.get('.signin-button').click() // Click the login button
  });
  cy.get('.dashboard-option').contains('Add Book').should('be.visible') // After login, ensure that the "Add Book" option is visible in the dashboard
})

  

  Cypress.Commands.add('loginAsStudent', () => {
    cy.visit('/signin') // Visit the signin page
    cy.get('.dashboard-option').should('not.exist') // Ensure no dashboard options are visible before login
    cy.get('.signin-container').within(() => { // Within the signin container
      cy.get('.persontype-question').contains('Are you a Staff member ?') // Check if the staff member question is present
      cy.get('input[type="checkbox"]').uncheck() // Uncheck the checkbox indicating staff member status
      cy.get('.signin-textbox[name="admissionId"]').type('student') // Enter student admission ID
      cy.get('.signin-textbox[name="psw"]').type('student') // Enter student password
      cy.get('.signin-button').click() // Click the login button
    });
    cy.get('.dashboard-options').should('be.visible') // After login, check if dashboard options are visible
  })
  