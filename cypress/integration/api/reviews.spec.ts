describe('api/reviews', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Queries the API for all reviews', () => {
    cy.request('GET', '/api/reviews').as('reviews')

    cy.get('@reviews').should(response => {
      expect(response).to.have.property('headers')
      expect(response.body).to.have.length(100)
    })
  })

  it('Queries the API for an individual review', () => {
    const kaleySchillerReviewId = '9783221620868'
    const authorName = 'Kaley Schiller'
    const reviewBody =
      'The fool doth think he is wise, but the wise man knows himself to be a fool.'

    cy.request('GET', `/api/review/${kaleySchillerReviewId}`).as('singleReview')

    cy.get('@singleReview').should(response => {
      expect(response).to.have.property('headers')
      expect(response.body).to.have.property('author', authorName)
      expect(response.body).to.have.property('body', reviewBody)
    })
  })
})
