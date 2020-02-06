import React, { useEffect, useState } from 'react'

import { IsoMap } from '../models'

import styles from './Map.module.css'

const params = {
  elementId: 'canvas',
  screen: { width: 800, height: 450 },
  map: { width: 14, height: 14 },
  tile: { width: 50, height: 25 },
}

export default ({ selectedBuilding }) => {
  const [map, setMap] = useState(null)
  useEffect(() => {
    const m = new IsoMap({ ...params })
    setMap(m)
    m.create()
  }, [])
  useEffect(() => {
    if (map && selectedBuilding) {
      map.selectBuilding(selectedBuilding)
    }
  }, [map, selectedBuilding])
  return (
    <div className={styles.map}>
      <canvas id="canvas" />
    </div>
  )
}
