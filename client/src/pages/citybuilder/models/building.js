import Shape from './shape'
import Rect from './rect'

export default class Building extends Shape {
  draw({ x, y, z, color }) {
    const wall = new Rect(this.ctx, this.tile, this.point)
    const side1 = wall.draw({ w: x, h: y, axis: 'x', color, windows: 1 })
    const side2 = wall.draw({ w: z, h: y, axis: 'y', color })
    // Modify the point to render for the topside wall
    wall.point = {
      x: wall.point.x,
      y: wall.point.y - y * this.tile.height,
    }
    const side3 = wall.draw({ w: z, h: x, axis: 'z', color })
    return [side1, side2, side3]
  }
}
