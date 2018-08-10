import React, { Component } from "react";

const styles = {
    canvas: {
        border: '2px solid #333',
    },

    maindiv: {
        margin: 'auto',
        padding: '1em',
        width: '100%'
    },

    button: {
        border: '0px',
        margin: '2px',
        height: '75px',
        minWidth: '75px'
    },

    colorOptions: {
        red: { 'backgroundColor': 'red' },
        orange: { 'backgroundColor': 'orange' },
        yellow: { 'backgroundColor': 'yellow' },
        green: { 'backgroundColor': 'green' },
        blue: { 'backgroundColor': 'blue' },
        purple: { 'backgroundColor': 'purple' },
        black: { 'backgroundColor': 'black' }
    }
}

class DrawApp extends React.Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.reset();
        this.addEventListener('touchmove', function (e) { e.preventDefault(); })
    }

    // What to do if pen is either up or down
    penUp() {
        this.setState({
            pen: 'up'
        })
    }

    penDown(e) {
        this.setState({
            pen: 'down',
            penCoords: [e.nativeEvent.offsetX, e.nativeEvent.offsetY]
        })
    }

    // Function used to set pen color
    setColor(c) { 
        //a color button was clicked
            this.setState({
                penColor: c
            })
        }

    // Handling buttons being clicked 
    // Setting mode to draw, when draw button is clicked
    draw(e) {
        this.setState({
            mode: 'draw'
        })
    }

    // Setting mode to erase, when erase button is clicked
    erase() {
        this.setState({
            mode: 'erase'
        })
    }

    // Reset button to clear canvas back to white and resets states back to originals
    reset() {
        this.setState({
            mode: 'draw',
            pen: 'up',
            lineWidth: 5,
            penColor: 'black'
        })

        this.ctx = this.refs.canvas.getContext('2d')
        this.ctx.fillStyle = "white"
        this.ctx.fillRect(0, 0, 500, 500)
        this.ctx.lineWidth = 5
    }

    // Increasing pen size when button is pressed
    penSizeUp() {
        this.setState({
            lineWidth: this.state.lineWidth += 5
        })
    }
    // Decreasing pen size when button is pressed
    penSizeDown() {
        this.setState({
            lineWidth: this.state.lineWidth -= 5
        })
    }

    // Function to determine what to do while pen is down
    drawing(e) {

        if (this.state.pen == 'down') {

            this.ctx.beginPath()
            this.ctx.lineWidth = this.state.lineWidth
            this.ctx.lineCap = 'round';

            if (this.state.mode == 'draw') {
                this.ctx.strokeStyle = this.state.penColor
            }

            if (this.state.mode == 'erase') {
                this.ctx.strokeStyle = '#fff'
            }

            // Move to old position
            this.ctx.moveTo(this.state.penCoords[0], this.state.penCoords[1])

            // Draw line to new position
            this.ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
            this.ctx.stroke();

            // Getting new position
            this.setState({
                penCoords: [e.nativeEvent.offsetX, e.nativeEvent.offsetY]
            })
        }
    }

    render() {
        return (
            <div style={styles.maindiv}>

                <canvas id='canvas' ref='canvas' width='500px' height='500px' style={styles.canvas}
                    onMouseMove={(e) => this.drawing(e)}
                    onMouseDown={(e) => this.penDown(e)}
                    onMouseUp={(e) => this.penUp(e)}>
                </canvas>

                <div>
                    <button onClick={(e) => this.draw(e)} style={styles.button}>Draw </button>
                    <button onClick={(e) => this.erase(e)} style={styles.button}>Erase</button>
                    <button onClick={(e) => this.penSizeUp()} style={styles.button}>Pen Size +</button>
                    <button onClick={(e) => this.penSizeDown()} style={styles.button}>Pen Size -</button>
                    <button onClick={() => this.reset()} style={styles.button}>Reset</button>
                </div>

                <div>
                    <button style={Object.assign({}, styles.colorOptions.red, styles.button)} onClick={() => this.setColor('red')}>Red</button>
                    <button style={Object.assign({}, styles.colorOptions.orange, styles.button)} onClick={() => this.setColor('orange')}>Orange</button>
                    <button style={Object.assign({}, styles.colorOptions.yellow, styles.button)} onClick={() => this.setColor('yellow')}>Yellow</button>
                    <button style={Object.assign({}, styles.colorOptions.green, styles.button)} onClick={() => this.setColor('green')}>Green</button>
                    <button style={Object.assign({}, styles.colorOptions.blue, styles.button)} onClick={() => this.setColor('blue')}>Blue</button>
                    <button style={Object.assign({}, styles.colorOptions.purple, styles.button)} onClick={() => this.setColor('purple')}>Purple</button>
                    <button style={Object.assign({}, styles.colorOptions.black, styles.button)} onClick={() => this.setColor('black')}>Black</button>
                </div>

            </div>
        )
    }
}

export default DrawApp;