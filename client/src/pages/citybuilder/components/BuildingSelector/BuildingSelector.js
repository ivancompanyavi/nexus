import React, { useEffect, useState } from 'react'
import { useObservable } from '../../../../common/hooks'

import { Map } from '../../models'

import { getBuildings$ } from '../../actions'

import styles from './BuildingSelector.module.css'

const params = {
  elementId: 'buildings',
  rows: 16,
  columns: 8,
  offset: 40,
  tile: { width: 10, height: 5 },
}


export default ({ onBuildingSelect }) => {
  const [selected, setSelected] = useState(null)

  const buildings$ = getBuildings$()
  const buildings = useObservable(buildings$, [])
  useEffect(() => {
    buildings.forEach(b => {
      const map = new Map({ ...params, elementId: b.title })
      map.create()
      map.drawShape(b.position, b.shape, b.data)
    })
  }, [buildings])

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
