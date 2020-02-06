import React, { useEffect } from 'react'

import { IsoMap } from '../models'

import styles from './BuildingSelector.module.css'

const params = {
  elementId: 'buildings',
  screen: { width: 300, height: 130 },
  map: { width: 4, height: 4 },
  tile: { width: 30, height: 15 },
}

const buildings = [
  {
    title: 'house',
    position: { x: 2, y: 2 },
    x: 2,
    y: 2,
    z: 2,
  },
  {
    title: 'hospital',
    position: { x: 2, y: 2 },
    x: 2,
    y: 4,
    z: 2,
  },
  {
    title: 'police',
    position: { x: 2, y: 3 },
    x: 4,
    y: 2,
    z: 2,
  },
]

export default ({ onBuildingSelect }) => {
  useEffect(() => {
    buildings.forEach(b => {
      const isoMap = new IsoMap({ ...params, elementId: b.title })
      isoMap.create()
      isoMap.drawBuilding(b.position, b.x, b.y, b.z)
    })
  }, [])

  return (
    <div className={styles.buildingSelector}>
      {buildings.map(b => (
        <div className={styles.building}>
          <canvas id={b.title} onClick={() => onBuildingSelect(b)} />
        </div>
      ))}
    </div>
  )
}
