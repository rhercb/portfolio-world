"use client";

import React from "react";

import ProjectsHeader from "@components/ProjectsHeader";
import useStore from "@layouts/Wordle/Store/store";
import { useRouter } from "next/navigation";

import styles from "./Header.module.scss";

const Header: React.FC = () => {
    const router = useRouter();
    const gameFinished = useStore((store) => store.gameFinished);
    const resetGame = useStore((store) => store.resetGame);

    return (
        <ProjectsHeader githubLink="/test">
            <button
                className={styles.btn}
                onClick={() => {
                    resetGame();
                    router.refresh();
                }}
                disabled={!gameFinished}
            >
                Play again!
            </button>
        </ProjectsHeader>
    );
};

export default Header;
