describe('pages/index', () => {
  before(() => {
    cy.visit('/')
  })

  it('Has the correct page title', () => {
    cy.title().should('eq', 'Shakespeare Reviews')
  })

  it('Has the correct page header', () => {
    cy.get('h1').contains('Shakespeare Reviews')
  })

  it('Displays cards for every review', () => {
    cy.get('section').should('have.length', 100)
  })

  it('Opens an individual review card', () => {
    cy.get('section').first().click({ force: true })
  })
})
