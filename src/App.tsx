import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import LoginForm from "./login/page";
import HomePage from "./home/page";

const ProtectedByToken = ({ ...children }): JSX.Element => {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/login";
    return <></>;
  }
  return <>{children.children}</>;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route
          path="*"
          element={
            <ProtectedByToken>
              <SubRouter />
            </ProtectedByToken>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

function SubRouter(): JSX.Element {
  return (
    <Routes>
      <Route path="*" element={<HomePage />} />
    </Routes>
  );
}
export default App;
