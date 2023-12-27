import { useEffect, useState } from "react";
import { protectedRoute } from "../api";

export interface IUser {
  phone: string;
  id: string;
  name: { first_name: string; last_name: string };
  is_admin: boolean;
}

export const useUser = () => {
  const [user, setUser] = useState<IUser>();
  const token = localStorage.getItem("access-token");
  const [loading, setLoading] = useState<boolean>(true);

  const fetch = async () => {
    try {
      const res = await protectedRoute();
      setUser(res?.user);
      setLoading(false);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetch();
  }, [token]);

  return {
    phone: user?.phone,
    name: user?.name,
    isAdmin: !!user?.is_admin,
    loading,
  };
};
