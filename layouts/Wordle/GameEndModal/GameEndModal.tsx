import classNames from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";

import Backdrop from "@layouts/Wordle/GameEndModal/Backdrop";
import styles from "@layouts/Wordle/Header/Header.module.scss";
import useStore from "@layouts/Wordle/Store/store";
import { GameFinishState } from "@layouts/Wordle/Store/utils";
import { useRouter } from "next/navigation";
import { FaWindowClose } from "react-icons/fa";

interface GameEndModalProps {
    show: boolean;
    word: string;
}

const GameEndModal: React.FC<GameEndModalProps> = ({ show, word }) => {
    const router = useRouter();
    const gameFinishedState = useStore((state) => state.gameFinishedState);
    const resetGame = useStore((store) => store.resetGame);

    const [showModal, setShowModal] = useState<boolean>(show);

    useEffect(() => {
        setShowModal(show);
    }, [show]);

    return (
        <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
            {showModal && (
                <Backdrop dismissHandler={() => setShowModal(false)}>
                    <motion.div
                        initial={{
                            opacity: 0,
                            scale: 0.75,
                        }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            transition: {
                                ease: "easeOut",
                                duration: 0.15,
                            },
                        }}
                        exit={{
                            opacity: 0,
                            scale: 0.75,
                            transition: {
                                ease: "easeIn",
                                duration: 0.15,
                            },
                        }}
                    >
                        <div className="p-[10px] w-[300px] border border-primary rounded-[20px] bg-gray-900 bg-opacity-80">
                            <FaWindowClose
                                size={20}
                                onClick={() => setShowModal(false)}
                                className="cursor-pointer ml-auto text-white"
                            />
                            <div className="py-20px text-center">
                                {gameFinishedState === GameFinishState.WON ? (
                                    <>
                                        <h3 className="text-white text-[26px] mb-[16px]">You Won!</h3>
                                        <p className="text-white text-[16px] mb-[24px]">
                                            Congratulations you won. You guessed the word correctly!
                                        </p>
                                        <h3 className="text-white text-[26px] uppercase mb-[32px]">{word}</h3>
                                    </>
                                ) : (
                                    <>
                                        <h3 className="text-white text-[26px] mb-[16px]">You lost!</h3>
                                        <p className="text-white text-[16px] mb-[24px]">
                                            You did not guess the word correctly. Word to guess was:
                                        </p>
                                        <h3 className="text-white text-[26px] uppercase mb-[32px]">{word}</h3>
                                    </>
                                )}
                            </div>
                            <button
                                className={classNames(styles.btn, "mx-auto")}
                                onClick={() => {
                                    resetGame();
                                    router.refresh();
                                }}
                            >
                                Play again!
                            </button>
                        </div>
                    </motion.div>
                </Backdrop>
            )}
        </AnimatePresence>
    );
};

export default GameEndModal;
