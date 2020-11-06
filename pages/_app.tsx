/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'

import '../styles/globals.css'

interface Props {
  Component: React.ComponentType
  pageProps: unknown
}
function MyApp({ Component, pageProps }: Props): React.ReactElement {
  return <Component {...pageProps} />
}

export default MyApp
