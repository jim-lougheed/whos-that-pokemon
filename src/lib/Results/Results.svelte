<script lang="ts">
    export let restartGame: () => void;
    export let score: number;
    let scorePercentage = (score / 10) * 100;
    let ranking = scorePercentage >= 90 ? "Master" 
        : scorePercentage >= 70 ? "Ultra"
        : scorePercentage >= 50 ? "Great"
        : "Pokémon";
</script>

<div>
    <p class="results-sub-header">Let's look at your results.</p>
    
    <div class="score-container">
        <h2>Your score</h2>
        <p class="score-percentage">{scorePercentage}%</p>
        <p class="score-fraction">{score}/10</p>
    </div>

    <div class="rank-container">
        <h3>Your rank</h3>
        <p class="rank">{ranking} Trainer</p>
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