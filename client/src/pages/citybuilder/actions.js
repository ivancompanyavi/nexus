import { of } from 'rxjs'

import { Hospital, Police, FireStation } from './models'
const buildings = [
  {
    title: 'hospital',
    position: { x: 1, y: 5 },
    shape: Hospital,
    pct: 0.3,
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
