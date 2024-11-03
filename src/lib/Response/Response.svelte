<script lang="ts">
  import { afterUpdate } from "svelte";
  import type { difficulties } from "../../types";
  import Card from "../Card/Card.svelte";

    export let response: "correct" | "incorrect" = "correct";
    export let gameDifficulty: difficulties;
    export let pokemonNum: number;
    let isImageLoading = true;
    let pokemonName = "";
    let spriteURL = "";
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
    <p>{RESPONSE_ICON[response]} {RESPONSE_TEXT[response][Math.floor(Math.random() * 4)]}</p>
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