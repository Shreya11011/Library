describe('template spec', () => {
  beforeEach(() => {
   cy.loginAsStaffMember()
   cy.get('.dashboard-option').contains('Add Member').click()
  })
  it('allows staff member to add new member', () => {
    cy.get('.addmember-form').within(() => {
      cy.get('input[name="userFullName"]').type('Kartik Goyal')
      cy.get('input[name="employeeIdInput"]').type('kartik')
      cy.get('input[name="mobileNumber"]').type('9999999878')
      cy.get('input[name="address"]').type('New Delhi')
      cy.get('.date-picker-addmember').click() 
      cy.contains('Next').click() 
      cy.contains('15').click() 
      cy.get('.semanticdropdown-addmember').within(() => {
        cy.get('.ui.fluid.selection.dropdown').click() 
      })
      
      cy.get('.menu.transition.visible').contains('Male').click()
      cy.contains('Male').click() 
      cy.get('.addmember-form-label').first().click()
      cy.get('input[name="email"]').type('kartik@gmail.com')
      cy.get('input[name="password"]').type('kartik')
      cy.get('.addmember-submit').click() 
    })

   
    cy.get('.admindashboard-table').contains('Kartik Goyal').should('be.visible')
    cy.get('.admindashboard-table').contains('kartik@gmail.com').should('be.visible')
  })
})