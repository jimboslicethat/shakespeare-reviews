import Head from 'next/head'
import React from 'react'

import styles from '../styles/Home.module.css'

import { ReviewResponseData } from './api/reviews'

interface Props {
  reviews: ReviewResponseData[]
}
export default function Home({ reviews = [] }: Props): React.ReactElement {
  return (
    <div className={styles.container}>
      <Head>
        <title>Shakespeare Reviews</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Shakespeare Reviews</h1>
        {reviews.map(review => (
          <div key={review.id} className={styles.grid}>
            <section className={styles.card}>
              <h2>{review.rating}</h2>
              <time dateTime={`${review.publish_date}`}>
                {new Date(review.publish_date).toDateString()}
              </time>
              <span>
                By
                {review.author}
              </span>
              <p>{review.body}</p>
            </section>
          </div>
        ))}
      </main>
    </div>
  )
}

Home.getInitialProps = async () => {
  const res = await fetch(`${process.env.BASE_URL}/api/reviews`)
  const reviews = await res.json()
  return { reviews }
}
