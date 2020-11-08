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

  it('Sorts by oldest reviews', () => {
    cy.get('select').select('Oldest').should('have.value', 'Oldest')
    cy.get('section > time').first().contains('Sun May 29 2016')
  })

  it('Sorts by highest rating', () => {
    cy.get('select').select('Highest Rating').should('have.value', 'Highest Rating')
    cy.get('section > h2').first().contains('5')
  })

  it('Sorts by lowest rating', () => {
    cy.get('select').select('Lowest Rating').should('have.value', 'Lowest Rating')
    cy.get('section > h2').first().contains('0.')
  })

  it('Searches reviews by review body', () => {
    cy.get('input').first().type('fool')

    cy.get('section').should('have.length', 11)
    cy.get('input').first().clear()
  })

  it('Searches reviews by author name', () => {
    cy.get('input').first().type('Jer')

    cy.get('section').should('have.length', 2)
    cy.get('input').first().clear()
  })

  it('Searches by rating', () => {
    cy.get('input').first().type('3.5')

    cy.get('section').should('have.length', 3)
    cy.get('input').first().clear()
  })

  it('Searches resilient to lower casing', () => {
    const lowerCaseSearchTerm = 'Can one desire'.toLowerCase()
    cy.get('input').first().type(lowerCaseSearchTerm)

    cy.get('section').should('have.length', 9)
    cy.get('input').first().clear()
  })

  it('Searches resilient to upper casing', () => {
    const lowerCaseSearchTerm = 'Can one desire'.toUpperCase()
    cy.get('input').first().type(lowerCaseSearchTerm)

    cy.get('section').should('have.length', 9)
    cy.get('input').first().clear()
  })

  it('Searches resilient to whitespace', () => {
    const searchTermWithWhiteSpace = ` Can one desire  `
    cy.get('input').first().type(searchTermWithWhiteSpace)

    cy.get('section').should('have.length', 9)
    cy.get('input').first().clear()
  })

  it('Opens an individual review card', () => {
    cy.get('section').first().click({ force: true })
  })
})
