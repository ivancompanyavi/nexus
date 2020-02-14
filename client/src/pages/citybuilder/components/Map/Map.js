import React, { useEffect, useState } from 'react'

import { Map } from '../../models'

import styles from './Map.module.css'

const params = {
  elementId: 'canvas',
  rows: 50,
  columns: 50,
  tile: { width: 20, height: 10 },
}

export default ({ selectedBuilding }) => {
  const [map, setMap] = useState(null)
  useEffect(() => {
    const m = new Map({ ...params })
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
