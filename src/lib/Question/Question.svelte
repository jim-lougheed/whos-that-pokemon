<script lang="ts">
  import type { difficulties } from "../../types";
  import Card from "../Card/Card.svelte";
  import CryButton from "../CryButton/CryButton.svelte";
  import Input from "../Input/Input.svelte";
  import Response from "../Response/Response.svelte";

    export let gameDifficulty: difficulties;
    export let handleGuess: (guess: string, pokemonName: string) => void;
    export let cryNum: number;
    export let pokemonNums: number[];
    export let handleSelectCard;
    export let stage;
    export let response;

</script>

{#if gameDifficulty !== "hard"}

    <div class="card-container" >
        <p>{cryNum}</p>
        <Card cardIndex={1} cardNum={pokemonNums[0]} {handleSelectCard} gameDifficulty={gameDifficulty} {stage} {cryNum}/>
        <Card cardIndex={2} cardNum={pokemonNums[1]} {handleSelectCard} gameDifficulty={gameDifficulty} {stage} {cryNum}/>
        <Card cardIndex={3} cardNum={pokemonNums[2]} {handleSelectCard} gameDifficulty={gameDifficulty} {stage} {cryNum}/>
    </div>

{:else}

    {#if stage === "question"}
            
        <div class="input-container">
            <Input handleGuess={handleGuess} pokemonNum={cryNum}/>
        </div>

    {:else if stage === "response"}
    
        <div class="card-container" >
            <Card cardNum={cryNum} {stage} {cryNum}/>
        </div>    

    {/if}
        
{/if}

{#if stage === "question"}

    <div class="cry-button-container">
        <CryButton cryNum={cryNum}/>
    </div>

{:else if stage === "response"}
    
    <div class="response-container">
        <Response response={response} gameDifficulty={gameDifficulty} pokemonNum={cryNum}/>
    </div>

{/if}

<style>
    .card-container{
        display: flex;
        justify-content: center;
        gap: 1rem;
    }

    .input-container {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1rem;
    }

    .cry-button-container {
        display: flex;
        justify-content: center;
    }

    .response-container {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
</style>