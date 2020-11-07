// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next'

const { AUTH_TOKEN, SHAKESPEARE_API_URL } = process.env

export interface ReviewResponseData {
  rating: number
  // eslint-disable-next-line camelcase
  publish_date: string
  id: string
  body: string
  author: string
}

export default async function getReviews(
  _req: NextApiRequest,
  res: NextApiResponse<ReviewResponseData>
): Promise<void> {
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')

  const request = new Request(SHAKESPEARE_API_URL, {
    method: 'GET',
    headers: { 'X-API-KEY': AUTH_TOKEN }
  })

  const response = await fetch(request)
  const reviews = await response.json()

  res.end(JSON.stringify(reviews))
}
