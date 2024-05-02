describe('Adding New Member by Staff Member', () => {
  // Before each test, log in as a staff member and navigate to the "Add Member" option
  beforeEach(() => {
    cy.loginAsStaffMember() // Custom command to log in as a staff member
    cy.get('.dashboard-option').contains('Add Member').click() // Click on the "Add Member" option in the dashboard
  })

  // Test to verify that a staff member can add a new member
  it('allows staff member to add a new member', () => {
    // Within the add member form, fill in details
    cy.get('.addmember-form').within(() => {
      cy.get('input[name="userFullName"]').type('Kartik Goyal') // Enter full name
      cy.get('input[name="employeeIdInput"]').type('kartik') // Enter employee ID
      cy.get('input[name="mobileNumber"]').type('9999999878') // Enter mobile number
      cy.get('input[name="address"]').type('New Delhi') // Enter address

      // Click to open the date picker and select date of birth
      cy.get('.date-picker-addmember').click()
      cy.contains('Next').click() // Navigate to the desired month and year
      cy.contains('15').click() // Select the day

      // Select gender from the dropdown
      cy.get('.semanticdropdown-addmember').within(() => {
        cy.get('.ui.fluid.selection.dropdown').click() // Click to open the gender dropdown
      })
      cy.get('.menu.transition.visible').contains('Male').click() // Select 'Male' option

      // Click outside the form to remove focus from the input field
      cy.get('.addmember-form-label').first().click()

      // Enter email and password
      cy.get('input[name="email"]').type('kartik@gmail.com') // Enter email
      cy.get('input[name="password"]').type('kartik') // Enter password

      // Click on the submit button to add the member
      cy.get('.addmember-submit').click() // Click the "Add Member" button
    })

    // Verify that the added member details are visible in the admin dashboard table
    cy.get('.admindashboard-table').contains('Kartik Goyal').should('be.visible') // Check if full name is visible
    cy.get('.admindashboard-table').contains('kartik@gmail.com').should('be.visible') // Check if email is visible
  })
})
