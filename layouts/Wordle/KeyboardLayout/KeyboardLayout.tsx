import React from "react";

import useStore from "@layouts/Wordle/Store/store";
import { firstKeyboardRow, secondKeyboardRow, thirdKeyboardRow } from "@layouts/Wordle/Store/utils";
import { KeyBoardKeyStatusEnum } from "@shared/wordle";
import { KeyboardKey, KeyboardRow, EnterKey, BackKey } from "@Wordle/Keyboard";

const KeyboardLayout: React.FC = () => {
    const usedLetters = useStore((store) => store.usedLetters);
    const correctLetters = useStore((store) => store.correctLetters);

    const checkKeyboardKeyStatus = (key: string, used: string[], correct: string[]): KeyBoardKeyStatusEnum => {
        if (used.includes(key) && !correct.includes(key)) {
            return KeyBoardKeyStatusEnum.USED;
        } else if (correct.includes(key)) {
            return KeyBoardKeyStatusEnum.CORRECT;
        } else {
            return KeyBoardKeyStatusEnum.NEUTRAL;
        }
    };

    return (
        <div className="mx-[8px]">
            <KeyboardRow>
                {firstKeyboardRow.map((keyString) => (
                    <KeyboardKey
                        key={keyString}
                        keyString={keyString}
                        status={checkKeyboardKeyStatus(keyString, usedLetters, correctLetters)}
                    />
                ))}
            </KeyboardRow>
            <KeyboardRow>
                <div className="w-[8px]" />
                {secondKeyboardRow.map((keyString) => (
                    <KeyboardKey
                        key={keyString}
                        keyString={keyString}
                        status={checkKeyboardKeyStatus(keyString, usedLetters, correctLetters)}
                    />
                ))}
                <div className="w-[8px]" />
            </KeyboardRow>
            <KeyboardRow>
                <EnterKey />
                {thirdKeyboardRow.map((keyString) => (
                    <KeyboardKey
                        key={keyString}
                        keyString={keyString}
                        status={checkKeyboardKeyStatus(keyString, usedLetters, correctLetters)}
                    />
                ))}
                <BackKey />
            </KeyboardRow>
        </div>
    );
};

export default KeyboardLayout;
