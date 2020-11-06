describe('Index', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Has the correct page title', () => {
    cy.title().should('eq', 'Shakespeare Reviews')
  })
})
