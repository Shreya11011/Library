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

Cypress.Commands.add('getDataTest', (dataTestSelector) => { 
    return cy.get(`[data-test="${dataTestSelector}"]`)
 })

 Cypress.Commands.add('loginAsStaffMember', () => {
    cy.visit('/signin')
    cy.get('.dashboard-option').should('not.exist')
    cy.get('.signin-container').within(() => {
      cy.get('.persontype-question').contains('Are you a Staff member ?')
      cy.get('input[type="checkbox"]').check()
      cy.get('.signin-textbox[name="employeeId"]').type('admin2')
      cy.get('.signin-textbox[name="psw"]').type('admin2')
      cy.get('.signin-button').click()
    });
    cy.get('.dashboard-option').contains('Add Book').should('be.visible')
  })
  