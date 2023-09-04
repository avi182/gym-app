import Modal from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { TraineeActivity, TrainingType, createTrainingType } from "../../api";
import { useEffect, useState } from "react";

type CreateTraineeActivityModalProps = {
  isOpen: boolean;
  setOpen: (value: boolean) => void;
  onSubmit: (activity: TraineeActivity) => Promise<void>;
  trainingTypes: TrainingType[] | undefined;
};

export const CreateTraineeActivityModal = ({
  isOpen,
  setOpen,
  onSubmit,
  trainingTypes,
}: CreateTraineeActivityModalProps) => {
  const [step, setStep] = useState<number>(1);
  const [typedTrainingType, setTypedTrainingType] = useState<string>();
  const [amountOfReps, setAmountOfReps] = useState<string>();
  const [selectedTrainingTypeId, setSelectedTrainingType] = useState<string>();

  const handleTrainingTypeSelection = async (trainingTypeName: string) => {
    const res = await createTrainingType({ name: trainingTypeName });
    if (res.success) {
      console.log({ res });
      setSelectedTrainingType(res.training_type_id);
    }
  };

  const handleNextStep = async () => {
    console.log({ step, typedTrainingType });
    if (step === 1) {
      if (typedTrainingType) {
        handleTrainingTypeSelection(typedTrainingType);
      }
      setStep(step + 1);
    } else if (step === 2) {
      if (amountOfReps && selectedTrainingTypeId) {
        await onSubmit({
          training_type_id: selectedTrainingTypeId,
          amount: String(amountOfReps),
        });
      }
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={() => setOpen(false)}
      center
      showCloseIcon={false}
    >
      <div className="flex flex-col gap-2">
        {step === 1 && (
          <div className="flex flex-col gap-2">
            <p className="text-gray-600 text-lg text-center">סוג הפעילות?</p>
            <input
              className="text-gray-600 text-md p-1 border-4 border-gray-200 rounded"
              placeholder="פעילות חדשה?"
              onChange={(e) => setTypedTrainingType(e?.target?.value)}
            ></input>
            <div className="text-gray-600 text-right h-60 overflow-auto">
              {trainingTypes
                ?.filter((val) => val?.name?.includes(typedTrainingType || ""))
                ?.map((trainingType) => (
                  <div
                    className={`flex border-4 mb-2 rounded-lg p-1 ${
                      selectedTrainingTypeId === trainingType._id
                        ? "border-red-400"
                        : "border-gray-200"
                    }`}
                    key={trainingType._id}
                    onClick={() => {
                      console.log({ trainingType });
                      setSelectedTrainingType(trainingType._id);
                    }}
                  >
                    {trainingType.name}
                  </div>
                ))}
            </div>
          </div>
        )}
        {step === 2 && (
          <div className="flex flex-col gap-2">
            <p className="text-gray-600 text-lg text-center">כמה חזרות?</p>
            <input
              className="text-gray-600 text-md p-1 border-4 border-gray-200 rounded"
              placeholder="כמה?"
              type="number"
              onChange={(e) => setAmountOfReps(e?.target?.value)}
            ></input>
          </div>
        )}
        <div className="flex justify-center gap-2">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              //   onCloseModal();
            }}
          >
            ביטול
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              handleNextStep();
            }}
          >
            המשך
          </button>
        </div>
      </div>
    </Modal>
  );
};