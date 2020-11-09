import { motion } from 'framer-motion'
import { Dictionary } from 'lodash'
import filter from 'lodash/filter'
import findIndex from 'lodash/findIndex'
import orderBy from 'lodash/orderBy'
import sortBy from 'lodash/sortBy'
import Head from 'next/head'
import React, { useState } from 'react'

import styles from '../styles/index.module.css'

import Review from './_review'
import Search from './_search'
import SortReviewsDropdown, { SortOption, sortOptions } from './_sort-reviews-dropdown'
import { ReviewResponseData } from './api/reviews'

interface Props {
  reviews: ReviewResponseData[]
}
export default function Index({ reviews = [] }: Props): React.ReactElement {
  const [currentReviews, setReviews] = useState(reviews)
  const [currentSortedReviews, setSortedReviews] = useState([])

  const reviewContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 1 }
    }
  }

  const sortByHighestRating = () => orderBy(currentReviews, ['rating'], ['desc'])
  const sortByLowestRating = () => orderBy(currentReviews, ['rating'])
  const sortByMostRecent = () => orderBy(currentReviews, ['published_at'], ['desc'])
  const sortByOldest = () => orderBy(currentReviews, ['published_at']).reverse()

  const handleSort = (sortOption: SortOption) => {
    const sortHandler: Dictionary<() => ReviewResponseData[]> = {
      [sortOptions.highestRating]: sortByHighestRating,
      [sortOptions.lowestRating]: sortByLowestRating,
      [sortOptions.mostRecent]: sortByMostRecent,
      [sortOptions.oldest]: sortByOldest
    }

    const sortedReviews = sortHandler[sortOption]()
    setSortedReviews(sortedReviews)
    setReviews(sortedReviews)
  }

  const handleSearch = (searchTerm: string) => {
    const sanitizedSearchTerm = searchTerm.trim().toLowerCase()

    const filteredReviews = filter(reviews, review => {
      const reviewbodyMatches = review.body.toLowerCase().includes(sanitizedSearchTerm)
      const authorMatches = review.author.toLowerCase().includes(sanitizedSearchTerm)
      const ratingMatches = review.rating.toString().includes(sanitizedSearchTerm)

      return reviewbodyMatches || authorMatches || ratingMatches
    })

    const filteredAndSortedReviews = sortBy(filteredReviews, ({ id }) =>
      findIndex(currentSortedReviews, ['id', id])
    )

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
        <h1 className={styles.title}>Shakespeare Reviews</h1>
        <div className={styles.pageActions}>
          <Search handleSearch={handleSearch} />
          <SortReviewsDropdown handleSort={handleSort} />
        </div>
        <div className={styles.totalResults}>
          Results:&nbsp;
          <span className={styles.resultCount}>{currentReviews.length}</span>
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

Index.getInitialProps = async () => {
  const res = await fetch(`${process.env.BASE_URL}/api/reviews`)
  const reviews = await res.json()
  return { reviews }
}
