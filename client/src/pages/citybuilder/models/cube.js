import Shape from './shape'
import Rect from './rect'

export default class Cube extends Shape {
  draw({ w, h, d, color = 'black', point = this.point }) {
    const rect = new Rect(this.ctx, this.tile, point)
    const side1 = rect.draw({ w, h, axis: 'x', color })
    const side2 = rect.draw({ w: d, h, axis: 'y', color })
    // Modify the point to render for the topside rect
    rect.point = {
      x: rect.point.x,
      y: rect.point.y - h * this.tile.height,
    }
    const side3 = rect.draw({ w: d, h: w, axis: 'z', color })
    return [side1, side2, side3]
  }
}
