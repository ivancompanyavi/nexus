import Shape from './shape'

export default class Rect extends Shape {
  draw({ w, h, axis, color = 'black', point = this.point, coords = null }) {
    const { x, y } = point

    let p1, p2, p3, p4
    let points = []
    const { width, height } = this.tile
    if (axis === 'x') {
      points[0] = { x, y }
      points[1] = { x: x, y: y - height * h }
      points[2] = {
        x: x + (width * w) / 2,
        y: y - height * h - (height * w) / 2,
      }
      points[3] = {
        x: x + (width * w) / 2,
        y: y - (height * w) / 2,
      }
      if (coords) {
        points = points.map(p => ({
          x: p.x + (coords.x * width) / 2,
          y: p.y - (coords.x * height) / 2 - coords.y * height,
        }))
      }
    } else if (axis === 'y') {
      points[0] = { x, y }
      points[1] = { x: x, y: y - height * h }
      points[2] = {
        x: x - (width * w) / 2,
        y: y - height * h - (height * w) / 2,
      }
      points[3] = {
        x: x - (width * w) / 2,
        y: y - (height * w) / 2,
      }

      if (coords) {
        points = points.map(p => ({
          x: p.x - (coords.x * width) / 2,
          y: p.y - (coords.x * height) / 2 - coords.y * height,
        }))
      }
    } else {
      points[0] = { x, y }
      points[1] = {
        x: x - (width * w) / 2,
        y: y - (height * w) / 2,
      }
      points[2] = {
        x: x - (width * w) / 2 + (width * h) / 2,
        y: y - (height * h) / 2 - (height * w) / 2,
      }
      points[3] = {
        x: x + (width * h) / 2,
        y: y - (height * h) / 2,
      }
    }

    this.ctx.beginPath()
    this.ctx.moveTo(points[0].x, points[0].y)
    this.ctx.lineTo(points[1].x, points[1].y)
    this.ctx.lineTo(points[2].x, points[2].y)
    this.ctx.lineTo(points[3].x, points[3].y)

    this.ctx.stroke()

    this.ctx.fillStyle = color
    this.ctx.fill()
    return points
  }
}
