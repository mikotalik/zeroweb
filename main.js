let preview = document.getElementsByTagName("model-viewer")[0]

onmousemove = (e) => {
    const x = e.pageX
    const y = e.pageY

    preview.setAttribute("camera-orbit", (24 + x*-0.01) + "deg" + (106 + y*-0.01) + "deg" + "490m")
}