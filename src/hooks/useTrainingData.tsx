import { useCallback, useEffect, useState } from "react";
import { TrainingType, getTrainingTypes } from "../api";
import { get } from "http";

export const useTrainingData = () => {
    const [trainingTypes, setTrainingTypes] = useState<TrainingType[]>();
    const [loading, setLoading] = useState(true);
    const getData = async () => {
        const data = await getTrainingTypes();
        if (data.success) {
            console.log({ data });
            setTrainingTypes(data?.training_types);
        }
    }

    const getTrainingData = useCallback(async () => getData(), []);

    useEffect(() => {
        getTrainingData();
        setLoading(false);
    }, [getTrainingData]);

    return { trainingTypes, loading, refetch: getData };
}