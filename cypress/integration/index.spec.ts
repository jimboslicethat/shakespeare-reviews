describe('pages/index', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Has the correct page title', () => {
    cy.title().should('eq', 'Shakespeare Reviews')
  })

  it('has the correct page header', () => {
    cy.get('h1').contains('Shakespeare Reviews')
  })

  it('displays cards for every review', () => {
    cy.get('section').should('have.length', 100)
  })
})
