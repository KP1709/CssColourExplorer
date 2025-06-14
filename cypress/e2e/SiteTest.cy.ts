import cypress from "cypress";


describe('Testing whole site', () => {
  it('Able to load main page content', () => {
    cy.visit('/')
    cy.contains('Loading CSS colours').should('be.visible')
    cy.getDataTest('loading-spinner').should('be.visible')
    cy.wait(3000)
    cy.getDataTest('colour-explorer-page').find('input').as("colourSearchInput")
    cy.get('@colourSearchInput').should('be.visible')
    cy.getDataTest('colour-list-results').get('li').should('have.length', '148')

  })

  it('Able to search for content', () => {
    cy.visit('/')
    cy.getDataTest('colour-explorer-page').find('input').as("colourSearchInput")
    cy.get('@colourSearchInput').type('blue')
    cy.getDataTest('colour-list-results').should('have.css', 'opacity', '1')
    cy.getDataTest('colour-list-results').get('li').should('have.length', '20')
  })

  it('Able to search + filter content', () => {
    cy.visit('/')
    cy.getDataTest('colour-explorer-page').find('input').as("colourSearchInput")
    cy.get('@colourSearchInput').type('slate')
    cy.getDataTest('colour-list-results').get('li').should('have.length', '9')
    cy.getDataTest('colour-theme-select').select('light')
    cy.getDataTest('colour-list-results').get('li').should('have.length', '2')
    cy.getDataTest('colour-theme-select').select('dark')
    cy.getDataTest('colour-group-select').select('Gray')
    cy.getDataTest('colour-list-results').get('li').should('have.length', '4')
  })

  it('Able to navigate to colour information page', () => {
    cy.visit('/')
    cy.getDataTest('colour-explorer-page').find('input').as("colourSearchInput")
    cy.get('@colourSearchInput').type('blue')
    cy.getDataTest('colour-list-results').get('li').contains('Alice').trigger('mouseover').should('have.css', 'background-color')
    cy.getDataTest('colour-list-results').get('li').contains('Alice').click()
    cy.wait(2000)
    cy.url().should('eq', `${Cypress.config().baseUrl}AliceBlue`)
  })

  it('Able to display colour information page', () => {
    cy.visit('/AliceBlue')
    cy.contains('Loading colour info').should('be.visible')
    cy.getDataTest('loading-spinner').should('be.visible')
    cy.wait(3000)
    cy.getDataTest('loading-spinner').should('not.exist')
  })

  it('Able to navigate back to main page', () => {
    cy.visit('/Blue')
    cy.wait(2000)
    cy.get('a[href="/"]').click();
    cy.url().should('eq', `${Cypress.config().baseUrl}`)
  })
})