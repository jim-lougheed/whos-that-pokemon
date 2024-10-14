<script lang="ts">
    export let cryNum: number;
    const ctx = new AudioContext();
    let soundFile: AudioBuffer;

    fetch(`http://localhost:8080/cries/${cryNum}.ogg`)
    .then(data => data.arrayBuffer())
    .then(arrayBuffer => ctx.decodeAudioData(arrayBuffer))
    .then(decodedAudio => { 
        soundFile = decodedAudio;
    });

    function playback() {
        const playSound = ctx.createBufferSource();
        playSound.buffer = soundFile;
        playSound.playbackRate.value = 0.5;
        playSound.connect(ctx.destination);
        playSound.start(ctx.currentTime);
    }
</script>

<button on:click={() => playback()}>
    Play sound
</button>