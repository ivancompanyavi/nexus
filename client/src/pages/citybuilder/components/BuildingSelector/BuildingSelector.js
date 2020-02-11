import React, { useEffect, useState } from 'react'

import { IsoMap, Building, Hospital } from '../../models'

import styles from './BuildingSelector.module.css'

const params = {
  elementId: 'buildings',
  rows: 16,
  columns: 8,
  offset: 40,
  tile: { width: 10, height: 5 },
}

const buildings = [
  {
    title: 'house',
    position: { x: 1, y: 2 },
    x: 2,
    y: 2,
    z: 2,
    color: 'green',
    windows: 1,
    shape: Building,
  },
  {
    title: 'hospital',
    position: { x: 1, y: 7 },
    x: 14,
    y: 11,
    z: 6,
    color: 'blue',
    shape: Hospital,
  },
  {
    title: 'police',
    position: { x: 0, y: 2 },
    x: 4,
    y: 2,
    z: 2,
    color: 'red',
    shape: Building,
  },
]

export default ({ onBuildingSelect }) => {
  const [selected, setSelected] = useState(null)
  useEffect(() => {
    buildings.forEach(b => {
      const isoMap = new IsoMap({ ...params, elementId: b.title })
      isoMap.create()
      isoMap.drawShape(b.position, b.shape, {
        x: b.x,
        y: b.y,
        z: b.z,
        color: b.color,
        windows: b.windows,
      })
    })
  }, [])

  const selectBuilding = b => {
    onBuildingSelect(b)
    setSelected(b.title)
  }

  return (
    <div className={styles.buildingSelector}>
      {buildings.map(b => (
        <div className={styles.building} key={`buidling_${b.title}`}>
          <canvas
            className={selected === b.title ? styles.selected : ''}
            id={b.title}
            onClick={() => selectBuilding(b)}
          />
          <span>{b.title}</span>
        </div>
      ))}
    </div>
  )
}
