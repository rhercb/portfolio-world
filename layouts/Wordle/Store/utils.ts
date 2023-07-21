import { TileStatusEnum } from "@shared/wordle";

export type GameTile = { letter: string; status: TileStatusEnum };
export type GameTileRow = [GameTile, GameTile, GameTile, GameTile, GameTile];
export type GameState = [GameTileRow, GameTileRow, GameTileRow, GameTileRow, GameTileRow, GameTileRow];

export enum GameFinishState {
    "WON" = 1,
    "LOST" = -1,
}

export const maxLetterCount = 5;
export const maxRowCount = 6;

const initialGameState = (): GameState => {
    return [...Array(maxRowCount)].map(() =>
        Array(maxLetterCount).fill({ letter: "", status: TileStatusEnum.NEUTRAL })
    ) as GameState;
};

export const getInitialState = (): WordleState => ({
    usedLetters: [],
    correctLetters: [],
    maxLetterCount: maxLetterCount,
    maxRowCount: maxRowCount,
    currentActiveRow: 0,
    currentLetter: 0,
    gameState: initialGameState(),
    gameFinished: false,
    gameFinishedState: undefined,
    shakeState: false,
});

export type WordleState = {
    maxLetterCount: number;
    maxRowCount: number;
    correctLetters: string[];
    usedLetters: string[];
    currentActiveRow: number;
    gameState: GameState;
    currentLetter: number;
    gameFinished: boolean;
    gameFinishedState: GameFinishState | undefined;
    shakeState: boolean;
};

export type WordleAction = {
    setCurrentActiveRow: (number: WordleState["currentActiveRow"]) => void;
    setAddLettersToGameState: ({ letter, status }: { letter: string; status: TileStatusEnum }) => void;
    setCurrentLetter: (number: WordleState["currentLetter"]) => void;
    setRemoveLettersFromGame: ({ letter, status }: { letter: string; status: TileStatusEnum }) => void;
    setEnteredRowLetters: (row: GameTileRow) => void;
    setCorrectLetters: (letters: WordleState["correctLetters"]) => void;
    setUsedLetters: (letters: WordleState["usedLetters"]) => void;
    setGameFinished: (val: boolean) => void;
    setGameFinishedState: (val: GameFinishState) => void;
    resetGame: () => void;
    setShakeState: (val: boolean) => void;
};

export const allowedLetter = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
];

export const firstKeyboardRow = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"];

export const secondKeyboardRow = ["a", "s", "d", "f", "g", "h", "j", "k", "l"];

export const thirdKeyboardRow = ["z", "x", "c", "v", "b", "n", "m"];
