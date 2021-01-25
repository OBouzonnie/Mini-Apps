const musicPlayer = document.querySelector('audio')

musicPlayer.addEventListener('play', () => {

    const audioCtx = new AudioContext()
    
    const source = audioCtx.createMediaElementSource(musicPlayer)

    const analyseur = audioCtx.createAnalyser()

    const canvas = document.querySelector('canvas')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    const ctx = canvas.getContext('2d')

    source.connect(analyseur)

    analyseur.connect(audioCtx.destination)

    analyseur.fftSize = 1024

    const freqAudio = analyseur.frequencyBinCount;

    const freqTab = new Uint8Array(freqAudio)

    const canWidth = canvas.width 
    const canHeight = canvas.height

    const freqWidth = (2*Math.PI / freqTab.length) + 2
    let freqHeight

    ctx.translate(canWidth/2,canHeight/2)

    function drawFreq() {

        requestAnimationFrame(drawFreq)

        analyseur.getByteFrequencyData(freqTab)

        ctx.fillStyle = "#000"
        ctx.fillRect(-canWidth/2,-canHeight/2,canWidth,canHeight)

        for(let i = 0; i < freqAudio; i++){

            freqHeight = freqTab[i];

            let r = 255-(i/freqAudio*130)
            let g = 12
            let b = 130+(i/freqAudio*130)

            ctx.rotate(i * (2*Math.PI /freqAudio))

            ctx.fillStyle = `rgb(${r}, ${g}, ${b})`
            ctx.fillRect(0, -freqWidth/2, freqWidth/2, freqHeight*2)
        }

    }

    drawFreq()

    musicPlayer.addEventListener('ended', () => {
        ctx.fillRect(0,0,canWidth,canHeight)
    })

})


