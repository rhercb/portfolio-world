"use client";
import React from "react";

import GameEndModal from "@layouts/Wordle/GameEndModal";
import Header from "@layouts/Wordle/Header";
import KeyboardLayout from "@layouts/Wordle/KeyboardLayout";
import useStore from "@layouts/Wordle/Store/store";
import { useGameLogic } from "@layouts/Wordle/Store/useGameLogic";
import TileLayout from "@layouts/Wordle/TileLayout";

interface WordleGameProps {
    word: string;
}

const WordleGame: React.FC<WordleGameProps> = ({ word }) => {
    const gameFinished = useStore((store) => store.gameFinished);
    useGameLogic({ word });

    return (
        <div>
            <Header />
            <div className="max-w-[500px] w-full mx-auto mt-[32px]">
                <TileLayout />
                <KeyboardLayout />
            </div>
            <GameEndModal show={gameFinished} word={word} />
        </div>
    );
};

export default WordleGame;
