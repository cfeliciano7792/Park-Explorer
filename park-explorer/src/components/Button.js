import React from "react";

const Button = ({getRandomParkCode}) => {

    return (
        <button onClick={getRandomParkCode}>Surprise Me</button>
    )
}

export default Button