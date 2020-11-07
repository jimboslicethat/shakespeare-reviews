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
  res: NextApiResponse<ReviewResponseData[]>
): Promise<void> {
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')

  const reviews = await requestApi(SHAKESPEARE_API_URL, AUTH_TOKEN)

  res.end(JSON.stringify(reviews))
}

export async function requestApi(url: string, authToken: string): Promise<Response> {
  const request = new Request(url, {
    method: 'GET',
    headers: { 'X-API-KEY': authToken }
  })

  const response = await fetch(request)
  return response.json()
}
