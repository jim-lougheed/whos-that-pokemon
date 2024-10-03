<script lang="ts">
    let score = 0;
    const incrementScore = () => {
        score += 1
    }
</script>

<button on:click={incrementScore}>
    Your score is {score}
</button>