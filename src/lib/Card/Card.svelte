<script lang="ts">
  import { afterUpdate } from "svelte";

    export let cardIndex: number;
    export let cardNum: number;
    export let handleSelectCard;
    export let gameDifficulty;
    let sprite: HTMLImageElement;
    $: medium_difficulty = gameDifficulty === "medium" ? "medium-difficulty" : "";

    const handleCardClick = () => {
        handleSelectCard(cardIndex);
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
                if (gameDifficulty === "easy") {
                    spriteURL = json.sprites.front_default;
                } else if (gameDifficulty === "medium") {
                    spriteURL = json.sprites.front_default;
                }
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
        <p>{cardIndex}</p>
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

