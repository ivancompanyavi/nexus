const TRANSPARENT_HEX_COLOR = '66'

export const STATES = {
  DEFAULT: 'DEFAULT',
  DRAGGING: 'DRAGGING',
}

export default class Shape {
  constructor({ ctx, tile, point, state = STATES.DEFAULT }) {
    if (ctx === undefined) {
      console.log('pete')
    }
    this.ctx = ctx
    this.tile = tile
    this.point = point
    this.state = state
  }
  draw() {}

  getColor(color) {
    if (this.state === STATES.DRAGGING) {
      return `${color}${TRANSPARENT_HEX_COLOR}`
    }
    return color
  }
}
