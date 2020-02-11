import Shape from './shape'
import Rect from './rect'

export default class Cube extends Shape {
  draw({ x, y, z, color = 'black' }) {
    const rect = new Rect(this.ctx, this.tile, this.point)
    const side1 = rect.draw({ w: x, h: y, axis: 'x', color })
    const side2 = rect.draw({ w: z, h: y, axis: 'y', color })
    // Modify the point to render for the topside rect
    rect.point = {
      x: rect.point.x,
      y: rect.point.y - y * this.tile.height,
    }
    const side3 = rect.draw({ w: z, h: x, axis: 'z', color })
    return [side1, side2, side3]
  }
}
