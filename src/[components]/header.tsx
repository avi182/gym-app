import { useState } from "react";
import Modal from "react-responsive-modal";
import { useUser } from "../hooks/useUser";

export const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { phone } = useUser();

  return (
    <header
      className="flex py-6 px-4 sticky top-0 z-10"
      style={{ backgroundColor: "#2d50be" }}
    >
      <div className="container mx-auto px-4">
        <h1 className="text-white text-2xl font-bold">נתי אימונים בע״מ</h1>
      </div>
      {phone && (
        <>
          <div
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            <span>Welcome, {phone}!</span>
          </div>
          <Modal
            open={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            center
          >
            <div>
              <h2 className="text-gray-600 p-2">
                Are you sure you want to sign out?
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
                    localStorage.removeItem("access-token");
                    window.location.href = "/";
                  }}
                >
                  Yes
                </button>
              </div>
            </div>
          </Modal>
        </>
      )}
    </header>
  );
};
