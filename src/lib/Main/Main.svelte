<script lang="ts">
    let score = 0;
    const incrementScore = () => {
        score += 1
    }

    const ctx = new AudioContext();
    let soundFile = [];
    // console.log("HERE");
    for (let i = 0; i < 10; i++) {
        fetch(`http://localhost:8080/cries/${i + 1}.ogg`)
        .then(data => data.arrayBuffer())
        .then(arrayBuffer => ctx.decodeAudioData(arrayBuffer))
        .then(decodedAudio => { 
            console.log("HERE 2");
            soundFile[i] = decodedAudio;
        });
    }

    function playback(index: number) {
        console.log("PLAY BACKING", index);
        const playSound = ctx.createBufferSource();
        playSound.buffer = soundFile[index - 1];
        playSound.connect(ctx.destination);
        playSound.start(ctx.currentTime);
    }
</script>

<button on:click={incrementScore}>
    Your score is {score}
</button>

<button on:click={() => playback(1)}>
    Play Cry 1
</button>
<button on:click={() => playback(2)}>
    Play Cry 2
</button>
<button on:click={() => playback(3)}>
    Play Cry 3
</button>
<button on:click={() => playback(4)}>
    Play Cry 4
</button>
<button on:click={() => playback(5)}>
    Play Cry 5
</button>
<button on:click={() => playback(6)}>
    Play Cry 6
</button>
<button on:click={() => playback(7)}>
    Play Cry 7
</button>
<button on:click={() => playback(8)}>
    Play Cry 8
</button>
<button on:click={() => playback(9)}>
    Play Cry 9
</button>
<button on:click={() => playback(10)}>
    Play Cry 10
</button>