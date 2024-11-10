let preview = document.getElementsByTagName("model-viewer")[0]

onmousemove = (e) => {
    const x = e.pageX
    const y = e.pageY

    let scale = 2560/innerWidth

    preview.setAttribute("camera-orbit", (24 + x*-0.01) + "deg" + (112 + y*-0.01) + "deg" + (450*scale) + "m")
}