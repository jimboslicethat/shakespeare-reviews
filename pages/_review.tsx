import Modal from '@material-ui/core/Modal'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import Rating from '@material-ui/lab/Rating'
import { motion } from 'framer-motion'
import React, { useState } from 'react'

import styles from '../styles/review.module.css'

import { ReviewResponseData } from './api/reviews'

interface Props {
  review: ReviewResponseData
}
export default function Review({ review = {} as ReviewResponseData }: Props): React.ReactElement {
  const [isOpen, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  const getReviewBodyPreview = () => {
    const reviewStart = review.body.slice(0, 40)
    return `${reviewStart}...`
  }

  const renderReviewCard = () => {
    return (
      <motion.section
        key={review.id}
        className={styles.card}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleOpen}
        tabIndex={0}
      >
        <h2 className={styles.rating}>
          {review.rating}
          &nbsp;
          <Rating name="read-only" value={review.rating} precision={0.5} readOnly />
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
  const renderReviewModal = () => {
    return (
      <Modal open={isOpen} onClose={handleClose}>
        <div className={styles.modal}>
          <h2 className={styles.reviewerHeader}>
            <AccountCircleIcon fontSize="large" />
            {review.author}
          </h2>
          <h2 className={styles.rating}>
            {review.rating}
            &nbsp;
            <Rating name="read-only" value={review.rating} size="large" readOnly />
          </h2>
          <time dateTime={`${review.publish_date}`} className={styles.publishedAt}>
            Reviewed on&nbsp;
            {new Date(review.publish_date).toDateString()}
          </time>
          <p className={styles.fullReviewBody}>{`"${review.body}"`}</p>
        </div>
      </Modal>
    )
  }

  return (
    <>
      {renderReviewCard()}
      {renderReviewModal()}
    </>
  )
}
