# touch-and-hold-button

Transform a HTML button to a touch-and-hold (long press) button.

- Prevent accidental button press with hold confirmation
- Works with or without Bootstrap

## References

- [Demo page](https://shaack.com/projekte/touch-and-hold-button/)
- [GitHub repository](https://github.com/shaack/touch-and-hold-button)
- [npm package](https://www.npmjs.com/package/touch-and-hold-button)

## Usage

```html
<button type="submit" id="holdButton">Hold Me</button>
<script type="module">
    import {TouchAndHoldButton} from './src/TouchAndHoldButton.js'

    const buttonElement = document.getElementById('holdButton')
    const touchAndHoldButton = new TouchAndHoldButton(buttonElement)

    buttonElement.addEventListener('hold', () => {
        console.log('`hold` event fired.')
    })
    buttonElement.addEventListener('confirm', () => {
        console.log('`confirm` event fired.')
    })
    buttonElement.addEventListener('cancel', () => {
        console.log('`cancel` event fired.')
    })
    buttonElement.addEventListener('action', () => {
        console.log('`action` event fired.')
        alert('Button confirmed action')
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
