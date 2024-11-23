import { useState, useEffect } from 'react';

export default function TaskContainer({ tasks, currentTaskIndex }) {
  const [taskCards, setTaskCards] = useState([]);

  useEffect(() => {
    if (taskCards.length > tasks.length - 1) {
      setTaskCards((prevItems) => prevItems.slice(0, -1));
    }
  }, [tasks]);

  useEffect(() => {
    if (tasks.length === 0) {
      return;
    }
    setTaskCards(
      tasks
        .filter((_, index) => index !== currentTaskIndex)
        .map((task, index) => {
          return (
            <div
              key={index}
              className="absolute h-64 w-52 bg-gray-200 shadow-md"
              style={{
                right: `${calculatePosition()}px`,
                top: `${calculatePosition()}px`,
                transform: `rotate(${calculateRotation()}deg)`,
              }}
            >
              Req
            </div>
          );
        }),
    );
  }, []);

  const calculatePosition = () => {
    return Math.floor(Math.random() * 30) + 20;
  };

  const calculateRotation = () => {
    return Math.floor(Math.random() * 20) + -10;
  };

  return (
    <div className="relative mx-auto h-full w-5/6 rounded-xl bg-[#eed6b4] p-4">
      {taskCards}
    </div>
  );
}
