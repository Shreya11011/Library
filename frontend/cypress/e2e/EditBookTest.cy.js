describe('template spec', () => {
  beforeEach(() => {
   cy.loginAsStaffMember()
   cy.get('.dashboard-option').contains('Edit Book').click()
  })
  it('allows staff member to add new Book', () => {
    cy.get('[data-test="editBookInput"]').should('be.visible').type('To Kill a Mockingbird')
    cy.get('[data-test="searchButton"]').click()
    cy.contains('[data-test^="bookName-"]', 'To Kill a Mockingbird')
      .parents('tr')
      .within(() => {
        cy.get('[data-test="editButton"]').contains('Edit').click();
        cy.get('[data-test="bookCountInput"]').then($input => {
          $input.val('')
        });
        cy.get('[data-test="bookCountInput"]').type('50')
        cy.contains('[data-test="saveButton"]', 'Save').click()
      });
      cy.contains('[data-test^="bookName-"]', 'To Kill a Mockingbird')
      .should('exist')
    cy.contains('50').should('exist')
  })
})