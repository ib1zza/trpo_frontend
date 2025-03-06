

describe('search', () => {
  it('passes', () => {
    cy.visit('http://localhost:5173/');
    const searchBar = cy.get('[data-testid="searchbar"]')

    searchBar.type('tech').should('have.value', 'tech');

    const searchButton = cy.get('[data-testid="searchbutton"]')

    searchButton.click()

  //   check url to match http://localhost:5173/search?q=tech

    cy.url().should('eq', 'http://localhost:5173/search?q=tech')
    })
})



describe('show web resource page', () => {
  it('passes', () => {
    cy.visit('http://localhost:5173/search?q=tech');
    const link = cy.get('[data-testid="resource-link"]').first()

    link.click();

     // find text - resource info

     cy.get('[data-testid="resource-info"]').should('be.visible')

     })
})
