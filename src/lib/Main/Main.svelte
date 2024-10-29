<script lang="ts">
    import Card from "../Card/Card.svelte";
    import { POKEMON_TOTAL } from "../../common/constants";
    import CryButton from "../CryButton/CryButton.svelte";
    import { answerKeyStore, pokemonNumberStore, questionIndexStore, scoreCounterStore } from "../../common/store";
    import Response from "../Response/Response.svelte";
    import Start from "../Start/Start.svelte";
  import Results from "../Results/Results.svelte";
  import Input from "../Input/Input.svelte";
  import { levenshteinDistance } from "../../utils";
  import Question from "../Question/Question.svelte";
    
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

    const handleGuess = (guess: string, pokemonName: string) => {
        const guessDistance = levenshteinDistance(guess, pokemonName);
        console.log("GUESS: ", guess, guessDistance);
        if (guessDistance <= 3) {
            scoreCounterStore.update((value => value += 1));
            response = "correct";
        } else {
            response = "incorrect";
        }

        stage = "response";
        if (questionIndex < 9) {
            setTimeout(() => {
                questionIndexStore.update((value => value += 1));
                cryNum = generatedPokemonNumbers[questionIndex][generatedAnswerKey[questionIndex] - 1];
                stage = "question";
            }, 2000);
        } else {
            setTimeout(() => {
                stage = "results";
            }, 2000);
        }  
    }

    const startGame = () => stage = "question";
    const restartGame = () => {
        scoreCounterStore.set(0);
        questionIndexStore.set(0);
        stage = "start";
    };
    const updateDifficulty = (difficulty: "easy" | "medium" | "hard") => {
        console.log("HERE", difficulty);
        gameDifficulty = difficulty;
        console.log("UPDATED DIFFICULTY", difficulty);
    };
</script>

{#if stage === "start"}

    <div class="start-container">
        <Start startGame={startGame} updateDifficulty={updateDifficulty} gameDifficulty={gameDifficulty}></Start>
    </div>

{:else if stage === "results"}

    <div class="results-container">
        <Results restartGame={restartGame} score={score}></Results>
    </div>

{:else}

    <div class="question-number-container">
        Question: <span class="integer">{questionIndex + 1}</span>
    </div>

    <div class="score-container">
        Score: <span class="integer">{score} / 10</span>
    </div>

    <div class="question-container">
        <Question {gameDifficulty} {handleGuess} {cryNum} pokemonNums={generatedPokemonNumbers[questionIndex]} {handleSelectCard} {stage} {response}/>
    </div>

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

    .start-container, .results-container {
        display: flex;
        justify-content: center;
        text-align: center;
    }

    .integer {
        font-size: 2rem;
    }
</style>

