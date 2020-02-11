import Rect from './rect'
import Building from './building'

export default class IsoMap {
  constructor({ elementId, rows, columns, offset = 0, tile, color = '#15B89A' }) {
    this.elementId = elementId
    this.rows = rows
    this.columns = columns
    this.offset = offset
    this.tile = tile
    this.color = color
    this.canvas = null
    this.ctx = null
    this.map = []
  }
  create() {
    this.canvas = document.getElementById(this.elementId)
    this.ctx = this.canvas.getContext('2d')

    const width = this.tile.width * this.rows
    const height = this.tile.height * this.columns

    this.canvas.setAttribute('width', width + this.offset * 2)
    this.canvas.setAttribute('height', height + this.offset * 2)

    let i, j
    for (i = 0; i < this.rows; i++) {
      for (j = 0; j < this.columns; j++) {
        this.map.push({
          x: i,
          y: j,
          points: this.drawShape({ x: i, y: j }, Rect, {
            w: 1,
            h: 1,
            axis: 'z',
            color: 'blue',
          }),
        })
      }
    }
  }

  selectBuilding(b) {
    if (this.buildingListener) {
      this.canvas.removeEventListener('mousedown', this.buildingListener)
    }
    this.buildingListener = event => {
      var mousePosition = this.getMousePosition(event)
      var isometricPosition = this.cartesianToIsometric(mousePosition.x, mousePosition.y)
      if (isometricPosition) {
        const { x, y, z, color, shape } = b
        this.drawShape(isometricPosition, shape, { x, y, z, color })
      }
    }
    this.canvas.addEventListener('mousedown', this.buildingListener, false)
  }

  addListeners() {
    this.canvas.addEventListener(
      'mousedown',
      event => {
        var mousePosition = this.getMousePosition(event)
        var isometricPosition = this.cartesianToIsometric(mousePosition.x, mousePosition.y)

        if (isometricPosition) {
          const { x, y, z } = this.selectedBuilding
          this.drawShape(isometricPosition, x, y, z)
        }
      },
      false
    )
  }

  cartesianToIsometric(x, y) {
    let xi, xj, yi, yj, inside
    for (const tile of this.map) {
      const pointLength = tile.points.length
      inside = false
      for (let i = 0, j = pointLength - 1; i < pointLength; j = i++) {
        xi = tile.points[i].x
        yi = tile.points[i].y
        xj = tile.points[j].x
        yj = tile.points[j].y
        let intersect = yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi
        if (intersect) inside = !inside
      }
      if (inside) {
        return { x: tile.x, y: tile.y }
      }
    }

    return null
  }

  isometricToCartesian(x, y) {
    const { width, height } = this.tile
    const x0 = width / 2 + this.offset
    const y0 = height / 2 + (height * this.rows) / 2 + this.offset

    return {
      x: x0 + (x * width) / 2 + (y * width) / 2,
      y: y0 - (x * height) / 2 + (y * height) / 2,
    }
  }

  getMousePosition(event) {
    const canvas = event.target
    const rect = canvas.getBoundingClientRect()

    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    }
  }

  drawShape(isometricPosition, ShapeClass, data) {
    const point = this.isometricToCartesian(isometricPosition.x, isometricPosition.y)
    const s = new ShapeClass(this.ctx, this.tile, point)
    const coords = s.draw(data)
    return coords
  }
}
