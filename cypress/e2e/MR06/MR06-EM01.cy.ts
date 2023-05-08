describe('MR06-EM01 Testing', () => {
    beforeEach('logs in', () => {
      const mail = 'prueba@email.com'
      const contra = 'a'
  
      cy.visit('http://localhost:3000/auth/login')
  
      //Login
      cy.get('input[name=email]').type(mail)
      cy.get('input[name=password]').type(contra)
      cy.get('button').contains('Login').click()
  
      //Access to ColorContrastTest
      cy.contains('ColorContrastTest').click()
    })    

    it('Adds to a color that passes the contrast test', () => {
        //Adds #ffffff to TextColor to contrast agains bgColor #000000
        cy.get('div[title=grid-TestColor] > div[title=addColor]').click()
        cy.get('input[name=colorInput]').type('{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}ffffff')
        cy.get('button[name=saveBtn]').click()
        cy.get('div[title=errorMessage]').should('not.be.visible')
      })

      it('Adds to a color that barely passes the contrast test', () => {
        //Adds #C85F5F to TextColor to contrast agains bgColor #000000
        cy.get('div[title=grid-TestColor] > div[title=addColor]').click()
        cy.get('input[name=colorInput]').type('{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}C85F5F')
        cy.get('button[name=saveBtn]').click()
        cy.get('div[title=errorMessage]').should('not.be.visible')
      })

      it('Adds to a color does not pass the contrast test', () => {
        //Adds #7F1F1F to TextColor to contrast agains bgColor #000000
        cy.get('div[title=grid-TestColor] > div[title=addColor]').click()
        cy.get('input[name=colorInput]').type('{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}7F1F1F')
        cy.get('button[name=saveBtn]').click()
        cy.get('div[title=errorMessage]').should('not.be.visible')
      })
  })