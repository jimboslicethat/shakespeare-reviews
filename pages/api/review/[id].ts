import { NextApiRequest, NextApiResponse } from 'next'

import { requestApi, ReviewResponseData } from '../reviews'

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

  const individualReview = await requestApi(`${SHAKESPEARE_API_URL}/${id}`, AUTH_TOKEN)

  res.end(JSON.stringify(individualReview))
}
