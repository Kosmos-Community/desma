
describe('Test MR07-EM01', () => {

  it('Test API register return valid URL', () => {
    cy.visit('http://localhost:3000/auth/register')
    // Click on Google button and avoid redirect to Google
    cy.get('button').contains('Google').click({force: true})
    // visit the google auth api endpoint to get the url
    cy.request('GET', 'http://localhost:3000/api/auth/register/google').then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('url')
      expect(response.body.url).to.not.be.empty
      expect(response.body.url).to.contain('https://accounts.google.com/o/oauth2/v2/auth')
    })
  })

  it('Test API login return valid URL', () => {
    cy.visit('http://localhost:3000/auth/login')
    // Click on Google button and avoid redirect to Google
    cy.get('button').contains('Google').click({force: true})
    // visit the google auth api endpoint to get the url
    cy.request('GET', 'http://localhost:3000/api/auth/google').then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('url')
      expect(response.body.url).to.not.be.empty
      expect(response.body.url).to.contain('https://accounts.google.com/o/oauth2/v2/auth')
    })
  })
})