import { NextApiRequest, NextApiResponse } from 'next'

import { ReviewResponseData } from '../reviews'

const { AUTH_TOKEN, SHAKESPEARE_API_URL } = process.env

export default async function userHandler(
  req: NextApiRequest,
  res: NextApiResponse<ReviewResponseData>
): Promise<void> {
  const {
    query: { id }
  } = req

  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')

  const request = new Request(`${SHAKESPEARE_API_URL}/${id}`, {
    method: 'GET',
    headers: { 'X-API-KEY': AUTH_TOKEN }
  })

  const response = await fetch(request)
  const individualReview = await response.json()

  res.end(JSON.stringify(individualReview))
}
