<script lang="ts">
    export let response: "correct" | "incorrect" = "correct";
    $: correct_class = response === "correct" ? "correct" : "incorrect";

    const RESPONSE_TEXT = {
        "correct": ["Right!", "You got it!", "Nice!", "Good job!"],
        "incorrect": ["Nope", "Not quite", "Too bad", "Wrong"]
    }

    const RESPONSE_ICON = {
        "correct": "✓",
        "incorrect": "✗"
    }
</script>

<div class="response-background {correct_class}">
    <p>{RESPONSE_ICON[response]} {RESPONSE_TEXT[response][0]}</p>
</div>

<style>
    .response-background {
        width: 500px;
        height: 100px;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 2rem;
        border-radius: 10px;
    }

    .correct {
        background-color: green;
    }

    .incorrect {
        background-color: red;
    }
</style>