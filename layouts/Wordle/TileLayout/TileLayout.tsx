import React from "react";

import useStore from "@layouts/Wordle/Store/store";
import { Tile, TileRow } from "@Wordle/Tiles";

import styles from "./TileLayout.module.scss";

const TileLayout: React.FC = () => {
    const gameState = useStore((store) => store.gameState);
    const shakeState = useStore((store) => store.shakeState);
    const currentActiveRow = useStore((store) => store.currentActiveRow);

    return (
        <div className={styles.wrapper}>
            <div className={styles.tiles}>
                {gameState.map((gameRow, idx) => (
                    <TileRow key={idx}>
                        {gameRow.map((gameTile, idx2) => (
                            <Tile
                                key={idx2}
                                letter={gameTile.letter}
                                status={gameTile.status}
                                shakeState={shakeState && currentActiveRow === idx}
                            />
                        ))}
                    </TileRow>
                ))}
            </div>
        </div>
    );
};

export default TileLayout;
