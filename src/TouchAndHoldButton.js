/**
 * Author and copyright: Stefan Haack (https://shaack.com)
 * Repository: https://github.com/shaack/cm-chessboard
 * License: MIT, see file 'LICENSE'
 */

export function TouchAndHoldButton(buttonElement, props = {}) {

    this.props = {
        holdDuration: 1200,
        preventDefault: true,
        fillColor: "rgba(0,0,0,0.1)"
    }
    Object.assign(this.props, props)

    let holdTimeout

    buttonElement.style.position = "relative"
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
    buttonElement.append(this.fillElement)

    if (this.props.preventDefault) {
        buttonElement.addEventListener("click", (event) => {
            event.preventDefault()
        })
    }

    const startHold = () => {
        addPointerUpListener(buttonElement, stopHold)
        this.fillElement.style.width = "100%"  // This triggers the fill effect
        holdTimeout = setTimeout(() => {
            buttonElement.dispatchEvent(new Event('touchAndHold'))
            stopHold()
        }, this.props.holdDuration)
    }

    const stopHold = () => {
        buttonElement.removeTouchAndHoldPointerUpListener()
        clearTimeout(holdTimeout)
        this.fillElement.style.width = "0"
        this.fillElement.style.transition = "none" // "width 0.05s ease-in-out"  // This resets the fill effect

        setTimeout(() => {
            this.fillElement.style.transition = `width ${this.props.holdDuration / 1000}s linear`
        }, 50)
    }

    function addPointerDownListener(element, callback) {
        element.addEventListener('pointerdown', callback)
        element.addEventListener('touchstart', callback)
        element.removeTouchAndHoldPointerDownListener = () => {
            element.removeEventListener('pointerdown', callback)
            element.removeEventListener('touchstart', callback)
        }
    }

    function addPointerUpListener(element, callback) {
        window.addEventListener('pointerup', callback)
        window.addEventListener('touchend', callback)
        element.removeTouchAndHoldPointerUpListener = () => {
            window.removeEventListener('pointerup', callback)
            window.removeEventListener('touchend', callback)
        }
    }

    addPointerDownListener(buttonElement, startHold)
}
