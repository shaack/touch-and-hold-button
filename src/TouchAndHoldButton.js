/**
 * Author and copyright: Stefan Haack (https://shaack.com)
 * Repository: https://github.com/shaack/cm-chessboard
 * License: MIT, see file 'LICENSE'
 */
export class TouchAndHoldButton {

    constructor(buttonElement, props = {}) {
        this.props = {
            holdDuration: 1000,
            fillColor: "auto",
            backgroundColor: "auto",
            confirmedShadow: "0 0 0 5px rgba(0,255,0,0.5)"
        }
        Object.assign(this.props, props)

        buttonElement.style.transition = "none"

        if (this.props.backgroundColor === "auto") {
            this.props.backgroundColor = getComputedStyle(buttonElement).backgroundColor
        }
        if (this.props.fillColor === "auto") {
            this.props.fillColor = getComputedStyle(buttonElement).backgroundColor
            const rgb = this.props.fillColor.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/)
            if (rgb) {
                this.props.fillColor = `rgb(${rgb[1] * 0.8}, ${rgb[2] * 0.8}, ${rgb[3] * 0.8})`
            }
        }
        buttonElement.style.background = `linear-gradient(to right, ${this.props.fillColor} 50%, ${this.props.backgroundColor} 50%) right / 200% no-repeat`
        this.state = {
            confirmed: false,
            buttonOriginalBoxShadow: buttonElement.style.boxShadow
        }
        let holdTimeout

        const startHold = () => {
            this.state.confirmed = false
            addPointerUpListener(buttonElement, stopHold)
            buttonElement.style.transition = `background ${this.props.holdDuration}ms linear`
            buttonElement.style.backgroundPosition = 'left'
            holdTimeout = setTimeout(() => {
                this.state.confirmed = true
                buttonElement.style.boxShadow = this.props.confirmedShadow
                buttonElement.dispatchEvent(new Event('confirmed'))
            }, this.props.holdDuration)
        }

        const stopHold = () => {
            buttonElement.removeTouchAndHoldPointerUpListener()
            clearTimeout(holdTimeout)
            buttonElement.style.transition = "none"
            buttonElement.style.backgroundPosition = "right"
            buttonElement.style.boxShadow = this.state.buttonOriginalBoxShadow
        }

        const addPointerDownListener = (element, callback) => {
            element.addEventListener('pointerdown', callback)
            element.addEventListener('touchstart', callback)
            element.removeTouchAndHoldPointerDownListener = () => {
                element.removeEventListener('pointerdown', callback)
                element.removeEventListener('touchstart', callback)
            }
        }

        const addPointerUpListener = (element, callback) => {
            window.addEventListener('pointerup', callback)
            window.addEventListener('touchend', callback)
            element.removeTouchAndHoldPointerUpListener = () => {
                window.removeEventListener('pointerup', callback)
                window.removeEventListener('touchend', callback)
            }
        }
        addPointerDownListener(buttonElement, startHold)
    }

    confirmed() {
        return this.state.confirmed
    }
}
