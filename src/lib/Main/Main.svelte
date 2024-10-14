<script lang="ts">
    import Card from "../Card/Card.svelte";
    import { POKEMON_TOTAL } from "../../common/constants";
    import CryButton from "../CryButton/CryButton.svelte";
    import { questionCounterStore, scoreCounterStore } from "../../common/store";
    
    let questionNum = 0;
    const unsubscribeQuestionNum = questionCounterStore.subscribe((value => questionNum = value));

    let score = 0;
    const unsubscribeScore = scoreCounterStore.subscribe((value => score = value));
    
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
</script>

<div class="question-number-container">
    Question: {questionNum}
</div>
<div class="score-container">
    Your score is {score}
</div>

<div class="card-container">
    <Card cardIndex={1} cardNum={randomPokemonNumbers[0]}/>
    <Card cardIndex={2} cardNum={randomPokemonNumbers[1]}/>
    <Card cardIndex={3} cardNum={randomPokemonNumbers[2]}/>
</div>

<div class="cry-button-container">
    <CryButton cryNum={randomPokemonNumbers[0]}/>
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

    .cry-button-container {
        display: flex;
        justify-content: center;
    }
</style>

