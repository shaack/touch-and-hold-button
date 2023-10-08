/**
 * Author and copyright: Stefan Haack (https://shaack.com)
 * Repository: https://github.com/shaack/cm-chessboard
 * License: MIT, see file 'LICENSE'
 */

export class TouchAndHoldButton {
    constructor(buttonElement, props = {}) {
        let holdDuration = 1000  // 3 seconds, which matches the CSS transition
        let holdTimeout

        this.fillElement = document.createElement('span')
        this.fillElement.classList.add('fill')
        this.fillElement.style.position = "absolute"
        this.fillElement.style.top = "0"
        this.fillElement.style.left = "0"
        this.fillElement.style.height = "100%"
        this.fillElement.style.width = "0" // Initial state: no fill
        this.fillElement.style.backgroundColor = "rgba(0,0,0,0.1)" // This is the color that will fill the button
        this.fillElement.style.zIndex = "0"
        this.fillElement.style.transition = "width 1s linear" // 3s matches our holdDuration in JS
        buttonElement.append(this.fillElement)

        const startHold = () => {
            this.fillElement.style.width = "100%"  // This triggers the fill effect
            holdTimeout = setTimeout(() => {
                alert('Action executed!')
                stopHold()
            }, holdDuration)
        }

        const stopHold = () => {
            clearTimeout(holdTimeout)
            this.fillElement.style.width = "0"
            this.fillElement.style.transition = "width 0.05s ease-in-out"  // This resets the fill effect

            // Restore the transition after a short delay
            setTimeout(() => {
                this.fillElement.style.transition = "width 1s linear"
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
            element.addEventListener('pointerup', callback)
            element.addEventListener('touchend', callback)
            element.removeTouchAndHoldPointerUpListener = () => {
                element.removeEventListener('pointerup', callback)
                element.removeEventListener('touchend', callback)
            }
        }

        addPointerDownListener(buttonElement, startHold)
        addPointerUpListener(buttonElement, stopHold)
    }
}
