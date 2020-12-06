import React from "react";
import { lightBeige } from "../../utils";

export default () => {
    return (
        <div
            style={{
                width: "100vw",
                height: window.innerHeight,
                background: lightBeige,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            hello
        </div>
    );
};
