import React from 'react'
import ColourInfo from '../../src/components/colourInfo'
import "../../src/styles/colourList.css"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

describe('<ColourInfo />', () => {
  it('Renders component with information', () => {
    cy.mount(<QueryClientProvider client={queryClient}>
      <ColourInfo colourName='tan' />  </QueryClientProvider>,
    )

    cy.getDataTest('colour-info-page').within(() => {
      cy.get('h2').should('contain', 'Tan')
    })

  })

  it('Component contains correct information', () => {
    cy.intercept('GET', 'https://www.csscolorsapi.com/api/colors/tan').as('getColourData');  // Alias for later use
    cy.intercept('GET', 'https://www.thecolorapi.com/id?hex=d2b48c').as('getAdditionalColourData');  // Alias for later use

    cy.mount(<QueryClientProvider client={queryClient}>
      <ColourInfo colourName='tan' />  </QueryClientProvider>,
    )

    cy.wait('@getColourData').then((interception: { response: { statusCode: number; }; }) => {
      expect(interception.response.statusCode).to.equal(200);
    })

    cy.wait('@getAdditionalColourData').then((interception: { response: { statusCode: number; }; }) => {
      expect(interception.response.statusCode).to.equal(200);
    })

    cy.getDataTest('colour-info-page').within(() => {
      cy.get('svg path').should('have.attr', 'fill').and('contain', '#d2b48c')
    })

    cy.get('#css__colour-hex').should('contain', '#')
    cy.get('#css__colour-hsv').should('contain', 'hsv')
    cy.get('#css__colour-hsl').should('contain', 'hsl')
    cy.get('#css__colour-xyz').should('contain', 'XYZ')
    cy.get('#css__colour-cmyk').should('contain', 'cmyk')

  })
})