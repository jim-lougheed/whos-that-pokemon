<script lang="ts">
    export let cardIndex: number;
    export let cardNum: number;

    let spriteURL = "";

    fetch(`http://localhost:8080/pokemonPic/${cardNum}`).then((res) => {
        return res.json();
    }).then((json) => {
        spriteURL = json.sprites.front_default;
    })
</script>

<div class="card">
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

