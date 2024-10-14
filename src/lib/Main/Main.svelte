<script lang="ts">
    import Card from "../Card/Card.svelte";
    import { POKEMON_TOTAL } from "../../common/constants";
    import CryButton from "../CryButton/CryButton.svelte";
    import { answerKeyStore, pokemonNumberStore, questionCounterStore, scoreCounterStore } from "../../common/store";
    
    let questionNum = 0;
    const unsubscribeQuestionNum = questionCounterStore.subscribe((value => questionNum = value));

    let score = 0;
    const unsubscribeScore = scoreCounterStore.subscribe((value => score = value));

    let generatedPokemonNumbers: number[][] = [];
    const unsubscribePokemonNumbers = pokemonNumberStore.subscribe((value => generatedPokemonNumbers = value));

    let generatedAnswerKey: number[] = [];
    const unsubscribeAnswerKey = answerKeyStore.subscribe((value => generatedAnswerKey = value));
    console.log("ANSWER KEY", generatedAnswerKey);
    
    const handleSelectCard = (selectedIndex: number) => {
        console.log("HANDLING SELECTED CARD", selectedIndex, generatedAnswerKey[questionNum - 1], questionNum - 1);
        if (selectedIndex === generatedAnswerKey[questionNum - 1]) {
            console.log("UPDATES");
            scoreCounterStore.update((value => value += 1));
        };
        questionCounterStore.update((value => value += 1));
    }
</script>

<div class="question-number-container">
    Question: {questionNum}
</div>
<div class="score-container">
    Your score is {score}
</div>

<div class="card-container">
    <Card cardIndex={1} cardNum={generatedPokemonNumbers[questionNum - 1][0]} {handleSelectCard}/>
    <Card cardIndex={2} cardNum={generatedPokemonNumbers[questionNum - 1][1]} {handleSelectCard}/>
    <Card cardIndex={3} cardNum={generatedPokemonNumbers[questionNum - 1][2]} {handleSelectCard}/>
</div>

<div class="cry-button-container">
    <CryButton cryNum={generatedPokemonNumbers[questionNum - 1][0]}/>
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

