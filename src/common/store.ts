import { writable } from "svelte/store";

export const questionCounterStore = writable(1);
export const scoreCounterStore = writable(0);
