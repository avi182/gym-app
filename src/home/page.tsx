import React, { useEffect, useState } from "react";
import {
  Trainee,
  TrainingType,
  createTrainee,
  getTrainees,
  getTrainingTypes,
} from "../api";
import ReactLoading from "react-loading";
import { useNavigate } from "react-router-dom";
import { CreateNewTraineeModal } from "./modals/CreateNewTraineeModal";
import { TraineeCard } from "./trainee-card/TraineeCard";

const HomePage = () => {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [trainees, setTrainees] = useState<Trainee[]>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const fetchData = async () => {
    const res = await getTrainees();
    if (res.success) {
      setTrainees(res?.trainees);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1>המתאמנים שלך</h1>
      {isLoading ? (
        <ReactLoading type="spin" color="#000" />
      ) : (
        <div className="flex flex-wrap justify-center">
          {trainees &&
            trainees.map((trainee) => (
              <TraineeCard
                key={trainee._id}
                trainee={trainee}
                navigate={navigate}
              />
            ))}
        </div>
      )}
      <CreateNewTraineeModal
        isOpen={isModalOpen}
        onCloseModal={() => setIsModalOpen(false)}
        onSubmit={async (name) => {
          console.log({ name });
          const res = await createTrainee(name);
          if (res.success) {
            setTrainees([...(trainees || []), res.trainee]);
            setIsModalOpen(false);
          }
        }}
      />
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed p-8 z-90 bottom-10 right-8 bg-blue-400 w-10 h-10 rounded-full drop-shadow-lg flex justify-center items-center text-white text-4xl hover:bg-blue-700 hover:drop-shadow-2xl"
      >
        +
      </button>
    </div>
  );
};

export default HomePage;
