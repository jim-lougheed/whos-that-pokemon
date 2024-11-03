<script lang="ts">
    export let pokemonNum: number;
    export let handleGuess: (guess: string, pokemonName: string) => void;
    let pokemonName: string;
    let inputEl: HTMLInputElement;
    let isLoadingName = true;
    fetch(`http://localhost:8080/pokemonPic/${pokemonNum}`).then((res) => {
                return res.json();
            }).then((json) => {
                pokemonName = json.name;
                isLoadingName = false;
            });
</script>

{#if isLoadingName}
<p>LOADING</p>

{:else}

<input type="text" bind:this={inputEl} />
<button on:click={() => handleGuess(inputEl.value, pokemonName)}>Guess</button>

{/if}

<style>
    input {
        margin: 30px 0;
        font-size: 2rem;
    }
</style>