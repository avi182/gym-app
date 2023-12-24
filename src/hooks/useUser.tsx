import { useEffect, useState } from "react";
import { protectedRoute } from "../api";

export const useUser = () => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [user, setUser] = useState<{phone: string, id: string, name: {first_name: string, last_name: string}}>();
  const cookie = localStorage.getItem("access-token");

  const fetch = async () => {
    try {
      const res = await protectedRoute();
      const iUser =  JSON.parse(res.user)
      setUser(iUser)
      setIsAdmin(iUser.phone === "0543130497");
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetch();
  }, [cookie]);

  return { phone: user?.phone, name: user?.name, isAdmin };
};
