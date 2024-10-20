<script lang="ts">
    export let restartGame: () => {};
</script>

<div>
    <p class="results-sub-header">Let's look at your results.</p>
    
    <div class="score-container">
        <h2>Your score</h2>
        <p class="score-percentage">70%</p>
        <p class="score-fraction">7/10</p>
    </div>

    <div class="rank-container">
        <h3>Your rank</h3>
        <p class="rank">Ultra Trainer</p>
    </div>

    <button class="restart-button" on:click={() => restartGame()}>RESTART</button>
</div>

<style>
    .results-sub-header {
        padding: 0 1rem;
    }

    .score-percentage {
        font-size: 100px;
        margin: 0;
        line-height: 1;
    }

    .score-container, .rank-container {
        margin: 40px 0;
    }

    .score-fraction {
        font-size: 36px;
        margin-top: 10px;
    }

    .rank {
        font-size: 2.5rem;
        margin: 0;
    }

    .restart-button {
        font-size: 2rem;
    }
</style>