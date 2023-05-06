describe('Test MR04-EM03', () => {
  beforeEach('logs in', () => {
    const mail = 'prueba@email.com'
    const contra = 'a'

    cy.visit('http://localhost:3000/auth/login')
    cy.contains('Login').click()
    cy.get('input[name=email]').type(mail)
    cy.get('input[name=password]').type(contra)
    cy.get('button').contains('Login').click().wait(3000)

    cy.contains('Test1').click()
    cy.contains('Font').click()
  })

  it('Finds a heading and paragraph font (capitalized)', () =>{
    //test that it can find a font Comfortaa (a font in the repository) when capitalized
    cy.get('input[name=headingInput]').clear().type('Comfortaa')
    cy.get('input[name=paragraphInput]').clear().type('Comfortaa')
    cy.get('button[name=submitBtn]').click()
    //heading text example has the updated font
    cy.get('p[title=headingText]').should('have.css', 'font-family', 'Comfortaa')
    cy.get('p[title=headingNText]').should('have.css', 'font-family', 'Comfortaa')
    //paragraph text example has the updated font
    cy.get('p[title=paragraphText]').should('have.css', 'font-family', 'Comfortaa')
    cy.get('p[title=paragraphNText]').should('have.css', 'font-family', 'Comfortaa')
  })

  it('Finds a heading and paragraph font (non-capitalized)', () =>{
    //test that it can find a font comfortaa (a font in the repository) when not capitalized
    cy.get('input[name=headingInput]').clear().type('comfortaa')
    cy.get('input[name=paragraphInput]').clear().type('comfortaa')
    cy.get('button[name=submitBtn]').click()
    //heading text example has the updated font
    cy.get('p[title=headingText]').should('have.css', 'font-family', 'comfortaa')
    cy.get('p[title=headingNText]').should('have.css', 'font-family', 'comfortaa')
    //paragraph text example has the updated font
    cy.get('p[title=paragraphText]').should('have.css', 'font-family', 'comfortaa')
    cy.get('p[title=paragraphNText]').should('have.css', 'font-family', 'comfortaa')
  })

  it("Alerts when heading isn't found", () =>{
    //test that it can find paragraph font comfortaa (a font in the repository) but can't find heading font comic sans (not in the repository)
    cy.get('input[name=headingInput]').clear().type('comic sans')
    cy.get('input[name=paragraphInput]').clear().type('comfortaa')
    cy.get('button[name=submitBtn]').click()
    //shows error message with the font not found
    cy.get('small[title=errorMsg]').should('be.visible').and('contain', 'Font comic sans not found')
    //paragraph text example has the updated font
    cy.get('p[title=paragraphText]').should('have.css', 'font-family', 'comfortaa')
    cy.get('p[title=paragraphNText]').should('have.css', 'font-family', 'comfortaa')
  })

  it("Alerts when paragraph isn't found", () =>{
    //test that it can find heading font comfortaa (a font in the repository) but can't find paragraph font comic sans (not in the repository)
    cy.get('input[name=headingInput]').clear().type('comfortaa')
    cy.get('input[name=paragraphInput]').clear().type('comic sans')
    cy.get('button[name=submitBtn]').click()
    //shows error message with the font not found
    cy.get('small[title=errorMsg]').should('be.visible').and('contain', 'Font comic sans not found')
    //paragraph text example has the updated font
    cy.get('p[title=headingText]').should('have.css', 'font-family', 'comfortaa')
    cy.get('p[title=headingNText]').should('have.css', 'font-family', 'comfortaa')
  })
})