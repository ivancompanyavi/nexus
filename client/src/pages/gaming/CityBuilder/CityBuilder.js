import React, { useState } from 'react'

import Map from './Map'
import BuildingSelector from './BuildingSelector'

import styles from './CityBuilder.module.css'

export default () => {
  const [selectedBuilding, setSelectedBuilding] = useState(null)

  return (
    <article className={styles.cityBuilder}>
      <Map selectedBuilding={selectedBuilding} />
      <BuildingSelector onBuildingSelect={b => setSelectedBuilding(b)} />
    </article>
  )
}
