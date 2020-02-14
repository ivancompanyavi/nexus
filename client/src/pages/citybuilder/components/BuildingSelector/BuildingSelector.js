import React, { useEffect, useState } from 'react'

import { Map, Hospital, Cube, Police, FireStation } from '../../models'

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
    data: {
      w: 2,
      h: 2,
      d: 2,
      color: '#00FF00',
    },
    shape: Cube,
  },
  {
    title: 'hospital',
    position: { x: 1, y: 5 },
    shape: Hospital,
  },
  {
    title: 'police',
    position: { x: 3, y: 6 },
    shape: Police,
  },
  {
    title: 'Fire station',
    position: { x: 3, y: 6 },
    shape: FireStation,
  },
]

export default ({ onBuildingSelect }) => {
  const [selected, setSelected] = useState(null)
  useEffect(() => {
    buildings.forEach(b => {
      const map = new Map({ ...params, elementId: b.title })
      map.create()
      map.drawShape(b.position, b.shape, b.data)
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
