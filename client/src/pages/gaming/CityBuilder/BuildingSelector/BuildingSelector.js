import React, { useEffect } from 'react'

import { IsoMap, Cube } from '../models'

import styles from './BuildingSelector.module.css'

const params = {
  elementId: 'buildings',
  map: { rows: 4, columns: 4 },
  screen: { offset: 40 },
  tile: { width: 30, height: 15 },
}

const buildings = [
  {
    title: 'house',
    position: { x: 1, y: 2 },
    x: 2,
    y: 2,
    z: 2,
    color: 'green',
  },
  {
    title: 'hospital',
    position: { x: 1, y: 2 },
    x: 2,
    y: 4,
    z: 2,
    color: 'blue',
  },
  {
    title: 'police',
    position: { x: 1, y: 2 },
    x: 4,
    y: 2,
    z: 2,
    color: 'red',
  },
]

export default ({ onBuildingSelect }) => {
  useEffect(() => {
    buildings.forEach(b => {
      const isoMap = new IsoMap({ ...params, elementId: b.title })
      isoMap.create()
      isoMap.drawShape(b.position, Cube, {
        x: b.x,
        y: b.y,
        z: b.z,
        color: b.color,
      })
    })
  }, [])

  return (
    <div className={styles.buildingSelector}>
      {buildings.map(b => (
        <div className={styles.building}>
          <canvas id={b.title} onClick={() => onBuildingSelect(b)} />
          <p>{b.title}</p>
        </div>
      ))}
    </div>
  )
}
