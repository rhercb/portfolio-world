"use client";
import { useEffect } from "react";

import useStore from "@layouts/Wordle/Store/store";
import { allowedLetter, GameFinishState, GameTile, GameTileRow } from "@layouts/Wordle/Store/utils";
import { TileStatusEnum } from "@shared/wordle";

interface useGameLogicProps {
    word: string;
}

export const useGameLogic = ({ word }: useGameLogicProps): void => {
    const currentLetter = useStore((store) => store.currentLetter);
    const setCurrentLetter = useStore((store) => store.setCurrentLetter);
    const gameState = useStore((store) => store.gameState);
    const setAddLettersToGameState = useStore((store) => store.setAddLettersToGameState);
    const maxLetterCount = useStore((store) => store.maxLetterCount);
    const maxRowCount = useStore((store) => store.maxRowCount);
    const currentActiveRow = useStore((store) => store.currentActiveRow);
    const setCurrentActiveRow = useStore((store) => store.setCurrentActiveRow);
    const setRemoveLettersFromGame = useStore((store) => store.setRemoveLettersFromGame);
    const setEnteredRowLetters = useStore((store) => store.setEnteredRowLetters);
    const setCorrectLetters = useStore((store) => store.setCorrectLetters);
    const setUsedLetters = useStore((store) => store.setUsedLetters);
    const gameFinished = useStore((store) => store.gameFinished);
    const setGameFinished = useStore((store) => store.setGameFinished);
    const setGameFinishedState = useStore((store) => store.setGameFinishedState);
    const setShakeState = useStore((store) => store.setShakeState);

    const checkIfGameIsOver = (gameRowResult: GameTileRow): void => {
        const isCurrentRowCorrect = gameRowResult
            .map((data) => data.status)
            .every((val) => val === TileStatusEnum.CORRECT);

        if (currentActiveRow + 1 === maxRowCount && !isCurrentRowCorrect) {
            setGameFinished(true);
            setGameFinishedState(GameFinishState.LOST);
            return;
        } else if (isCurrentRowCorrect) {
            setGameFinished(true);
            setGameFinishedState(GameFinishState.WON);
        } else {
            setCurrentLetter(0);
            setCurrentActiveRow(currentActiveRow + 1);
        }
    };

    const checkIfRowLettersAreInWord = (): void => {
        const rowEndResult: GameTile[] = [];
        const correctRowLetters: string[] = [];
        const usedRowLetters: string[] = [];
        const guessedLetters = gameState[currentActiveRow].map((row) => row.letter);
        const wordLetters = word.split("");

        guessedLetters.forEach((letter, idx) => {
            const wordContainsGuessedLetter = wordLetters.includes(letter);
            const wordIsInCorrectPlace = letter === wordLetters[idx];

            if (wordContainsGuessedLetter && !wordIsInCorrectPlace) {
                rowEndResult.push({ letter, status: TileStatusEnum.INWORD });
                usedRowLetters.push(letter);
            } else if (wordIsInCorrectPlace) {
                rowEndResult.push({ letter, status: TileStatusEnum.CORRECT });
                correctRowLetters.push(letter);
            } else {
                rowEndResult.push({ letter, status: TileStatusEnum.NOTINWORD });
                usedRowLetters.push(letter);
            }
        });

        setCorrectLetters(correctRowLetters);
        setUsedLetters(usedRowLetters);
        setEnteredRowLetters(rowEndResult as GameTileRow);

        checkIfGameIsOver(rowEndResult as GameTileRow);
    };

    const checkEnterClick = (): void => {
        if (currentLetter !== maxLetterCount) {
            setShakeState(true);
            setTimeout(() => setShakeState(false), 200);
            return;
        }

        checkIfRowLettersAreInWord();
    };

    const checkBackspaceClick = (): void => {
        setRemoveLettersFromGame({ letter: "", status: TileStatusEnum.NEUTRAL });
        setCurrentLetter(currentLetter - 1);
    };

    const checkLetterEntry = (key: string): void => {
        setAddLettersToGameState({ letter: key, status: TileStatusEnum.NEUTRAL });
        setCurrentLetter(currentLetter + 1);
    };

    const controlUserKeyboardInput = (e: KeyboardEvent): void => {
        const key = e.key;
        const isAllowedLetter = allowedLetter.includes(key);

        if (key === "Enter") {
            checkEnterClick();
        }

        if (!isAllowedLetter && currentLetter === 0) return;

        if (key === "Backspace") {
            checkBackspaceClick();
        }

        if (currentLetter === maxLetterCount) return;

        if (isAllowedLetter) {
            checkLetterEntry(key);
        }
    };

    useEffect(() => {
        if (!gameFinished) {
            document.addEventListener("keydown", controlUserKeyboardInput);
        }

        return () => {
            document.removeEventListener("keydown", controlUserKeyboardInput);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentLetter, gameFinished]);
};
