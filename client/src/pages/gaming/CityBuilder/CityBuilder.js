import React, { useEffect } from 'react'

import { IsoMap } from './models'

const params = {
  elementId: 'canvas',
  screen: { width: 1024, height: 768 },
  map: { width: 14, height: 14 },
  tile: { width: 64, height: 32 },
}

export default () => {
  useEffect(() => {
    const isoMap = new IsoMap(params)
    isoMap.create()
  }, [])
  return <canvas id="canvas" />
}
