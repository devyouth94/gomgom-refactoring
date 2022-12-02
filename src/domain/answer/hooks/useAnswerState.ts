import { useState } from "react";
import instance from "app/module/instance";

const useAnswerState = () => {
  const [think, setThink] = useState(false);
  const [answer, setAnswer] = useState("");

  const clickAnswerHandler = async () => {
    if (think) return;

    setThink(true);
    setAnswer("");

    try {
      const { data } = await instance.get("/advice");
      setTimeout(() => {
        setAnswer(data.msg);
        setThink(false);
      }, 1500);
    } catch (error) {
      console.log(error);
    }
  };

  return { think, answer, clickAnswerHandler };
};

export default useAnswerState;
