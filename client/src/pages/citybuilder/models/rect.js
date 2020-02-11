import Shape from './shape'

export default class Rect extends Shape {
  draw({ w, h, axis, color = 'black' }) {
    const { x, y } = this.point

    let p1, p2, p3, p4
    const { width, height } = this.tile
    p1 = { x, y }
    if (axis === 'x') {
      p2 = { x: x, y: y - height * h }
      p3 = {
        x: x + (width * w) / 2,
        y: y - height * h - (height * w) / 2,
      }
      p4 = {
        x: x + (width * w) / 2,
        y: y - (height * w) / 2,
      }
    } else if (axis === 'y') {
      p2 = { x: x, y: y - height * h }
      p3 = {
        x: x - (width * w) / 2,
        y: y - height * h - (height * w) / 2,
      }
      p4 = {
        x: x - (width * w) / 2,
        y: y - (height * w) / 2,
      }
    } else {
      p2 = {
        x: x - (width * w) / 2,
        y: y - (height * w) / 2,
      }
      p3 = {
        x: x - (width * w) / 2 + (width * h) / 2,
        y: y - (height * h) / 2 - (height * w) / 2,
      }
      p4 = {
        x: x + (width * h) / 2,
        y: y - (height * h) / 2,
      }
    }

    this.ctx.beginPath()
    this.ctx.moveTo(p1.x, p1.y)
    this.ctx.lineTo(p2.x, p2.y)
    this.ctx.lineTo(p3.x, p3.y)
    this.ctx.lineTo(p4.x, p4.y)

    this.ctx.stroke()

    this.ctx.fillStyle = color
    this.ctx.fill()
    return [
      { x: p1.x, y: p1.y },
      { x: p2.x, y: p2.y },
      { x: p3.x, y: p3.y },
      { x: p4.x, y: p4.y },
    ]
  }
}
