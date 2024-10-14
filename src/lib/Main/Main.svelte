<script lang="ts">
    import Card from "../Card/Card.svelte";
import { POKEMON_TOTAL } from "../../common/constants";

    let score = 0;
    
    const getRandomPokemonNumbers = (numPokemon: number) => {
        const maxNumber = POKEMON_TOTAL;
        const randomNumbersArray: number[] = [];
        for (let i = 0; i < numPokemon; i++) {
            let randomInt = Math.floor(Math.random() * (maxNumber));
            while (randomNumbersArray.includes(randomInt)) {
                randomInt = Math.floor(Math.random() * (maxNumber));
            }
            randomNumbersArray.push(randomInt);
        }
        return randomNumbersArray;
    }
    const grab3Pokemon = () => {
        for (let i = 0; i < 3; i++) {
            fetch(``)
        }
    }

    const randomPokemonNumbers = getRandomPokemonNumbers(3);

    const ctx = new AudioContext();
    let soundFile: AudioBuffer[] = [];

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

<div class="score-container">
    Your score is {score}
</div>

<div class="card-container">
    <Card cardIndex={1} cardNum={randomPokemonNumbers[0]}/>
    <Card cardIndex={2} cardNum={randomPokemonNumbers[1]}/>
    <Card cardIndex={3} cardNum={randomPokemonNumbers[2]}/>
</div>

<style>
    .score-container {
        border: red solid 5px;
        border-radius: 16px;
        padding: 10px;
        position: absolute;
        top: 2rem;
        right: 2rem;
    }

    .card-container{
        display: flex;
        justify-content: center;
        gap: 1rem;
    }
</style>

