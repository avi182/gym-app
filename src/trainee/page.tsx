import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Trainee,
  TraineeActivity,
  TrainingType,
  createActivity,
  getTrainee,
  getTrainingTypes,
} from "../api";
import { CreateTraineeActivityModal } from "./modals/CreateTraineeActivity";

export const TraineePage = () => {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [trainee, setTrainee] = useState<Trainee>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [trainingTypes, setTrainingTypes] = useState<TrainingType[]>();
  const fetchTrainee = useCallback(async (traineeId: string) => {
    setLoading(true);
    const res = await getTrainee(traineeId);
    if (res.success) {
      setTrainee(res?.trainee);
    }
    const res2 = await getTrainingTypes();
    if (res2.success) {
      console.log({ res2 });
      setTrainingTypes(res2?.training_types);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (params?.traineeId) {
      fetchTrainee(params.traineeId);
    }
  }, [params?.traineeId, fetchTrainee]);

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl">{trainee?.name}</h1>
          <button
            onClick={() => {
              setIsModalOpen(true);
            }}
            className="bg-blue-500 text-white font-bold py-2 px-4 border-b-4 border-blue-700 rounded"
          >
            צור פעילות חדשה
          </button>
          <div>
            {trainee?.activities?.map((act) => (
              <div key={act._id} className="flex flex-row gap-2">
                <p>
                  {
                    trainingTypes?.find(
                      (type) => act.training_type_id === type._id
                    )?.name
                  }
                </p>
                <p>{act.amount}</p>
              </div>
            ))}
          </div>
          {isModalOpen && (
            <CreateTraineeActivityModal
              trainingTypes={trainingTypes}
              isOpen={isModalOpen}
              setOpen={setIsModalOpen}
              onSubmit={async (act: TraineeActivity) => {
                act.trainee_id = params.traineeId;
                const res = await createActivity(act);
                if (res.success && res.activity && trainee) {
                  setTrainee({
                    ...trainee,
                    activities: [...(trainee?.activities || []), res.activity],
                  });
                  setIsModalOpen(false);
                }
              }}
            />
          )}
        </div>
      )}
    </div>
  );
};
