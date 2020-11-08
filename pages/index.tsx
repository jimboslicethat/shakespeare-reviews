import { motion } from 'framer-motion'
import Head from 'next/head'
import React from 'react'

import styles from '../styles/Home.module.css'

import Review from './_review'
import { ReviewResponseData } from './api/reviews'

const pageHeader = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      duration: 1
    }
  }
}
const reviewContainer = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.075
    }
  }
}

interface Props {
  reviews: ReviewResponseData[]
}
export default function Home({ reviews = [] }: Props): React.ReactElement {
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
        <motion.h1 initial="hidden" animate="show" variants={pageHeader} className={styles.title}>
          Shakespeare Reviews
        </motion.h1>
        <motion.div
          className={styles.grid}
          variants={reviewContainer}
          initial="hidden"
          animate={reviews.length > 0 && 'visible'}
        >
          {reviews.map(review => (
            <Review key={review.id} review={review} />
          ))}
        </motion.div>
      </main>
    </div>
  )
}

Home.getInitialProps = async () => {
  const res = await fetch(`${process.env.BASE_URL}/api/reviews`)
  const reviews = await res.json()
  return { reviews }
}
