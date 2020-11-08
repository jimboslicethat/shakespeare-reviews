// import Backdrop from '@material-ui/core/Backdrop'
import Rating from '@material-ui/lab/Rating'
import { motion } from 'framer-motion'
import React from 'react'

import styles from '../styles/review.module.css'

import { ReviewResponseData } from './api/reviews'

const reviewItem = {
  hidden: { opacity: 0.15 },
  visible: {
    opacity: 1
  }
}

interface Props {
  review: ReviewResponseData
}
export default function Review({ review = {} as ReviewResponseData }: Props): React.ReactElement {
  const getReviewBodyPreview = () => {
    const reviewStart = review.body.slice(0, 60)
    return `${reviewStart}...`
  }

  return (
    <motion.section key={review.id} className={styles.card} variants={reviewItem}>
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
      <p className={styles.reviewBodyPreview}>{getReviewBodyPreview()}</p>
    </motion.section>
  )
}
