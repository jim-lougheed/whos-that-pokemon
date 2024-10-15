<script lang="ts">
    import Card from "../Card/Card.svelte";
    import { POKEMON_TOTAL } from "../../common/constants";
    import CryButton from "../CryButton/CryButton.svelte";
    import { answerKeyStore, pokemonNumberStore, questionIndexStore, scoreCounterStore } from "../../common/store";
    import Response from "../Response/Response.svelte";
    
    let questionNum = 0;
    const unsubscribeQuestionNum = questionIndexStore.subscribe((value => questionNum = value));

    let score = 0;
    const unsubscribeScore = scoreCounterStore.subscribe((value => score = value));

    let generatedPokemonNumbers: number[][] = [];
    const unsubscribePokemonNumbers = pokemonNumberStore.subscribe((value => generatedPokemonNumbers = value));

    let generatedAnswerKey: number[] = [];
    const unsubscribeAnswerKey = answerKeyStore.subscribe((value => generatedAnswerKey = value));

    let cryNum = generatedPokemonNumbers[0][generatedAnswerKey[0] - 1];
    let stage: "start" | "question" | "response" | "results" = "start";
    let response: "correct" | "incorrect";
    
    const handleSelectCard = (selectedIndex: number) => {
        if (selectedIndex === generatedAnswerKey[questionNum]) {
            scoreCounterStore.update((value => value += 1));
            response = "correct";
        } else {
            response = "incorrect";
        };
        stage = "response";
        if (questionNum < 9) {
            console.log("QUESTION NUM", questionNum);
            questionIndexStore.update((value => value += 1));
            cryNum = generatedPokemonNumbers[questionNum][generatedAnswerKey[questionNum] - 1];
            setTimeout(() => {
                stage = "question";
            }, 1000);
        } else {
            setTimeout(() => {
                stage = "results";
            }, 1000);
        }
    }
</script>

<div class="question-number-container">
    Question: {questionNum + 1}
</div>
<div class="score-container">
    Your score is {score}
</div>

{#if stage === "start"}

    <button on:click={() => stage = "question"}>START</button>

{:else if stage === "question"}

    <div class="question-container">
        <div class="card-container">
            <Card cardIndex={1} cardNum={generatedPokemonNumbers[questionNum][0]} {handleSelectCard}/>
            <Card cardIndex={2} cardNum={generatedPokemonNumbers[questionNum][1]} {handleSelectCard}/>
            <Card cardIndex={3} cardNum={generatedPokemonNumbers[questionNum][2]} {handleSelectCard}/>
        </div>
        
        <div class="cry-button-container">
            <CryButton cryNum={cryNum}/>
        </div>
    </div>

{:else if stage === "response"}

    <div class="response-container">
        <Response response={response}/>
    </div>

{:else if stage === "results"}

    <p>RESULTS</p>

{/if}

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

    .response-container {
        width: 100%;
        display: flex;
        justify-content: center;
    }
</style>

