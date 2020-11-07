import Rating from '@material-ui/lab/Rating'
import Head from 'next/head'
import React from 'react'

import styles from '../styles/Home.module.css'

import { ReviewResponseData } from './api/reviews'

interface Props {
  reviews: ReviewResponseData[]
}
export default function Home({ reviews = [] }: Props): React.ReactElement {
  const getReviewBodyPreview = (review: ReviewResponseData) => {
    const reviewStart = review.body.slice(0, 60)
    return `${reviewStart}...`
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Shakespeare Reviews</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Shakespeare Reviews</h1>
        <div className={styles.grid}>
          {reviews.map(review => (
            <section key={review.id} className={styles.card}>
              <h2 className={styles.rating}>
                {review.rating}
                &nbsp;
                <Rating name="read-only" value={review.rating} readOnly />
              </h2>
              <time dateTime={`${review.publish_date}`} className={styles.publishedAt}>
                {new Date(review.publish_date).toDateString()}
              </time>
              <span>
                By&nbsp;
                <span className={styles.author}>{review.author}</span>
              </span>
              <p className={styles.reviewBodyPreview}>{getReviewBodyPreview(review)}</p>
            </section>
          ))}
        </div>
      </main>
    </div>
  )
}

Home.getInitialProps = async () => {
  const res = await fetch(`${process.env.BASE_URL}/api/reviews`)
  const reviews = await res.json()
  return { reviews }
}
