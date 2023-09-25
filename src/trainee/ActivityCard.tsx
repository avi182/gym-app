import { TraineeActivity, TrainingType } from "../api";
import moment from "moment";
export const ActivityCard = ({
  activity,
  trainingTypes,
  amount,
}: {
  activity: TraineeActivity;
  trainingTypes: TrainingType[] | undefined;
  amount: number | undefined;
}) => {
  const trainingName =
    trainingTypes?.find((type) => activity.training_type_id === type._id)
      ?.name || "ללא שם";
  const date = activity.created_at ? new Date(activity.created_at) : new Date();
  const normalDate = moment(date).format("DD/MM/YYYY");
  return (
    <div
      key={activity._id}
      className="flex flex-col gap-2 rounded bg-gray-600 m-2 p-2"
    >
      <p>שם התרגיל: {trainingName}</p>
      <p>מספר חזרות: {activity.amount}</p>
      {activity.description && <p>תיאור נוסף: {activity.description}</p>}
      <p>תרגול אחרון: {normalDate}</p>
      <p>כמות תרגולים: {amount}</p>
    </div>
  );
};
