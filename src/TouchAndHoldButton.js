/**
 * Author and copyright: Stefan Haack (https://shaack.com)
 * Repository: https://github.com/shaack/cm-chessboard
 * License: MIT, see file 'LICENSE'
 */
export const BUTTON_STATE = {
    idle: "idle",
    holding: "holding",
    confirmed: "confirmed"
}

export class TouchAndHoldButton {

    constructor(buttonElement, props = {}) {
        this.props = {
            holdDuration: 800,
            fillColor: "auto",
            backgroundColor: "auto"
        }
        Object.assign(this.props, props)

        buttonElement.style.transition = "none"
        buttonElement.style.webkitUserSelect = "none"
        buttonElement.style.userSelect = "none"

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
        buttonElement.classList.add("touch-and-hold-button")
        this.state = {
            buttonState: BUTTON_STATE.idle,
            buttonOriginalBoxShadow: buttonElement.style.boxShadow
        }
        let holdTimeout

        const setButtonState = (state) => {
            this.state.buttonState = state
            buttonElement.dataset.state = state
        }

        const startHold = (event) => {
            // console.log("startHold", event)
            if(event.pointerType === "mouse" && event.button !== 0) {
                return
            }
            buttonElement.dispatchEvent(new Event('hold'))
            setButtonState(BUTTON_STATE.holding)
            addPointerUpListener(buttonElement, stopHold)
            buttonElement.style.transition = `background ${this.props.holdDuration - 10}ms linear`
            buttonElement.style.backgroundPosition = 'left'
            holdTimeout = setTimeout(() => {
                setButtonState(BUTTON_STATE.confirmed)
                buttonElement.dispatchEvent(new Event('confirm'))
            }, this.props.holdDuration)
        }

        const stopHold = (event) => {
            // console.log("stopHold", event)
            buttonElement.removeTouchAndHoldPointerUpListener()
            clearTimeout(holdTimeout)
            if (buttonElement.matches(":hover") && event.type === "pointerup" && this.state.buttonState === BUTTON_STATE.confirmed) {
                buttonElement.dispatchEvent(new Event('action'))
            } else {
                buttonElement.dispatchEvent(new Event('cancel'))
            }
            buttonElement.style.transition = "none"
            buttonElement.style.backgroundPosition = "right"
            buttonElement.style.boxShadow = this.state.buttonOriginalBoxShadow
            setButtonState(BUTTON_STATE.idle)
        }

        const addPointerUpListener = (element, callback) => {
            window.addEventListener('pointerup', callback)
            window.addEventListener('pointercancel', callback)
            element.addEventListener('mouseleave', callback)
            element.removeTouchAndHoldPointerUpListener = () => {
                window.removeEventListener('pointerup', callback)
                window.removeEventListener('pointercancel', callback)
                element.removeEventListener('mouseleave', callback)
            }
        }
        buttonElement.addEventListener("pointerdown", startHold)
        buttonElement.addEventListener("contextmenu", (event) => {
            // event.preventDefault()
        })
    }
}
