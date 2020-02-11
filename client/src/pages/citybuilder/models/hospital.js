import Shape from './shape'
import Rect from './rect'
import Cube from './cube'

export default class Hospital extends Shape {
  draw() {
    this._drawSecondBlock()
    this._drawFirstBlock()
  }

  _drawFirstBlock() {
    let tempPoint
    const point = { x: this.point.x, y: this.point.y }
    const cube = new Cube(this.ctx, this.tile, this.point)
    const rect = new Rect(this.ctx, this.tile, this.point)
    // Walls
    tempPoint = cube.draw({ w: 5, h: 7, d: 5, color: '#B9B5AC', point })
    tempPoint = cube.draw({ w: 5, h: 1, d: 5, color: '#81645E', point: tempPoint[2][0] })
    tempPoint = cube.draw({ w: 5, h: 1, d: 5, color: 'white', point: tempPoint[2][0] })
    tempPoint = cube.draw({ w: 5, h: 4, d: 5, color: '#81645E', point: tempPoint[2][0] })

    // Windows
    const windows = [
      { x: 1, y: 1 },
      { x: 1, y: 4 },
      { x: 3, y: 4 },
      { x: 3, y: 1 },
    ]
    windows.forEach(w => {
      rect.draw({ w: 1, h: 2, axis: 'x', color: 'white', point, coords: w })
      rect.draw({ w: 1, h: 2, axis: 'y', color: 'white', point, coords: w })
    })

    // Cross
    rect.draw({ w: 1, h: 3, axis: 'x', color: 'white', point, coords: { x: 2, y: 10 } })
    rect.draw({ w: 3, h: 1, axis: 'x', color: 'white', point, coords: { x: 1, y: 11 } })
    // Now we draw the cross
  }

  _drawSecondBlock() {
    let tempPoint
    const { width, height } = this.tile
    const cube = new Cube(this.ctx, this.tile, this.point)
    const rect = new Rect(this.ctx, this.tile, this.point)
    const point = {
      x: this.point.x + (7 * width) / 2,
      y: this.point.y - (3 * height) / 2,
    }
    // Walls
    tempPoint = cube.draw({ w: 9, h: 7, d: 7, color: '#B9B5AC', point })
    tempPoint = cube.draw({ w: 9, h: 1, d: 7, color: '#81645E', point: tempPoint[2][0] })
    tempPoint = cube.draw({ w: 9, h: 1, d: 7, color: 'white', point: tempPoint[2][0] })
    tempPoint = cube.draw({ w: 9, h: 4, d: 7, color: '#81645E', point: tempPoint[2][0] })
    // Door
    rect.draw({ w: 3, h: 3, axis: 'x', color: 'blue', point, coords: { x: 3, y: 0 } })
    // Windows
    const windows = [
      { x: 1, y: 1 },
      { x: 1, y: 4 },
      { x: 3, y: 4 },
      { x: 5, y: 4 },
      { x: 7, y: 4 },
      { x: 7, y: 1 },
    ]
    windows.forEach(w => {
      rect.draw({ w: 1, h: 2, axis: 'x', color: 'white', point, coords: w })
    })
  }
}
