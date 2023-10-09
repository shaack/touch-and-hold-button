# Transform an HTML button to a touch-and-hold (long press) button

## Usage

```html
<button type="submit" id="holdButton">Hold Me</button>
<script type="module">
    import {TouchAndHoldButton} from './src/TouchAndHoldButton.js'

    const buttonElement = document.getElementById('holdButton')
    const touchAndHoldButton = new TouchAndHoldButton(buttonElement)

    buttonElement.addEventListener('mousedown', () => {
        console.log('`touchstart` event fired, confirmed:', touchAndHoldButton.confirmed())
    })
    buttonElement.addEventListener('confirmed', () => {
        console.log('`confirmed` event fired, confirmed:', touchAndHoldButton.confirmed())
    })
    buttonElement.addEventListener('click', () => {
        console.log('`click` event fired, confirmed:', touchAndHoldButton.confirmed())
        if (touchAndHoldButton.confirmed()) {
            alert('Button was clicked and confirmed')
        }
    })
</script>
```

### Default props

```javascript
this.props = {
    holdDuration: 1000,
    fillColor: "rgba(0,0,0,0.1)",
    confirmedShadow: "0 0 0 5px rgba(0,100,0,0.5)"
}
```
