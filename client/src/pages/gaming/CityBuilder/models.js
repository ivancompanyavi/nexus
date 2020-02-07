export class IsoMap {
  constructor({
    elementId,
    map,
    screen = { offset: 0 },
    tile,
    color = '#15B89A',
  }) {
    this.elementId = elementId
    this.map = map
    this.screen = screen
    this.tile = tile
    this.color = color
    this.canvas = null
    this.ctx = null
  }
  create() {
    const { rows, columns } = this.map
    const { offset } = this.screen
    this.canvas = document.getElementById(this.elementId)
    this.ctx = this.canvas.getContext('2d')

    const width = this.tile.width * rows
    const height = this.tile.height * columns

    this.canvas.setAttribute('width', width + offset * 2)
    this.canvas.setAttribute('height', height + offset * 2)

    let i, j
    for (i = 0; i < rows; i++) {
      for (j = 0; j < columns; j++) {
        this.drawShape({ x: i, y: j }, Rect, {
          w: 1,
          h: 1,
          axis: 'z',
          color: 'blue',
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
      var isometricPosition = this.convertScreenToIsometric(
        mousePosition.x,
        mousePosition.y
      )

      console.log(isometricPosition)

      if (this.isOnMap(isometricPosition, this.map)) {
        const { x, y, z } = b
        this.drawBuilding(isometricPosition, x, y, z)
      }
    }
    this.canvas.addEventListener('mousedown', this.buildingListener, false)
  }

  drawTile(x, y) {
    var tileWidth = this.tile.width
    var tileHeight = this.tile.height

    // begin
    this.ctx.beginPath()

    // move to start point
    this.ctx.moveTo(x - tileWidth / 2, y)

    /**
     * create four lines
     * --------------------------------------------
     *    step 1  |  step 2  |  step 3  |  step 4
     * --------------------------------------------
     *    /       |  /       |  /       |  /\
     *            |  \       |  \/      |  \/
     * --------------------------------------------
     */
    this.ctx.lineTo(x - tileWidth, y + tileHeight / 2)
    this.ctx.lineTo(x - tileWidth / 2, y + tileHeight)
    this.ctx.lineTo(x, y + tileHeight / 2)
    this.ctx.lineTo(x - tileWidth / 2, y)

    // draw path
    this.ctx.stroke()

    // fill tile
    this.ctx.fillStyle = this.color
    this.ctx.fill()
  }

  addListeners() {
    this.canvas.addEventListener(
      'mousedown',
      event => {
        var mousePosition = this.getMousePosition(event)
        var isometricPosition = this.convertScreenToIsometric(
          mousePosition.x,
          mousePosition.y
        )
        console.log(isometricPosition)

        if (this.isOnMap(isometricPosition, this.map)) {
          const { x, y, z } = this.selectedBuilding
          this.drawBuilding(isometricPosition, x, y, z)
        }
      },
      false
    )
  }

  convertScreenToIsometric(x, y) {
    const { width, height } = this.tile
    const { offset } = this.screen
    return {
      x: Math.round((x - offset) / width),
      y: Math.round((y - offset) / height),
    }
  }

  convertIsometricToScreen(x, y) {
    const { width, height } = this.tile
    const { offset } = this.screen
    const x0 = width / 2 + offset
    const y0 = height / 2 + (height * this.map.rows) / 2 + offset

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

  isOnMap(position, map) {
    if (
      position.x >= 0 &&
      position.x < map.width &&
      position.y >= 0 &&
      position.y < map.height
    ) {
      return true
    } else {
      return false
    }
  }

  drawShape(isometricPosition, ShapeClass, data) {
    const point = this.convertIsometricToScreen(
      isometricPosition.x,
      isometricPosition.y
    )
    const s = new ShapeClass(this.ctx, this.tile, point)
    s.draw(data)
  }
}

class Shape {
  constructor(ctx, tile, point) {
    this.ctx = ctx
    this.tile = tile
    this.point = point
  }
  draw() {}
}

export class Rect extends Shape {
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
  }
}

export class Cube extends Shape {
  draw({ x, y, z, color = 'black' }) {
    const rect = new Rect(this.ctx, this.tile, this.point)
    rect.draw({ w: x, h: y, axis: 'x', color })
    rect.draw({ w: z, h: y, axis: 'y', color })
    // Modify the point to render for the topside rect
    rect.point = {
      x: rect.point.x,
      y: rect.point.y - y * this.tile.height,
    }
    rect.draw({ w: z, h: x, axis: 'z', color })
  }
}
