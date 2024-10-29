<script lang="ts">
  import { afterUpdate } from "svelte";

    export let cardIndex: number | undefined = undefined;
    export let cardNum: number;
    export let handleSelectCard: Function | undefined = undefined;
    export let gameDifficulty: string | undefined = undefined;
    export let questionOrResponse: "question" | "response";
    let sprite: HTMLImageElement;
    $: medium_difficulty = gameDifficulty === "medium" ? "medium-difficulty" : "";

    const handleCardClick = () => {
        handleSelectCard && handleSelectCard(cardIndex);
    }

    let spriteURL = "";
    let pokemonName = "";
    let imagesLoading = true;
    
    const getSprite = (cardNum: number) => {
        fetch(`http://localhost:8080/pokemonPic/${cardNum}`).then((res) => {
                return res.json();
            }).then((json) => {
                console.log("JSON", json);
                pokemonName = json.name;
                if (questionOrResponse === "question" && gameDifficulty === "medium") {
                    spriteURL = json.sprites.front_default;
                } else {
                    spriteURL = json.sprites.front_default;
                }
                console.log("REACHING HERE", spriteURL, json);
            }).then(() => {
                if (gameDifficulty === "medium") {
                    sprite.style.filter = "brightness(0)";
                }
                imagesLoading = false;
            });
    }

    afterUpdate(() => {
        getSprite(cardNum);
    })
    
    getSprite(cardNum);
</script>

<div>
    <button class="card" on:click={() => handleCardClick()}>
        {#if cardIndex}
            
            <p>{cardIndex}</p>

        {/if}
        <img alt={pokemonName + " sprite"} bind:this={sprite} class={medium_difficulty} src={imagesLoading ? "../../src/assets/images/pokeball-icon.png" : spriteURL} />
    </button>
</div>


<style>
    .card {
        padding: 50px;
        border: white 1px solid;
    }

    .card img {
        width: 150px;
    }
</style>

