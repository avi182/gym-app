import React, { useEffect, useState } from "react";
import { AdminActions } from "../api";
import { useNavigate } from "react-router-dom";
import { UserCard } from "./user-card/UserCard";
import { Loader } from "../[components]/loader";
import { IUser, useUser } from "../hooks/useUser";

const AdminPage = () => {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [users, setUsers] = useState<IUser[]>();
  const navigate = useNavigate();
  const { isAdmin, loading: userLoading } = useUser();

  const loading = isLoading || userLoading;

  const fetchData = async () => {
    const res = await AdminActions.getUsers();
    if (res.success) {
      setUsers(res?.users);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (!isAdmin) {
    navigate("/home");
  }

  return (
    <div>
      <h1>רשימת המשתמשים</h1>
      <div className="flex flex-wrap justify-center">
        {users?.length ? (
          users.map((user) => <UserCard key={user.id} user={user} />)
        ) : (
          <div className="my-52">
            <span className="text-2xl text-purple-300">לא נמצאו משתמשים</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
