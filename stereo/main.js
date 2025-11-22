const surface = document.getElementById("surface")
const left = document.getElementById("left")
const right = document.getElementById("right")

const scale = document.getElementById('scale')
const scaleValue = document.getElementById("scale-value")

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

scaleValue.textContent = scale.value + '%'

scale.addEventListener('input', () => {
  const value = scale.value

  left.style.backgroundSize = value + '%'
  right.style.backgroundSize = value + '%'

  scaleValue.textContent = value + '%'
})

