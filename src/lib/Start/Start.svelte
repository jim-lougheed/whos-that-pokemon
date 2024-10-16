<script lang="ts">
    export let startGame: () => {};

</script>
<div>
    <p>Prove your worth as a Pokémon Master by identifying all 1025 Pokémon by sound.</p>
    <h2>Select a difficulty</h2>

    <div class="input-container">
        <input type="radio" id="easy" name="difficulty" value="easy" checked />
        <!-- <img aria-hidden="true" src="../../src/assets/images/pokeball-icon.png" /> -->
        <label for="easy">EASY</label>
        <input type="radio" id="medium" name="difficulty" value="medium" />
        <!-- <img aria-hidden="true" src="../../src/assets/images/pokeball-icon.png" /> -->
        <label for="medium">MEDIUM</label>
        <input type="radio" id="hard" name="difficulty" value="hard" checked />
        <!-- <img aria-hidden="true" src="../../src/assets/images/pokeball-icon.png" /> -->
        <label for="hard">HARD</label>
    </div>

    <button on:click={() => startGame()}>START</button>
</div>

<style>
    .input-container input {
        position: absolute;
        width: 1px;
        height: 1px;
        opacity: 0;
    }

    .input-container label {
        background: url("../../assets/images/pokeball-icon.png") no-repeat 10% 50%;
        background-size: 30px 30px;
        background-blend-mode: luminosity;
        padding: 2rem 20px 2rem 50px;
        border: 1px red solid;
        border-radius: 5px;
    }

    .input-container input:checked + label {
        background: url("../../assets/images/pokeball-icon.png") no-repeat 10% 50%;
        background-size: 30px 30px;
        background-color: red;
        padding: 2rem 20px 2rem 50px;
        border: 1px red solid;
        border-radius: 5px;
    }

    .input-container label:hover {
        background-color: red;
        cursor: pointer;
    }
</style>