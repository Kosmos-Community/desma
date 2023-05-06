import { Container } from "@nextui-org/react"
import SpacingSection from "../../src/components/organisms/SpacingSection"

describe('verify if the spicing of tthe elements of the preview are updated correctly', () => {
  it('Update the spacing', () => {
    //Login
    cy.visit('http://localhost:3000/auth/login')
    cy.contains('Email').type('prueba@email.com')
    cy.contains('Password').type('a')
    cy.contains('Login').click().wait

    //Access to the desing named Test1
    cy.contains('Test1').should("be.visible")
    cy.contains('Test1').click();
    cy.contains('Spacing').should("be.visible")
    cy.contains('Preview').should("be.visible")

    //Update spacing
    cy.contains('Spacing').click()
    cy.contains('Base size').type('5')
  })

  it('Update the spacing and check if the spacing changed in the preview', () => {
    let valorMargin;

    //Login
    cy.visit('http://localhost:3000/auth/login')
    cy.contains('Email').type('prueba@email.com')
    cy.contains('Password').type('a')
    cy.contains('Login').click().wait

    //Access to the desing named Test1
    cy.contains('Test1').should("be.visible")
    cy.contains('Test1').click();
    cy.contains('Spacing').should("be.visible")
    cy.contains('Preview').should("be.visible")

    //check spacing
    cy.contains('Preview').click();
    cy.get(".Container")
    .invoke("css", "margin")
    .then((margin) => {
      valorMargin = margin;
    });

    //Update spacing
    cy.contains('Spacing').click()
    cy.contains('Base size').type('5')

    //check if spacing changed
    cy.contains('Preview').click();
    cy.get(".Container")
    .invoke("css", "margin")
    .then((margin) => {
    expect(margin).to.not.eq(valorMargin);
    });
  })

  it('Updating spacing several times', () => {
    let valorMargin;

    //Login
    cy.visit('http://localhost:3000/auth/login')
    cy.contains('Email').type('prueba@email.com')
    cy.contains('Password').type('a')
    cy.contains('Login').click().wait

    //Access to the desing named Test1
    cy.contains('Test1').should("be.visible")
    cy.contains('Test1').click();
    cy.contains('Spacing').should("be.visible")
    cy.contains('Preview').should("be.visible")

    /* First change */

    //Save current spacing value
    cy.contains('Preview').click();
    cy.get(".Container")
    .invoke("css", "margin")
    .then((margin) => {
      valorMargin = margin;
    });

    //Update spacing
    cy.contains('Spacing').click()
    cy.contains('Base size').type('5')

    //check if spacing changed
    cy.contains('Preview').click();
    cy.get(".Container")
    .invoke("css", "margin")
    .then((margin) => {
    expect(margin).to.not.eq(valorMargin);
    });

    /* Second change */
     
    //Save current spacing value
    cy.contains('Preview').click();
    cy.get(".Container")
    .invoke("css", "margin")
    .then((margin) => {
      valorMargin = margin;
    });

    //Update spacing
    cy.contains('Spacing').click()
    //cy.get("@campoDeEntrada").type("{backspace}".repeat(longitudActual));
    cy.contains('Base size').type("{backspace}")
    cy.contains('Base size').type('6')

    //check if spacing changed
    cy.contains('Preview').click();
    cy.get(".Container")
    .invoke("css", "margin")
    .then((margin) => {
    expect(margin).to.not.eq(valorMargin);
    });

  })
})