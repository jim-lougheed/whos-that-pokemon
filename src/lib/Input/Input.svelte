<script lang="ts">
    export let handleGuess: (guess: string) => void;
    let inputEl: HTMLInputElement;
</script>

<input type="text" bind:this={inputEl} />
<button on:click={() => handleGuess(inputEl.value)}>Guess</button>

<style>
    input {
        margin: 30px 0;
        font-size: 2rem;
    }
</style>