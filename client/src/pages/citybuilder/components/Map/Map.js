import React, { useEffect, useState } from 'react'

import { IsoMap } from '../../models'

import styles from './Map.module.css'

const params = {
  elementId: 'canvas',
  rows: 100,
  columns: 100,
  tile: { width: 10, height: 5 },
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
