describe('template spec', () => {
  beforeEach(() => {
    cy.loginAsStaffMember()
  })
  it('allows staff member to add new book', () => {
   cy.get('.addbook-form').within(() => {
    cy.get('input[name="bookName"]').type('The Great Gatsby')
    cy.get('input[name="author"]').type('F. Scott Fitzgerald')
    cy.get('input[name="language"]').type('English')
    cy.get('input[name="copies"]').type('15')
    cy.get('.semanticdropdown-addbook').click() 
    cy.get('.visible.menu').contains('Fiction').click() 
  })

  cy.get('.addbook-submit').click({force: true})

  cy.get('.admindashboard-table').contains('The Great Gatsby').should('be.visible')
  cy.get('.admindashboard-table').contains('F. Scott Fitzgerald').should('be.visible')
  cy.get('.admindashboard-table').contains('15').should('be.visible')

  })


})