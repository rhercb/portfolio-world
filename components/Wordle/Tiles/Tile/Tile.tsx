import classNames from "classnames";
import React from "react";

import { TileStatusEnum } from "@shared/wordle";

import styles from "./Tile.module.scss";

interface TileProps {
    letter?: string;
    status?: TileStatusEnum;
    shakeState?: boolean;
}

const Tile: React.FC<TileProps> = ({ status, letter = "", shakeState }) => {
    return (
        <div
            className={classNames(styles.tile, {
                [styles.withLetter]: letter?.length === 1,
                [styles.notInWord]: status === TileStatusEnum.NOTINWORD,
                [styles.inWord]: status === TileStatusEnum.INWORD,
                [styles.correct]: status === TileStatusEnum.CORRECT,
                [styles.shake]: shakeState,
            })}
        >
            {letter}
        </div>
    );
};

export default Tile;
