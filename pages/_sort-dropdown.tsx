import React, { useState } from 'react'

import styles from '../styles/sort-dropdown.module.css'

export type SortOption = 'Most Recent' | 'Oldest' | 'Highest Rating' | 'Lowest Rating'

export const sortOptions = {
  mostRecent: 'Most Recent',
  oldest: 'Oldest',
  highestRating: 'Highest Rating',
  lowestRating: 'Lowest Rating'
}

interface Props {
  handleSort: (sortOption: SortOption) => void
}
export default function SortDropdown({ handleSort }: Props): React.ReactElement {
  const [currentSort, setSort] = useState(sortOptions.mostRecent)

  const handleChange = event => {
    const sortOption = event.target.value
    setSort(sortOption)
    handleSort(sortOption)
  }
  const domId = 'review-sort-dropdown'

  return (
    <select
      aria-label="Sort reviews"
      className={styles.select}
      id={domId}
      value={currentSort}
      onChange={handleChange}
      tabIndex={0}
    >
      <option value={sortOptions.mostRecent}>{sortOptions.mostRecent}</option>
      <option value={sortOptions.oldest}>{sortOptions.oldest}</option>
      <option value={sortOptions.highestRating}>{sortOptions.highestRating}</option>
      <option value={sortOptions.lowestRating}>{sortOptions.lowestRating}</option>
    </select>
  )
}
