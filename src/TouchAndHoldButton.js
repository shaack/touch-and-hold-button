/**
 * Author and copyright: Stefan Haack (https://shaack.com)
 * Repository: https://github.com/shaack/cm-chessboard
 * License: MIT, see file 'LICENSE'
 */
export class TouchAndHoldButton {

    constructor(buttonElement, props = {}) {
        this.props = {
            holdDuration: 1000,
            fillColor: "rgba(0,0,0,0.1)",
            confirmedShadow: "0 0 0 5px rgba(0,100,0,0.5)"
        }
        Object.assign(this.props, props)
        this.state = {
            confirmed: false,
            buttonOriginalBoxShadow: buttonElement.style.boxShadow
        }
        let holdTimeout

        buttonElement.style.position = "relative"

        const startHold = () => {
            this.state.confirmed = false
            addPointerUpListener(buttonElement, stopHold)
            addFillElement()
            setTimeout(() => {
                this.fillElement.style.width = "100%"  // This triggers the fill effect
            })
            holdTimeout = setTimeout(() => {
                this.state.confirmed = true
                buttonElement.style.boxShadow = this.props.confirmedShadow
                buttonElement.dispatchEvent(new Event('confirmed'))
            }, this.props.holdDuration)
        }

        const stopHold = () => {
            buttonElement.removeTouchAndHoldPointerUpListener()
            clearTimeout(holdTimeout)
            buttonElement.style.boxShadow = this.state.buttonOriginalBoxShadow
            removeFillElement()
        }

        const addFillElement = () => {
            this.fillElement = document.createElement('span')
            this.fillElement.classList.add('fill')
            this.fillElement.style.position = "absolute"
            this.fillElement.style.top = "0"
            this.fillElement.style.left = "0"
            this.fillElement.style.height = "100%"
            this.fillElement.style.width = "0" // Initial state: no fill
            this.fillElement.style.backgroundColor = this.props.fillColor // This is the color that will fill the button
            this.fillElement.style.zIndex = "0"
            this.fillElement.style.transition = `width ${this.props.holdDuration / 1000}s linear`
            console.log(`width ${this.props.holdDuration / 1000}s linear`)
            buttonElement.append(this.fillElement)
        }

        const removeFillElement = () => {
            this.fillElement.remove()
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
