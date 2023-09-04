import React, { useEffect } from "react";
import { protectedRoute } from "./api";
import { useNavigate } from "react-router-dom";

const LayoutPage = () => {
  const [isLoading, setLoading] = React.useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // (async () => {
    //   setLoading(true);
    //   const res = await protectedRoute();
    //   if (res.success) {
    //     navigate("/home");
    //   } else {
    //     navigate("/login");
    //   }
    // })();
  });

  return (
    <div>
      {isLoading ? (
        <div>loading...</div>
      ) : (
        <div>
          <h1>Home Page</h1>
        </div>
      )}
    </div>
  );
};

export default LayoutPage;
