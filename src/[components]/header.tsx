import { useState } from "react";
import Modal from "react-responsive-modal";
import { useUser } from "../hooks/useUser";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { name } = useUser();
  const navigate = useNavigate();

  return (
    <header
      className="flex py-6 px-4 sticky top-0 z-10"
      style={{ backgroundColor: "#2d50be" }}
    >
      <div className="flex container mx-auto px-4 items-center">
        <h1
          className="text-white text-2xl font-semibold"
          onClick={() => navigate("/home")}
        >
          iTrainer
        </h1>
      </div>
      {name && (
        <>
          <div
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            <span>ברוך הבא, {name.first_name}</span>
          </div>
          <Modal
            open={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            center
          >
            <div className="m-2">
              <h2 className="text-gray-600 p-2 text-xl">
                אתה בטוח שאתה רוצה להתנתק?
              </h2>
              <div className="flex justify-center space-x-1 gap-2">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => {
                    setIsModalOpen(false);
                  }}
                >
                  לא
                </button>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => {
                    localStorage.removeItem("access-token");
                    window.location.href = "/";
                  }}
                >
                  כן
                </button>
              </div>
            </div>
          </Modal>
        </>
      )}
    </header>
  );
};
