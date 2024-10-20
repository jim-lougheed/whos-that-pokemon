<script lang="ts">
  import type { difficulties } from "../../types";

    export let startGame: () => {};
    export let updateDifficulty: (difficulty: difficulties) => void;
    export let gameDifficulty;
    const difficulties: difficulties[]  = ["easy", "medium", "hard"];
</script>
<div>
    <p class="start-sub-header">Prove your worth as a Pokémon Master by identifying all 1025 Pokémon by sound.</p>
    <h2>Select a difficulty</h2>

    <div class="input-container">
        {#each difficulties as difficulty}
            <input type="radio" id="easy" name="difficulty" value={difficulty} on:change={(e) => updateDifficulty(difficulty)}/>
            <label for={difficulty}>{difficulty.toUpperCase()}</label>
        {/each}
    </div>

    <button class="start-button" on:click={() => startGame()} disabled={!gameDifficulty}>START</button>
</div>

<style>
    .start-sub-header {
        padding: 0 1rem;
    }

    .input-container {
        display: flex;
        margin: 40px;
        justify-content: space-between;
    }

    @media screen and (max-width: 500px) {
        .input-container {
            flex-direction: column;
            gap: 20px;
        }
    }

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
        font-size: 1.5rem;
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

    .start-button {
        font-size: 2rem;
    }
</style>