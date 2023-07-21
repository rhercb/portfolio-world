import { motion } from "framer-motion";
import React from "react";

import classes from "./Backdrop.module.scss";

interface BackdropProps {
    children?: string | undefined | JSX.Element | React.ReactNode | React.ReactNode[];
    dismissHandler: () => void;
}

const Backdrop: React.FC<BackdropProps> = ({ children, dismissHandler }) => {
    return (
        <motion.div
            onClick={dismissHandler}
            className={classes.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            {children && children}
        </motion.div>
    );
};

export default Backdrop;
