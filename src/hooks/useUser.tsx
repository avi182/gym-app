import { useEffect, useState } from "react";
import { protectedRoute } from "../api";

export interface IUser {
  phone: string;
  id: string;
  name: { first_name: string; last_name: string };
  is_admin: boolean;
}

export const useUser = () => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [user, setUser] = useState<IUser>();
  const cookie = localStorage.getItem("access-token");
  const [loading, setLoading] = useState<boolean>(true);

  const fetch = async () => {
    try {
      const res = await protectedRoute();
      const iUser = JSON.parse(res.user);
      setUser(iUser);
      setIsAdmin(!!iUser?.is_admin);
      setLoading(false);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetch();
  }, [cookie]);

  return { phone: user?.phone, name: user?.name, isAdmin, loading };
};
