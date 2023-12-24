import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Trainee,
  TraineeActivity,
  TrainingType,
  getTrainee,
  getTrainingTypes,
} from "../../api";
import { ActivityCard } from "../ActivityCard";

export const TraineeActivitiesPage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [trainee, setTrainee] = useState<Trainee>();
  const [filteredTrainings, setFilteredTrainings] = useState<TraineeActivity[]>();
  const [trainingTypes, setTrainingTypes] = useState<TrainingType[]>();
  const fetchTrainee = useCallback(async (traineeId: string) => {
    setLoading(true);
    const res = await getTrainee(traineeId);
    if (res.success) {
      setTrainee(res?.trainee);
    }
    const res2 = await getTrainingTypes();
    if (res2.success) {
      setTrainingTypes(res2?.training_types);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (params?.traineeId) {
      fetchTrainee(params.traineeId);
    }
  }, [params?.traineeId, fetchTrainee]);

  useEffect(() => {
    const trainings = trainee?.activities
    ?.filter((act) => act.training_type_id === params.trainingTypeId)
    .sort((a,b) => new Date(b?.created_at).getTime() - new Date(a?.created_at).getTime())
    setFilteredTrainings(trainings);
  }, [trainee, params?.trainingTypeId]);

  const trainingName =
    trainingTypes?.find((type) => filteredTrainings?.[0].training_type_id === type._id)
      ?.name || "ללא שם";

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="flex justify-between">
            <h1 className="text-2xl">{trainee?.name} - {trainingName}</h1>
            <div className="flex items-center text-xl bg-gray-200 text-gray-900 px-3 py-1 rounded-md cursor-pointer" onClick={() => {
              navigate(-1)
            }}>חזור</div>
          </div>
          <div>
            {filteredTrainings?.map((act) => (
              <ActivityCard
                activity={act}
                trainingTypes={trainingTypes}
                amount={
                  trainee?.activities?.filter(
                    (at) => at.training_type_id === act.training_type_id
                  ).length
                }
              />
            ))}
            {filteredTrainings?.length === 0 && (
              <span className="text-gray-600">
                עדיין אין מידע, הוסף אימון ראשון!
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
