describe('api/reviews', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Queries the API for reviews', () => {
    cy.request('GET', '/api/reviews').as('reviews')

    cy.get('@reviews').should(response => {
      expect(response.body).to.have.length(100)
      expect(response).to.have.property('headers')
    })
  })
})
