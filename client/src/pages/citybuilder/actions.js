import { of } from 'rxjs'

import { Hospital, Cube, Police, FireStation } from './models'
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
export function getBuildings$() {
    return of(buildings)
}