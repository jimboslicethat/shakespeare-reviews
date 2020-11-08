import debounce from 'lodash/debounce'
import React from 'react'

import styles from '../styles/search.module.css'

interface Props {
  handleSearch: (searchTerm: string) => unknown
}
export default function Search({ handleSearch }: Props): React.ReactElement {
  const debouncedSearch = debounce(searchTerm => {
    handleSearch(searchTerm)
  }, 250)

  const onChange = event => {
    const searchTerm = event.target.value
    debouncedSearch(searchTerm)
  }

  return (
    <input
      className={styles.searchBar}
      type="search"
      id="search-reviews"
      name="Search Reviews"
      placeholder="Search Reviews"
      onChange={onChange}
      aria-label="Search through Reviews"
      tabIndex={0}
    />
  )
}
