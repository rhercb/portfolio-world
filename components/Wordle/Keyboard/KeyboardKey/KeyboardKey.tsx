import classNames from "classnames";
import React from "react";

import { KeyBoardKeyStatusEnum } from "@shared/wordle";
import { FaBackspace } from "react-icons/fa";

import styles from "./KeyboarrdKey.module.scss";

interface KeyboardKeyProps {
    keyString: string;
    status: KeyBoardKeyStatusEnum;
}

const KeyboardKey: React.FC<KeyboardKeyProps> = ({ keyString, status }) => {
    const onClick = (): void => {
        const keyEvent = new KeyboardEvent("keydown", { key: keyString });
        document.dispatchEvent(keyEvent);
    };

    return (
        <div
            onClick={() => onClick()}
            className={classNames(styles.Key, {
                [styles.correct]: status === KeyBoardKeyStatusEnum.CORRECT,
                [styles.used]: status === KeyBoardKeyStatusEnum.USED,
            })}
        >
            {keyString}
        </div>
    );
};

const EnterKey: React.FC = () => {
    const onClick = (): void => {
        const keyEvent = new KeyboardEvent("keydown", { key: "Enter" });
        document.dispatchEvent(keyEvent);
    };

    return (
        <div onClick={() => onClick()} className={classNames(styles.Key)}>
            ↵
        </div>
    );
};

const BackKey: React.FC = () => {
    const onClick = (): void => {
        const keyEvent = new KeyboardEvent("keydown", { key: "Backspace" });
        document.dispatchEvent(keyEvent);
    };

    return (
        <div onClick={() => onClick()} className={classNames(styles.Key)}>
            <FaBackspace size={16} />
        </div>
    );
};

export { KeyboardKey, EnterKey, BackKey };
