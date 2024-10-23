<script lang="ts">
  import { afterUpdate } from "svelte";

    export let cardIndex: number;
    export let cardNum: number;
    export let handleSelectCard;

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
                spriteURL = json.sprites.front_default;
                pokemonName = json.name;
            }).then(() => {
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
        <img alt={pokemonName + " sprite"} src={imagesLoading ? "../../src/assets/images/pokeball-icon.png" : spriteURL } />
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

