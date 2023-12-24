import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Trainee,
  TraineeActivity,
  TrainingType,
  createActivity,
  getTrainee,
  getTrainingTypes,
} from "../api";
import { CreateTraineeActivityModal } from "./modals/CreateTraineeActivity";
import { ActivityCard } from "./ActivityCard";
import { useTrainingData } from "../hooks/useTrainingData";

export const TraineePage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [trainee, setTrainee] = useState<Trainee>();
  const [lastTrainings, setLastTrainings] = useState<TraineeActivity[]>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { trainingTypes, loading: isLoadingData, refetch } = useTrainingData();
  const fetchTrainee = useCallback(async (traineeId: string) => {
    setLoading(true);
    const res = await getTrainee(traineeId);
    if (res.success) {
      console.log({trainee: res?.trainee})
      setTrainee(res?.trainee);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (params?.traineeId) {
      fetchTrainee(params.traineeId);
    }
  }, [params?.traineeId, fetchTrainee]);

  useEffect(() => {
    const latestActivities: Record<string, any> = {};
    const last: TraineeActivity[] = [];
    trainee?.activities?.forEach((act) => {
      if (latestActivities?.[act.training_type_id]) {
        latestActivities?.[act.training_type_id].push(act);
      } else {
        latestActivities[act.training_type_id] = [act];
      }
    });
    Object.keys(latestActivities).forEach((key) => {
      last.push(
        latestActivities[key].sort((a: TraineeActivity, b: TraineeActivity) => {
          return (
            new Date(b?.created_at).getTime() -
            new Date(a?.created_at).getTime()
          );
        })[0]
      );
    });
    setLastTrainings(last.sort((a, b) => {
      return (
        new Date(b?.created_at).getTime() -
        new Date(a?.created_at).getTime()
      );
    }));
  }, [trainee]);

  const isLoading = loading || isLoadingData;
  
  return (
    <div>
      {isLoading  ? (
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
            {lastTrainings?.map((act) => (
              <div onClick={() => {
                navigate(`/trainee/${params.traineeId}/${act.training_type_id}`)
              }}>
                <ActivityCard
                activity={act}
                trainingTypes={trainingTypes}
                amount={
                  trainee?.activities?.filter(
                    (at) => at.training_type_id === act.training_type_id
                  ).length
                  }
                />
            </div>
            ))}
            {lastTrainings?.length === 0 && (
              <span className="text-gray-600">
                עדיין אין מידע, הוסף אימון ראשון!
              </span>
            )}
          </div>
          {isModalOpen && (
            <CreateTraineeActivityModal
              trainingTypes={trainingTypes}
              isOpen={isModalOpen}
              setOpen={setIsModalOpen}
              onSubmit={async (act: TraineeActivity, isNewType?: boolean) => {
                act.trainee_id = params.traineeId;
                const res = await createActivity(act);
                if (res.success && res.activity && trainee) {
                  setTrainee({
                    ...trainee,
                    activities: [...(trainee?.activities || []), res.activity],
                  });
                  if (isNewType) {
                    refetch()
                  }
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
