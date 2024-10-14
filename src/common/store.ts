import { readable, writable } from "svelte/store";
import { POKEMON_TOTAL } from "./constants";

const getRandomPokemonNumbers = (numRounds: number) => {
    const maxNumber = POKEMON_TOTAL;
    const randomNumbersArray: number[][] = [];

    for (let i = 0; i < numRounds; i++) {
        const roundArray: number[] = [];
        for (let j = 0; j < 3; j++) {
            let randomInt = Math.floor(Math.random() * (maxNumber));
            while (roundArray.includes(randomInt)) {
                randomInt = Math.floor(Math.random() * (maxNumber));
            }
            roundArray.push(randomInt);
        }
        randomNumbersArray.push(roundArray);
    }
    console.log("HERE", randomNumbersArray);
    return randomNumbersArray;
}

const getAnswerKey = (numRounds: number) => {
    const answerKey: number[] = [];
    for (let i = 0; i < numRounds; i++) {
        answerKey.push(Math.floor(Math.random() * 3) + 1);
    }
    return answerKey;
}

// Score and question number
export const questionCounterStore = writable(1);
export const scoreCounterStore = writable(0);

// Randomly generated options and answers;
export const pokemonNumberStore = readable(getRandomPokemonNumbers(10));
export const answerKeyStore = readable(getAnswerKey(10));
