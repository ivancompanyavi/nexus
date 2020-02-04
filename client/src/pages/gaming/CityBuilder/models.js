export class IsoMap {
  constructor({ elementId, screen, map, tile, color = '#15B89A' }) {
    console.log(screen)
    this.elementId = elementId
    this.screen = screen
    this.map = map
    this.tile = tile
    this.color = color
    this.canvas = null
    this.context = null
    this.position = {}
  }
  create() {
    this.position = { x: this.screen.width / 2, y: this.tile.height }
    this.canvas = document.getElementById(this.elementId)
    this.context = this.canvas.getContext('2d')

    this.canvas.setAttribute('width', this.screen.width)
    this.canvas.setAttribute('height', this.screen.height)

    for (let i = 0; i < this.map.width; i++) {
      for (let j = 0; j < this.map.height; j++) {
        // calculate coordinates
        var x = ((i - j) * this.tile.width) / 2 + this.position.x
        var y = ((i + j) * this.tile.height) / 2 + this.position.y
        // draw single tile
        this.drawTile(x, y)
      }
    }

    this.addListeners()
  }

  drawTile(x, y) {
    var tileWidth = this.tile.width
    var tileHeight = this.tile.height

    // begin
    this.context.beginPath()

    // move to start point
    this.context.moveTo(x - tileWidth / 2, y)

    /**
     * create four lines
     * --------------------------------------------
     *    step 1  |  step 2  |  step 3  |  step 4
     * --------------------------------------------
     *    /       |  /       |  /       |  /\
     *            |  \       |  \/      |  \/
     * --------------------------------------------
     */
    this.context.lineTo(x - tileWidth, y + tileHeight / 2)
    this.context.lineTo(x - tileWidth / 2, y + tileHeight)
    this.context.lineTo(x, y + tileHeight / 2)
    this.context.lineTo(x - tileWidth / 2, y)

    // draw path
    this.context.stroke()

    // fill tile
    this.context.fillStyle = this.color
    this.context.fill()
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
          this.drawHotel(isometricPosition)
        }
      },
      false
    )
  }

  convertScreenToIsometric(x, y) {
    x = (x - this.position.x) / this.tile.width
    y = (y - this.position.y) / this.tile.height

    var isoX = Math.floor(y + x)
    var isoY = Math.floor(y - x)

    return { x: isoX, y: isoY }
  }

  convertIsometricToScreen(x, y) {
    var screenX = ((x - y) * this.tile.width) / 2 + this.position.x
    var screenY = ((x + y) * this.tile.height) / 2 + this.position.y

    return { x: screenX, y: screenY }
  }

  getMousePosition(event) {
    var canvas = event.target
    var rect = canvas.getBoundingClientRect()

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

  drawHotel(isometricPosition) {
    const { x, y } = this.convertIsometricToScreen(
      isometricPosition.x,
      isometricPosition.y
    )
    const { width, height } = this.tile
    const hotelWidth = 3
    const hotelHeight = 1
    const hotelTall = 3

    // left
    this.context.beginPath()
    this.context.moveTo(x - width / 2, y + height)
    this.context.lineTo(x - width / 2, y + height - height * hotelTall)
    this.context.lineTo(
      x - width / 2 - (width * hotelHeight) / 2,
      y + height - (hotelHeight * height) / 2 - height * hotelTall
    )
    this.context.lineTo(
      x - width / 2 - (width * hotelHeight) / 2,
      y + height - (hotelHeight * height) / 2
    )

    this.context.stroke()

    this.context.fillStyle = 'black'
    this.context.fill()

    // front
    this.context.beginPath()
    this.context.moveTo(x - width / 2, y + height)
    this.context.lineTo(x - width / 2, y + height - height * hotelTall)
    this.context.lineTo(
      x - width / 2 + (width * hotelWidth) / 2,
      y + height - height * hotelTall - (height * hotelTall) / 2
    )
    this.context.lineTo(
      x - width / 2 + (width * hotelWidth) / 2,
      y + height - (height * hotelTall) / 2
    )

    this.context.stroke()

    this.context.fillStyle = 'red'
    this.context.fill()

    // top

    this.context.beginPath()
    this.context.moveTo(x - width / 2, y + height - height * hotelTall)
    this.context.lineTo(
      x - width / 2 - (width * hotelHeight) / 2,
      y + height - height * hotelTall - (height * hotelHeight) / 2
    )
    this.context.lineTo(
      x - width / 2 - (width * hotelHeight) / 2 + (width * hotelWidth) / 2,
      y + height / 2 - height * hotelTall - (height * hotelWidth) / 2
    )
    this.context.lineTo(
      x - width / 2 + (width * hotelWidth) / 2,
      y + height - height * hotelTall - (height * hotelWidth) / 2
    )

    this.context.stroke()

    this.context.fillStyle = 'blue'
    this.context.fill()
  }
}
