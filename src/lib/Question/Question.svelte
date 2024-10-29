<script lang="ts">
  import type { difficulties } from "../../types";
  import Card from "../Card/Card.svelte";
  import CryButton from "../CryButton/CryButton.svelte";
  import Input from "../Input/Input.svelte";

    export let gameDifficulty: difficulties;
    export let handleGuess: (guess: string, pokemonName: string) => void;
    export let cryNum: number;
    export let pokemonNums: number[];
    export let handleSelectCard;
    export let stage;

</script>

{#if gameDifficulty !== "hard"}

    <div class="card-container" >
        <Card cardIndex={1} cardNum={pokemonNums[0]} {handleSelectCard} gameDifficulty={gameDifficulty} questionOrResponse={"question"}/>
        <Card cardIndex={2} cardNum={pokemonNums[1]} {handleSelectCard} gameDifficulty={gameDifficulty} questionOrResponse={"question"}/>
        <Card cardIndex={3} cardNum={pokemonNums[2]} {handleSelectCard} gameDifficulty={gameDifficulty} questionOrResponse={"question"}/>
    </div>

{:else}
            
    <div class="input-container">
        <Input handleGuess={handleGuess} pokemonNum={cryNum}/>
    </div>
        
{/if}

<div class="cry-button-container">
    <CryButton cryNum={cryNum}/>
</div>

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
</style>