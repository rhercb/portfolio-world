import { create, SetState } from "zustand";

import { getInitialState, WordleAction, WordleState } from "@layouts/Wordle/Store/utils";
import { devtools } from "zustand/middleware";

const useStore = create<WordleState & WordleAction>(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    devtools((set: SetState<WordleAction & WordleState>) => ({
        ...getInitialState(),
        setCurrentActiveRow: (number) => set(() => ({ currentActiveRow: number })),
        setCurrentLetter: (number) => set(() => ({ currentLetter: number })),
        setAddLettersToGameState: (newState) =>
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            set((state) => {
                const gameState = [...state.gameState];
                const currentActiveRow = state.currentActiveRow;
                const currentLetter = state.currentLetter;
                gameState[currentActiveRow][currentLetter] = newState;

                return { gameState };
            }),
        setRemoveLettersFromGame: (emptyState) =>
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            set((state) => {
                const gameState = [...state.gameState];
                const currentActiveRow = state.currentActiveRow;
                const currentLetter = state.currentLetter;

                gameState[currentActiveRow][currentLetter - 1] = emptyState;

                return { gameState };
            }),
        setEnteredRowLetters: (row) =>
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            set((state) => {
                const gameState = [...state.gameState];
                const currentActiveRow = state.currentActiveRow;

                gameState[currentActiveRow] = row;

                return { gameState };
            }),
        setCorrectLetters: (letters) =>
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            set((state) => {
                const correctLetters = [...state.correctLetters];

                letters.forEach((letter) => {
                    if (!correctLetters.includes(letter)) {
                        correctLetters.push(letter);
                    }
                });

                return { correctLetters };
            }),
        setUsedLetters: (letters) =>
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            set((state) => {
                const usedLetters = [...state.usedLetters];

                letters.forEach((letter) => {
                    if (!usedLetters.includes(letter)) {
                        usedLetters.push(letter);
                    }
                });

                return { usedLetters };
            }),
        setGameFinished: (val) => set(() => ({ gameFinished: val })),
        setGameFinishedState: (val) => set(() => ({ gameFinishedState: val })),
        setShakeState: (val) => set(() => ({ shakeState: val })),
        resetGame: () => {
            set(getInitialState());
        },
    }))
);

export default useStore;
