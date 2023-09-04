import { useEffect, useState } from "react";
import { protectedRoute } from "../api";

export const useUser = () => {
  const [userPhone, setUserPhone] = useState<string>("");
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const cookie = localStorage.getItem("access-token");

  const fetch = async () => {
    try {
      const res = await protectedRoute();
      setUserPhone(res.message);
      setIsAdmin(res.message === "0543130497");
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetch();
  }, [cookie]);

  return { phone: userPhone, isAdmin };
};
