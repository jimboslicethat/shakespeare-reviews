describe('Index', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('example test', () => {
    cy.contains('Welcome to Next.js!').should('exist')
  })
})
