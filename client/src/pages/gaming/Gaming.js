import React from 'react'

import { Page } from '../../common'
import CityBuilder from './CityBuilder'

import styles from './Gaming.module.css'

const Gaming = () => {
  return (
    <Page.Page className={styles.index} key="page_gaming">
      <Page.Content>
        <CityBuilder />
      </Page.Content>
    </Page.Page>
  )
}

export default Gaming
