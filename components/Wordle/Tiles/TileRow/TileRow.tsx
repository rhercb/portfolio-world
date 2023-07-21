import React from "react";

import styles from "./TileRow.module.scss";

interface TileRowProps {
    children: React.ReactNode;
}

const TileRow: React.FC<TileRowProps> = ({ children }) => {
    return <div className={styles.row}>{children}</div>;
};

export default TileRow;
