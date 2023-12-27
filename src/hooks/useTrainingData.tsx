import { useCallback, useEffect, useState } from "react";
import { TrainingType, getTrainingTypes } from "../api";

export const useTrainingData = () => {
  const [trainingTypes, setTrainingTypes] = useState<TrainingType[]>();
  const [loading, setLoading] = useState(true);
  const getData = async () => {
    const data = await getTrainingTypes();
    if (data.success) {
      setTrainingTypes(data?.training_types);
    }
  };

  const getTrainingData = useCallback(async () => getData(), []);

  useEffect(() => {
    getTrainingData();
    setLoading(false);
  }, [getTrainingData]);

  return { trainingTypes, loading, refetch: getData };
};
