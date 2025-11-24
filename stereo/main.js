const surface = document.getElementById("surface")
const left = document.getElementById("left")
const right = document.getElementById("right")

const scale = document.getElementById('scale')
const scaleValue = document.getElementById("scale-value")

const vertical = document.getElementById('vertical')
const verticalValue = document.getElementById("vertical-value")

const flip = document.getElementById('flip')

surface.onclick = () => {
  if (document.fullscreenElement) {
    document.exitFullscreen()
  } else {
    surface.requestFullscreen()
  }
}

function preventDefaults(e) {
  e.preventDefault()
  e.stopPropagation()
}

const events = ['dragenter', 'dragover', 'dragleave', 'drop']

events.forEach(eventName => {
  surface.addEventListener(eventName, preventDefaults)
})

surface.addEventListener('dragenter', () => {
  surface.classList.add('dragover')
})

surface.addEventListener('dragleave', () => {
  surface.classList.remove('dragover')
})

surface.addEventListener('drop', e => {
  surface.classList.remove('dragover')

  const file = e.dataTransfer.files[0]
  if (!file || !file.type.startsWith('image/')) return

  const reader = new FileReader()
  reader.onload = ev => {
    left.style.backgroundImage = `url(${ev.target.result})`
    right.style.backgroundImage = `url(${ev.target.result})`

  }
  reader.readAsDataURL(file)
})

scale.addEventListener('input', () => {

  left.style.backgroundSize = scale.value + '%'
  right.style.backgroundSize = scale.value + '%'

  scaleValue.textContent = scale.value + '%'
})

vertical.addEventListener('input', () => {

  left.style.transform = "scaleX(" + negativeBoolean(flip.checked) + ")" + " translateY(" + vertical.value + "%)"
  right.style.transform = "scaleX(" + negativeBoolean(flip.checked) + ")" + " translateY(" + -vertical.value + "%)"

  verticalValue.textContent = value + '%'
})

flip.addEventListener('change', () => {

  left.style.transform = "scaleX(" + negativeBoolean(flip.checked) + ")" + " translateY(" + vertical.value + "%)"
  right.style.transform = "scaleX(" + negativeBoolean(flip.checked) + ")" + " translateY(" + -vertical.value + "%)"

})

function negativeBoolean(value) {
  return value ? 1 : -1
}