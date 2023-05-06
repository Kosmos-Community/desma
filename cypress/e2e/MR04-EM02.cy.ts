describe('MR04-EM02 Testing', () => {
  beforeEach('Visits logs in', () => {
    const mail = 'prueba@email.com'
    const contra = 'a'

    cy.visit('http://localhost:3000')
    cy.contains('Login').click()
    cy.get('input[name=email]').type(mail)
    cy.get('input[name=password]').type(contra)
    cy.get('button').contains('Login').click()

    cy.contains('Test1').click()
  })

  it('Edits to a valid color', () => {
    cy.get('div[title=grid-PrimaryColor] > div[title=card0]').click()
    cy.get('input[name=colorInput]').type('{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}abc123')
    cy.get('button[name=saveBtn]').click()
    cy.get('div[title=colorPicker]').should('not.be.visible')
    
  })

  it('Does not update invalid color (Empty value)', () => {
    cy.get('div[title=grid-PrimaryColor] > div[title=card0]').click()
    cy.get('input[name=colorInput]').type('{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}')
    cy.get('button[name=saveBtn]').click()
    cy.get('div[title=colorPicker]').should('be.visible')
    
  })

  it('Does not update invalid color (length < 3)', () => {
    cy.get('div[title=grid-PrimaryColor] > div[title=card0]').click()
    cy.get('input[name=colorInput]').type('{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}a')
    cy.get('button[name=saveBtn]').click()
    cy.get('div[title=colorPicker]').should('be.visible')
    
  })

  it('Does not update invalid color (3 < length < 6)', () => {
    cy.get('div[title=grid-PrimaryColor] > div[title=card0]').click()
    cy.get('input[name=colorInput]').type('{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}a15ef')
    cy.get('button[name=saveBtn]').click()
    cy.get('div[title=colorPicker]').should('be.visible')
    
  })

  it('Does not enter invalid value', () => {
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