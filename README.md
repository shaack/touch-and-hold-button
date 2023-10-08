# Transform an HTML button to a touch-and-hold (long press) button

## Usage

```html
<button id="holdButton">Touch and hold me</button>
<script type="module">
    import {TouchAndHoldButton} from './src/TouchAndHoldButton.js'

    const buttonElement = document.getElementById('holdButton')
    const button = new TouchAndHoldButton(buttonElement, {
        holdDuration: 3000
    })
    buttonElement.addEventListener('touchAndHold', () => {
        console.log('touchAndHold event fired')
    })
</script>
```

### Default props

```javascript
this.props = {
    holdDuration: 1000,
    preventDefault: true,
    fillColor: "rgba(0,0,0,0.1)"
}
```
