<script lang="ts">
  import { afterUpdate } from "svelte";

    export let cardIndex: number;
    export let cardNum: number;
    export let handleSelectCard;

    const handeCardClick = () => {
        handleSelectCard(cardIndex);
    }

    let spriteURL = "";
    
    const getSprite = (cardNum: number) => {
        fetch(`http://localhost:8080/pokemonPic/${cardNum}`).then((res) => {
                return res.json();
            }).then((json) => {
                spriteURL = json.sprites.front_default;
            });
    }

    afterUpdate(() => {
        getSprite(cardNum);
    })
    
    getSprite(cardNum);
</script>

<div class="card" on:click={() => handeCardClick()}>
    <p>{cardIndex}</p>
    <img alt="pokemon sprite" src={spriteURL} />
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

