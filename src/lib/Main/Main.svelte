<script lang="ts">
    import Card from "../Card/Card.svelte";
    import { POKEMON_TOTAL } from "../../common/constants";
    import CryButton from "../CryButton/CryButton.svelte";
    import { answerKeyStore, pokemonNumberStore, questionIndexStore, scoreCounterStore } from "../../common/store";
    import Response from "../Response/Response.svelte";
    import Start from "../Start/Start.svelte";
    
    // STORE VALUES
    let questionIndex = 0;
    const unsubscribeQuestionNum = questionIndexStore.subscribe((value => questionIndex = value));
    let score = 0;
    const unsubscribeScore = scoreCounterStore.subscribe((value => score = value));
    let generatedPokemonNumbers: number[][] = [];
    const unsubscribePokemonNumbers = pokemonNumberStore.subscribe((value => generatedPokemonNumbers = value));
    let generatedAnswerKey: number[] = [];
    const unsubscribeAnswerKey = answerKeyStore.subscribe((value => generatedAnswerKey = value));

    // UI CONTROLS
    let cryNum = generatedPokemonNumbers[0][generatedAnswerKey[0] - 1];
    let stage: "start" | "question" | "response" | "results" = "start";
    let gameDifficulty: "easy" | "medium" | "hard";
    let response: "correct" | "incorrect";
    
    const handleSelectCard = (selectedIndex: number) => {
        if (selectedIndex === generatedAnswerKey[questionIndex]) {
            scoreCounterStore.update((value => value += 1));
            response = "correct";
        } else {
            response = "incorrect";
        };

        stage = "response";
        if (questionIndex < 9) {
            setTimeout(() => {
                questionIndexStore.update((value => value += 1));
                cryNum = generatedPokemonNumbers[questionIndex][generatedAnswerKey[questionIndex] - 1];
                stage = "question";
            }, 1000);
        } else {
            setTimeout(() => {
                stage = "results";
            }, 1000);
        }
    }

    const startGame = () => stage = "question";
    const updateDifficulty = (difficulty: "easy" | "medium" | "hard") => {
        gameDifficulty = difficulty;
        console.log("UPDATED DIFFICULTY", difficulty);
    };
</script>

{#if stage === "start"}

    <div class="start-container">
        <Start startGame={startGame} updateDifficulty={updateDifficulty} gameDifficulty={gameDifficulty}></Start>
    </div>

{:else if stage === "question"}

    <div class="question-number-container">
        Question: <span class="integer">{questionIndex + 1}</span>
    </div>

    <div class="score-container">
        Score: <span class="integer">{score} / 10</span>
    </div>

    <div class="question-container">
        <div class="card-container">
            <Card cardIndex={1} cardNum={generatedPokemonNumbers[questionIndex][0]} {handleSelectCard}/>
            <Card cardIndex={2} cardNum={generatedPokemonNumbers[questionIndex][1]} {handleSelectCard}/>
            <Card cardIndex={3} cardNum={generatedPokemonNumbers[questionIndex][2]} {handleSelectCard}/>
        </div>
        
        <div class="cry-button-container">
            <CryButton cryNum={cryNum}/>
        </div>
    </div>

{:else if stage === "response"}

    <div class="question-number-container">
        Question: <span class="integer">{questionIndex + 1}</span>
    </div>

    <div class="score-container">
        Score: <span class="integer">{score} / 10</span>
    </div>

    <div class="response-container">
        <Response response={response}/>
    </div>

{:else if stage === "results"}

    <p>RESULTS</p>

{/if}

<style>
    .question-number-container {
        padding: 10px;
        position: absolute;
        top: 2rem;
        left: 2rem;
    }

    .score-container {
        /* border: red solid 5px;
        border-radius: 16px; */
        padding: 10px;
        position: absolute;
        top: 2rem;
        right: 2rem;
    }

    .start-container {
        display: flex;
        justify-content: center;
        text-align: center;
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

    .integer {
        font-size: 2rem;
    }
</style>

