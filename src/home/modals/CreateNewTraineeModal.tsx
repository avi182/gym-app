import { useState } from "react";
import Modal from "react-responsive-modal";
import "react-responsive-modal/styles.css";

type CreateTraineeModalProps = {
  isOpen: boolean;
  onCloseModal: () => void;
  onSubmit: (name: string) => void;
};

export const CreateNewTraineeModal = ({
  isOpen,
  onCloseModal,
  onSubmit,
}: CreateTraineeModalProps) => {
  const [traineeName, setTraineeName] = useState<string>("");
  return (
    <Modal open={isOpen} onClose={onCloseModal} showCloseIcon={false}>
      <div className="flex flex-col gap-4 w-72">
        <div className="flex flex-col gap-2 items-center">
          <p className="text-gray-600 text-lg">מה שם המתאמן?</p>
          <input
            className="text-gray-600 text-md p-1 border-4 border-gray-200 rounded"
            placeholder="ישראל ישראלי"
            onChange={(e) => setTraineeName(e?.target?.value)}
          ></input>
        </div>
        <div className="flex justify-center gap-2">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              onCloseModal();
            }}
          >
            ביטול
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              if (traineeName) {
                onSubmit(traineeName);
              }
            }}
          >
            המשך
          </button>
        </div>
      </div>
    </Modal>
  );
};
