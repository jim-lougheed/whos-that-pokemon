<script lang="ts">
  import { afterUpdate } from "svelte";

    export let cardIndex: number | undefined = undefined;
    export let cardNum: number;
    export let handleSelectCard: Function | undefined = undefined;
    export let gameDifficulty: string | undefined = undefined;
    export let stage;
    export let cryNum: number;
    let sprite: HTMLImageElement;
    $: response_background = stage === "response" ? "response-background" : "";
    $: correct_response = cardNum === cryNum ? "correct-response" : "";
    $: medium_difficulty = !imagesLoading && stage === "question" && (gameDifficulty === "medium") ? "medium-difficulty" : "";

    const handleCardClick = () => {
        console.log("HANDLING");
        handleSelectCard && handleSelectCard(cardIndex);
    }

    let spriteURL = "";
    let pokemonName = "";
    let imagesLoading = true;
    
    const getSprite = (cardNum: number) => {
        // imagesLoading = true;
        fetch(`http://localhost:8080/pokemonPic/${cardNum}`).then((res) => {
                return res.json();
            }).then((json) => {
                pokemonName = json.name;
                spriteURL = json.sprites.front_default;
                imagesLoading = false;
            });
    }

    afterUpdate(() => {
        // imagesLoading = true;
        getSprite(cardNum);
    })
    
    getSprite(cardNum);
</script>

<div class="card {response_background} {correct_response}">
    <button on:click={() => handleCardClick()}>
        
        {#if cardIndex}
            
            <p>{cardIndex}</p>

        {/if}
        
        <img alt={pokemonName + " sprite"} bind:this={sprite} src={imagesLoading ? "../../src/assets/images/pokeball-icon.png" : spriteURL} class={medium_difficulty}/>
    </button>
</div>


<style>
    .card button {
        padding: 50px;
        border: white 1px solid;
        background-color: inherit;
    }

    .card img {
        width: 150px;
    }

    .response-background {
        background-color: red;
    }

    .response-background.correct-response {
        background-color: green;
    }

    .medium-difficulty {
        filter: brightness(0);
    }
</style>

