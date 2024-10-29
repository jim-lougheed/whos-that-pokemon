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

    const getSprite = (cardNum: number) => {
        fetch(`http://localhost:8080/pokemonPic/${cardNum}`).then((res) => {
                return res.json();
            }).then((json) => {
                console.log("JSON", json);
                pokemonName = json.name;
                spriteURL = json.sprites.front_default;
                isImageLoading = false;
            });
    }

    afterUpdate(() => {
        if (gameDifficulty === "hard") {
            getSprite(pokemonNum);
        } else {
            isImageLoading = false;
        }
    })
</script>

{#if isImageLoading}
    
    <p>LOADING</p>

{:else}

    <!-- {#if gameDifficulty === "hard"} -->

        <p>{pokemonName.toUpperCase()}</p>
        <Card cardNum={pokemonNum} questionOrResponse={"response"}/>

    <!-- {/if} -->
    <div class="response-background {correct_class}">
        <p>{RESPONSE_ICON[response]} {RESPONSE_TEXT[response][Math.floor(Math.random() * 4)]}</p>
    </div>

{/if}

<style>
    .response-background {
        margin-top: 100px;
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