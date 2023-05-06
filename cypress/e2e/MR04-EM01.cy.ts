
describe('Test MR04-EM01', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/auth/register')
  });

  it.skip('Registers a new account correctly', () => {
    cy.get('Input[name=name]').type('testMR04-EM01')
    cy.get('Input[name=email]').type('testMR04@email.com')
    cy.get('Input[name=password]').type('4Str0ng.P4ssw0rd!')
    cy.get('Input[name=confirmPassword]').type('4Str0ng.P4ssw0rd!')
    cy.get('button[name=loginButn]').click()
    cy.location('pathname').should('contain', '/dashboard')
  })

  it('Does not allow password with less than 8 characters', () => {
    cy.get('Input[name=name]').type('testMR04-EM01')
    cy.get('Input[name=email]').type('testMR04@email.com')
    cy.get('Input[name=password]').type('4Str.ng')
    cy.get('Input[name=confirmPassword]').type('4Str.ng')
    cy.get('button[name=loginButn]').click()
    cy.get('small[title=errorMsg]').should('be.visible')
    cy.location('pathname').should('not.contain', '/dashboard')
  })

  it('Does not allow password with no uppercase letters', () => {
    cy.get('Input[name=name]').type('testMR04-EM01')
    cy.get('Input[name=email]').type('testMR04@email.com')
    cy.get('Input[name=password]').type('strong.password!')
    cy.get('Input[name=confirmPassword]').type('4strong.password!')
    cy.get('button[name=loginButn]').click()
    cy.get('small[title=errorMsg]').should('be.visible')
    cy.location('pathname').should('not.contain', '/dashboard')
  })

  it('Does not allow password with no lowercase letters', () => {
    cy.get('Input[name=name]').type('testMR04-EM01')
    cy.get('Input[name=email]').type('testMR04@email.com')
    cy.get('Input[name=password]').type('4STRONG.PASSWORD')
    cy.get('Input[name=confirmPassword]').type('4STRONG.PASSWORD')
    cy.get('button[name=loginButn]').click()
    cy.get('small[title=errorMsg]').should('be.visible')
    cy.location('pathname').should('not.contain', '/dashboard')
  })

  it('Does not allow password with no special characters', () => {
    cy.get('Input[name=name]').type('testMR04-EM01')
    cy.get('Input[name=email]').type('testMR04@email.com')
    cy.get('Input[name=password]').type('4Str0ngP4ssw0rd')
    cy.get('Input[name=confirmPassword]').type('4Str0ngP4ssw0rd')
    cy.get('button[name=loginButn]').click()
    cy.get('small[title=errorMsg]').should('be.visible')
    cy.location('pathname').should('not.contain', '/dashboard')
  })

  it('Does not allow password with no numbers', () => {
    cy.get('Input[name=name]').type('testMR04-EM01')
    cy.get('Input[name=email]').type('testMR04@email.com')
    cy.get('Input[name=password]').type('aStrong.Password!')
    cy.get('Input[name=confirmPassword]').type('aStrong.Password!')
    cy.get('button[name=loginButn]').click()
    cy.get('small[title=errorMsg]').should('be.visible')
    cy.location('pathname').should('not.contain', '/dashboard')
  })
})