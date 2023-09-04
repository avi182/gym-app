import Modal from "react-responsive-modal";
import "react-responsive-modal/styles.css";

type ResetGamesModalProps = {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  onConfirmReset: () => void;
};

export const ResetGamesModal = ({
  isModalOpen,
  setIsModalOpen,
  onConfirmReset,
}: ResetGamesModalProps) => {
  return (
    <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)} center>
      <div>
        <h2 className="text-gray-600 p-2">
          Are you sure you want to reset all existing games?
        </h2>
        <div className="flex justify-center space-x-1">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              setIsModalOpen(false);
            }}
          >
            No
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              onConfirmReset?.();
            }}
          >
            Yes
          </button>
        </div>
      </div>
    </Modal>
  );
};
