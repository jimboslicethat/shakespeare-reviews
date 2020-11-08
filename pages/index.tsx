import { motion } from 'framer-motion'
import filter from 'lodash/filter'
import orderBy from 'lodash/orderBy'
import sortBy from 'lodash/sortBy'
import Head from 'next/head'
import React, { useState } from 'react'

import styles from '../styles/Home.module.css'

import Review from './_review'
import Search from './_search'
import SortReviewsDropdown, { SortOption, sortOptions } from './_sort-reviews-dropdown'
import { ReviewResponseData } from './api/reviews'

interface Props {
  reviews: ReviewResponseData[]
}
export default function Home({ reviews = [] }: Props): React.ReactElement {
  const [currentReviews, setReviews] = useState(reviews)

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

  const sortByHighestRating = () => {
    const sortedReviews = orderBy(currentReviews, ['rating'], ['desc'])
    setReviews(sortedReviews)
  }
  const sortByLowestRating = () => {
    const sortedReviews = orderBy(currentReviews, ['rating'])
    setReviews(sortedReviews)
  }
  const sortByMostRecent = () => {
    const sortedReviews = orderBy(currentReviews, ['published_at'], ['desc'])
    setReviews(sortedReviews)
  }
  const sortByOldest = () => {
    const sortedReviews = orderBy(currentReviews, ['published_at']).reverse()
    setReviews(sortedReviews)
  }
  const handleSort = (sortOption: SortOption) => {
    if (sortOption === sortOptions.highestRating) sortByHighestRating()
    if (sortOption === sortOptions.lowestRating) sortByLowestRating()
    if (sortOption === sortOptions.mostRecent) sortByMostRecent()
    if (sortOption === sortOptions.oldest) sortByOldest()
  }

  const handleSearch = (searchTerm: string) => {
    const sanitizedSearchTerm = searchTerm.trim().toLowerCase()

    const filteredReviews = filter(reviews, review => {
      const reviewbodyMatches = review.body.toLowerCase().includes(sanitizedSearchTerm)
      const authorMatches = review.author.toLowerCase().includes(sanitizedSearchTerm)
      const ratingMatches = review.rating.toString().includes(sanitizedSearchTerm)

      return reviewbodyMatches || authorMatches || ratingMatches
    })

    const sortedReviews = currentReviews
    const filteredAndSortedReviews = sortBy(filteredReviews, sortedReviews)

    setReviews(filteredAndSortedReviews)
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
        <motion.h1 initial="hidden" animate="show" variants={pageHeader} className={styles.title}>
          Shakespeare Reviews
        </motion.h1>
        <div className={styles.pageActions}>
          <Search handleSearch={handleSearch} />
          <SortReviewsDropdown handleSort={handleSort} />
        </div>
        <motion.div
          className={styles.grid}
          variants={reviewContainer}
          initial="hidden"
          animate={reviews.length > 0 && 'visible'}
        >
          {currentReviews.map(review => (
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
