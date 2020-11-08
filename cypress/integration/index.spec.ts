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

  it('Sorts by most recent by default', () => {
    cy.get('select').should('have.value', 'Most Recent')
  })

  it('Sorts by highest rating', () => {
    cy.get('select').select('Highest Rating').should('have.value', 'Highest Rating')
    cy.get('section > h2').first().contains('5')
  })

  it('Sorts by lowest rating', () => {
    cy.get('select').select('Lowest Rating').should('have.value', 'Lowest Rating')
    cy.get('section > h2').first().contains('0.')
  })

  it('Sorts by oldest reviews', () => {
    cy.get('select').select('Oldest').should('have.value', 'Oldest')
    cy.get('section > time').first().contains('Sun May 29 2016')
  })

  it('Opens an individual review card', () => {
    cy.get('section').first().click({ force: true })
  })
})
