// Pruebacontra1234@

import { url } from "inspector"

describe('Test MR04-EM01', () => {


  it('Test API return valid URL', () => {
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
})