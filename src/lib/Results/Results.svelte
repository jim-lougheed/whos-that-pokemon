<script lang="ts">
    const restartGame = () => {
        console.log("RESTART GAME");
    }
</script>

<div>
    <p class="results-sub-header">Let's look at your results.</p>
    <h2>Your score</h2>
    <p>70%</p>
    <p>7/10</p>

    <h3>Your rank</h3>
    <p>Ultra Trainer</p>

    <button class="restart-button" on:click={() => restartGame()}>RESTART</button>
</div>