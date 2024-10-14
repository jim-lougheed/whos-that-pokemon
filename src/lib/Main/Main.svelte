<script lang="ts">
    import Card from "../Card/Card.svelte";
    import { POKEMON_TOTAL } from "../../common/constants";
    import CryButton from "../CryButton/CryButton.svelte";
    import { answerKeyStore, pokemonNumberStore, questionIndexStore, scoreCounterStore } from "../../common/store";
    
    let questionNum = 0;
    const unsubscribeQuestionNum = questionIndexStore.subscribe((value => questionNum = value));

    let score = 0;
    const unsubscribeScore = scoreCounterStore.subscribe((value => score = value));

    let generatedPokemonNumbers: number[][] = [];
    const unsubscribePokemonNumbers = pokemonNumberStore.subscribe((value => generatedPokemonNumbers = value));

    let generatedAnswerKey: number[] = [];
    const unsubscribeAnswerKey = answerKeyStore.subscribe((value => generatedAnswerKey = value));

    let cryNum = generatedPokemonNumbers[0][generatedAnswerKey[0] - 1];
    
    const handleSelectCard = (selectedIndex: number) => {
        if (selectedIndex === generatedAnswerKey[questionNum]) {
            scoreCounterStore.update((value => value += 1));
        };
        if (questionNum < 10) {
            questionIndexStore.update((value => value += 1));
        } else {

        }
        cryNum = generatedPokemonNumbers[questionNum][generatedAnswerKey[questionNum] - 1];
    }
</script>

<div class="question-number-container">
    Question: {questionNum + 1}
</div>
<div class="score-container">
    Your score is {score}
</div>

<div class="card-container">
    <Card cardIndex={1} cardNum={generatedPokemonNumbers[questionNum][0]} {handleSelectCard}/>
    <Card cardIndex={2} cardNum={generatedPokemonNumbers[questionNum][1]} {handleSelectCard}/>
    <Card cardIndex={3} cardNum={generatedPokemonNumbers[questionNum][2]} {handleSelectCard}/>
</div>

<div class="cry-button-container">
    <CryButton cryNum={cryNum}/>
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

