describe('Check if logo is visible', () => {
  // Test if logo is visible in login
  it('In login', () => {
    cy.visit('http://localhost:3000/auth/login')
    cy.get('a').contains('Desma').should('be.visible')
    // Check if logo has opacity 1 on hover
    cy.get('a').contains('Desma').trigger('mouseover').should('have.css', 'opacity', '1')
  })
  // Test if logo is visible in register
  it('In register', () => {
    cy.visit('http://localhost:3000/auth/register')
    cy.get('a').contains('Desma').should('be.visible')
    // Check if logo has opacity 1 on hover
    cy.get('a').contains('Desma').trigger('mouseover').should('have.css', 'opacity', '1')
  })
})