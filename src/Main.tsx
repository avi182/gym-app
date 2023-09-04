import React from "react";
import { Header } from "./[components]/header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginForm from "./login/page";
import HomePage from "./home/page";
import { TraineePage } from "./trainee/page";

const ProtectedByToken = ({ ...children }): JSX.Element => {
  const token = localStorage.getItem("access-token");
  if (!token) {
    window.location.href = "/login";
    return <></>;
  }
  return <>{children.children}</>;
};

export default function MainApp() {
  function SubRouter(): JSX.Element {
    return (
      <Routes>
        <Route path="*" element={<HomePage />} />
        <Route path={`/trainee/:traineeId`} element={<TraineePage />} />
      </Routes>
    );
  }

  return (
    <html lang="en" className="h-full">
      <body className={`bg-gray-800 h-full flex flex-col`} dir="rtl">
        <div id="main-div" className="flex flex-col flex-grow h-screen">
          <Header />
          <main className="container mx-auto px-4 py-8 flex-grow">
            <BrowserRouter>
              <Routes>
                <Route
                  path="*"
                  element={
                    <ProtectedByToken>
                      <SubRouter />
                    </ProtectedByToken>
                  }
                />
                <Route path="/login" element={<LoginForm />} />
              </Routes>
            </BrowserRouter>
          </main>
          <footer className="py-4" style={{ backgroundColor: "#2d50be" }}>
            <div className="container mx-auto px-4">
              <p className="text-white text-center opacity-50">v0.1</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
