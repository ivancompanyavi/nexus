import Shape from './shape'
import Rect from './rect'

export default class Hospital extends Shape {
  draw() {
    console.log(this)
    const rect = new Rect(this.ctx, this.tile, this.point)
    const rectPoints = rect.draw({ w: 14, h: 7, axis: 'x', color: '#BCB5B1' })
    const wallWidth = Math.abs(rectPoints[0].x - rectPoints[3].x)
    const wallHeight = Math.abs(rectPoints[0].y - rectPoints[1].y)
    const originalPoint = { ...rect.point }
    const originalTile = { ...rect.tile }
    //drawing windows
    rect.point = {
      x: this.point.x + this.tile.width / 2,
      y: this.point.y - this.tile.height,
    }
    rect.draw({ w: 1, h: 2, axis: 'x', color: 'white' })
    rect.point = {
      x: this.point.x + (2 * this.tile.width) / 2,
      y: this.point.y - this.tile.height - (2 * this.tile.height) / 2,
    }
    rect.draw({ w: 1, h: 2, axis: 'x', color: 'white' })
    rect.point = {
      x: rect.point.x + (2 * rect.tile.width) / 2,
      y: rect.point.y - (2 * rect.tile.height) / 2,
    }
    rect.draw({ w: 1, h: 2, axis: 'x', color: 'white' })
    rect.point = {
      x: rect.point.x + (2 * rect.tile.width) / 2,
      y: rect.point.y - (2 * rect.tile.height) / 2,
    }
    rect.draw({ w: 1, h: 2, axis: 'x', color: 'white' })
    rect.tile = { ...originalTile }
    rect.point = { ...originalPoint }
  }
}
