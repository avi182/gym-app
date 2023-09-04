import React from "react";
import { Trainee } from "../../api";
import { NavigateFunction } from "react-router-dom";

export const TraineeCard = ({
  trainee,
  navigate,
}: {
  trainee: Trainee;
  navigate: NavigateFunction;
}) => {
  return (
    <div
      className={`bg-white p-4 shadow flex flex-row justify-between ${"bg-gradient-to-b from-lime-50 to-white"} w-full m-2`}
      key={trainee?._id}
    >
      <p className="text-gray-600 flex gap-1 items-center text-xl">
        {trainee?.name}
      </p>
      <button
        onClick={() => {
          navigate(`/trainee/${trainee?._id}`);
        }}
        className="bg-blue-500 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
      >
        צפה
      </button>
    </div>
  );
};
