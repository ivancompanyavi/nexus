export class IsoMap {
  constructor({ elementId, screen, map, tile, color = '#15B89A' }) {
    this.elementId = elementId
    this.screen = screen
    this.map = map
    this.tile = tile
    this.color = color
    this.canvas = null
    this.ctx = null
    this.position = {}
  }
  create() {
    this.position = { x: this.screen.width / 2, y: this.tile.height * 3 }
    this.canvas = document.getElementById(this.elementId)
    this.ctx = this.canvas.getContext('2d')

    this.canvas.setAttribute('width', this.screen.width)
    this.canvas.setAttribute('height', this.screen.height)

    let x, y
    for (let i = 0; i < this.map.width; i++) {
      for (let j = 0; j < this.map.height; j++) {
        // calculate coordinates
        x = ((i - j) * this.tile.width) / 2 + this.position.x
        y = ((i + j) * this.tile.height) / 2 + this.position.y
        // draw single tile
        this.drawTile(x, y)
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

        if (this.isOnMap(isometricPosition, this.map)) {
          const { x, y, z } = this.selectedBuilding
          this.drawBuilding(isometricPosition, x, y, z)
        }
      },
      false
    )
  }

  convertScreenToIsometric(x, y) {
    x = (x - this.position.x) / this.tile.width
    y = (y - this.position.y) / this.tile.height

    const isoX = Math.floor(y + x)
    const isoY = Math.floor(y - x)

    return { x: isoX, y: isoY }
  }

  convertIsometricToScreen(x, y) {
    const screenX = ((x - y) * this.tile.width) / 2 + this.position.x
    const screenY = ((x + y) * this.tile.height) / 2 + this.position.y

    return { x: screenX, y: screenY }
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

  drawBuilding(isometricPosition, x, y, z) {
    const point = this.convertIsometricToScreen(
      isometricPosition.x,
      isometricPosition.y
    )
    this.drawCube(point, x, y, z)
  }

  drawCube(point, x, y, z) {
    this.drawRect(point, x, y, 'x', 'red')
    this.drawRect(point, z, y, 'y', 'blue')
    const topSidePoint = {
      x: point.x,
      y: point.y - y * this.tile.height,
    }
    this.drawRect(topSidePoint, z, x, 'z', 'green')
  }

  drawRect(point, w, h, axis, color) {
    const { x, y } = point
    let p1, p2, p3, p4
    const { width: tWidth, height: tHeight } = this.tile
    let isoWidth, isoHeight
    if (axis === 'x') {
      isoWidth = tWidth / 2
      isoHeight = tHeight
      p1 = { x: x - isoWidth, y: y + isoHeight }
      p2 = { x: x - isoWidth, y: y + isoHeight - isoHeight * h }
      p3 = {
        x: x - isoWidth + isoWidth * w,
        y: y + isoHeight - isoHeight * h - (isoHeight * w) / 2,
      }
      p4 = {
        x: x - isoWidth + isoWidth * w,
        y: y + isoHeight - (isoHeight * w) / 2,
      }
    } else if (axis === 'y') {
      isoWidth = tWidth / 2
      isoHeight = tHeight
      p1 = { x: x - isoWidth, y: y + isoHeight }
      p2 = { x: x - isoWidth, y: y + isoHeight - isoHeight * h }
      p3 = {
        x: x - isoWidth + isoWidth * w * -1,
        y: y + isoHeight - isoHeight * h - (isoHeight * w) / 2,
      }
      p4 = {
        x: x - isoWidth + isoWidth * w * -1,
        y: y + isoHeight - (isoHeight * w) / 2,
      }
    } else {
      isoWidth = tWidth
      isoHeight = tHeight
      p1 = { x: x - isoWidth / 2, y: y + isoHeight }
      p2 = {
        x: x - isoWidth / 2 - (isoWidth * w) / 2,
        y: y + isoHeight - (isoHeight * w) / 2,
      }
      p3 = {
        x: x - isoWidth / 2 - (isoWidth * w) / 2 + (isoWidth * h) / 2,
        y: y + isoHeight - (isoHeight * h) / 2 - (isoHeight * w) / 2,
      }
      p4 = {
        x: x - isoWidth / 2 + (isoWidth * h) / 2,
        y: y + isoHeight - (isoHeight * h) / 2,
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
