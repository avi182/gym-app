import React from "react";
import { IUser } from "../../hooks/useUser";
import { AdminActions } from "../../api";

export const UserCard = ({ user }: { user: IUser }) => {
  const impersonate = async () => {
    const res = await AdminActions.impersonateUser(user.id);
    if (res?.success && res?.token && res?.old_token) {
      const { token, old_token } = res;
      localStorage.setItem("old-access-token", old_token);
      localStorage.setItem("access-token", token);
      window.location.href = "/home";
    }
  };

  return (
    <div
      className={`bg-white p-4 shadow flex flex-row justify-between ${"bg-gradient-to-b from-lime-50 to-white"} w-full m-2`}
      key={user?.id}
    >
      <p className="text-gray-600 flex gap-1 items-center text-xl">
        {user?.name?.first_name}
      </p>
      <button
        onClick={() => {
          impersonate();
        }}
        className="bg-blue-500 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
      >
        צפה
      </button>
    </div>
  );
};
