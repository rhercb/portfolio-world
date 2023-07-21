import React from "react";

interface KeyboardRowProps {
    children: React.ReactNode;
}

const KeyboardRow: React.FC<KeyboardRowProps> = ({ children }) => {
    return <div className="flex w-full mb-[8px] mx-auto justify-center">{children}</div>;
};

export default KeyboardRow;
