<script lang="ts">
  import { afterUpdate } from "svelte";
  import replayIcon from "../../assets/images/replay-icon.png";

    export let cryNum: number;
    const ctx = new AudioContext();
    let soundFile: AudioBuffer;

    const fetchSoundFile = () => {
        fetch(`https://whos-that-pokemon-backend.fly.dev/cries/${cryNum}.ogg`)
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

<button class="replay-sound-button" on:click={() => playback()}>
    <img class="replay-sound-icon" alt="replay sound" src={replayIcon}>
    <span>Play sound</span>
</button>

<style>
    .replay-sound-button {
        margin-top: 1rem;
        font-size: 2rem;
        display: flex;
        align-items: center;
    }

    .replay-sound-icon {
        color: white;
        width: 2rem;
        margin-right: 20px;
    }
</style>