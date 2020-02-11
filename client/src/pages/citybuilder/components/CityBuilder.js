import React, { useState } from 'react'

import { Page } from '../../../common'
import Map from './Map'
import BuildingSelector from './BuildingSelector'

import styles from './CityBuilder.module.css'

export default () => {
  const [selectedBuilding, setSelectedBuilding] = useState(null)

  return (
    <Page.Page className={styles.index} key="page_citybuilder">
      <Page.Content>
        <article className={styles.cityBuilder}>
          <Map selectedBuilding={selectedBuilding} />
          <BuildingSelector onBuildingSelect={b => setSelectedBuilding(b)} />
        </article>
      </Page.Content>
    </Page.Page>
  )
}
