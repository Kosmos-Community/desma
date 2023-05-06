describe('MR04-EM02 Testing', () => {
  beforeEach('Visits logs in', () => {
    const mail = 'prueba@email.com'
    const contra = 'a'

    cy.visit('http://localhost:3000')

    //Login
    cy.contains('Login').click()
    cy.get('input[name=email]').type(mail)
    cy.get('input[name=password]').type(contra)
    cy.get('button').contains('Login').click()

    //Access to test design
    cy.contains('Test1').click()
  })

  it('Updates to a valid color', () => {
    //Selects first PrimaryColor to update it's hex value
    cy.get('div[title=grid-PrimaryColor] > div[title=card0]').click()
    cy.get('input[name=colorInput]').type('{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}abc123')
    cy.get('button[name=saveBtn]').click()
    cy.get('div[title=colorPicker]').should('not.be.visible')
    
  })

  it('Does not update invalid color (Empty value)', () => {
    //Selects first PrimaryColor to try and update it's hex value with empty space
    cy.get('div[title=grid-PrimaryColor] > div[title=card0]').click()
    cy.get('input[name=colorInput]').type('{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}')
    cy.get('button[name=saveBtn]').click()
    cy.get('div[title=colorPicker]').should('be.visible')
    
  })

  it('Does not update invalid color (length < 3)', () => {
    //Selects first PrimaryColor to try and update it's hex value with a string of less than 3 characters needed for hexColor
    cy.get('div[title=grid-PrimaryColor] > div[title=card0]').click()
    cy.get('input[name=colorInput]').type('{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}a')
    cy.get('button[name=saveBtn]').click()
    cy.get('div[title=colorPicker]').should('be.visible')
    
  })

  it('Does not update invalid color (3 < length < 6)', () => {
    /*Selects first PrimaryColor to try and update it's hex value with a string of more than 3 but less 
    than 6 characters needed for hexColor
    */
    cy.get('div[title=grid-PrimaryColor] > div[title=card0]').click()
    cy.get('input[name=colorInput]').type('{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}a15ef')
    cy.get('button[name=saveBtn]').click()
    cy.get('div[title=colorPicker]').should('be.visible')
    
  })

  it('Does not enter invalid value', () => {
    /*Selects first PrimaryColor to try and update it's hex value with a string of more than 3 but less 
    than 6 characters needed for hexColor
    */
    cy.get('div[title=grid-PrimaryColor] > div[title=card0]').click()
    cy.get('input[name=colorInput]').type('{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}q')
    cy.get('button[name=saveBtn]').click()
    cy.get('div[title=errorMessage]').should('be.visible')
    
  })

  it('Adds a valid color', () => {
    cy.get('div[title=grid-PrimaryColor] > div[title=addColor]').click()
    cy.get('input[name=colorInput]').type('{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}abc123')
    cy.get('button[name=saveBtn]').click()
    cy.get('div[title=colorPicker]').should('not.be.visible')
    expect('div[title=card2]').to.exist
    
  })

  it('Does not add a invalid value', () => {
    cy.get('div[title=grid-PrimaryColor] > div[title=addColor]').click()
    cy.get('input[name=colorInput]').type('{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}q')
    cy.get('div[title=errorMessage]').should('be.visible')
    
  })
  
  it('Does not save invalid color (Empty value)', () => {
    cy.get('div[title=grid-PrimaryColor] > div[title=addColor]').click()
    cy.get('input[name=colorInput]').type('{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}')
    cy.get('button[name=saveBtn]').click()
    cy.get('div[title=colorPicker]').should('be.visible')
    
  })

  it('Does not update invalid color (length < 3)', () => {
    cy.get('div[title=grid-PrimaryColor] > div[title=addColor]').click()
    cy.get('input[name=colorInput]').type('{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}a')
    cy.get('button[name=saveBtn]').click()
    cy.get('div[title=colorPicker]').should('be.visible')
    
  })

  it('Does not update invalid color (3 < length < 6)', () => {
    cy.get('div[title=grid-PrimaryColor] > div[title=addColor]').click()
    cy.get('input[name=colorInput]').type('{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}a15ef')
    cy.get('button[name=saveBtn]').click()
    cy.get('div[title=colorPicker]').should('be.visible')
    
  })
  
})