import React, { useState, useEffect } from "react";

const Timer = () => {
  const [timerCounter, setTimerCounter] = useState(10);

  const timer = () => {
    const counter = setInterval(() => {
      setTimerCounter((prevState) => prevState - 1);
    }, 1000);

    if (timerCounter === 0) {
      clearInterval(counter);
      setTimerCounter(10);
    }
  };

  useEffect(() => {
    timer();
  }, []);

  return <span>{timerCounter}</span>;
};

export default Timer;
