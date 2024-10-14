<script lang="ts">
  import { afterUpdate } from "svelte";

    export let cryNum: number;
    const ctx = new AudioContext();
    let soundFile: AudioBuffer;

    const fetchSoundFile = () => {
        fetch(`http://localhost:8080/cries/${cryNum}.ogg`)
            .then(data => data.arrayBuffer())
            .then(arrayBuffer => ctx.decodeAudioData(arrayBuffer))
            .then(decodedAudio => { 
                soundFile = decodedAudio;
                setTimeout(() => {
                    playback();
                }, 1000);
            });
    }

    function playback() {
        const playSound = ctx.createBufferSource();
        playSound.buffer = soundFile;
        playSound.connect(ctx.destination);
        playSound.start(ctx.currentTime);
    }

    afterUpdate(() => {
        fetchSoundFile();
    })

    fetchSoundFile();
</script>

<button on:click={() => playback()}>
    Play sound
</button>