"use client";

import React, { useCallback, useEffect } from "react";
import { loginWithPhone, verifyOTP } from "../api";
import OtpInput from "react-otp-input";
import { useNavigate } from "react-router-dom";
import { Loader } from "../[components]/loader";

const LoginForm = () => {
  // const [isNewUser, setIsNewUser] = React.useState(false);
  const [phone, setPhone] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [otp, setOtp] = React.useState<string | undefined>(undefined);
  const [step, setStep] = React.useState(1);
  const [isLoading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const login = async (isNewUser = false) => {
    const loginRes = await loginWithPhone(phone, isNewUser);
    if(loginRes.isNewUser) {
      // setIsNewUser(true);
      setStep(1.5);
    } else {
      setStep(2);
    }
  };

  const verify = useCallback(
    async (phone: string, otp: string, name?: {first_name: string, last_name: string}) => {
      console.log({ phone, otp, name });
      setLoading(true);
      const res = await verifyOTP(phone, otp, name);
      setLoading(false);
      const { success } = res;
      if (success) {
        navigate("/home");
      }
    },
    [navigate]
  );

  const numOfOtpInputs = 4;

  useEffect(() => {
    if (otp?.length === numOfOtpInputs) {
      if (firstName && lastName) {
        verify(phone, otp, {first_name: firstName, last_name: lastName});
      } else {
        verify(phone, otp);
      }
    }
  }, [phone, otp, verify, firstName, lastName]);

  return (
    <div className="p-8 rounded-md">
      {step === 1 && (
        <div>
          <div className="mb-4">
            <label className="text-sm font-medium mb-1 block">מס׳ טלפון</label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-transparent placeholder-gray-400 text-white"
              type="phone"
              placeholder="מספר הטלפון שלך"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            onClick={() => {
              login();
            }}
          >
            התחבר
          </button>
        </div>
      )}
      {step === 1.5 && (
        <div>
           <div className="mb-4 flex flex-col gap-2">
            <label className="text-md font-medium mb-1 block">איך קוראים לך?</label>
            <div className="flex flex-col gap-2">
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-transparent placeholder-gray-400 text-white"
                type="text"
                placeholder="שם פרטי"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-transparent placeholder-gray-400 text-white"
                type="text"
                placeholder="שם משפחה"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
          {!isLoading ? (
            <button
              className="mt-1 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
              onClick={() => {
                if (firstName && lastName) {
                  login(true);
                }
              }}
            >
              המשך
            </button>
          ) : (
            <Loader />
          )}
        </div>
      )}
      {step === 2 && (
        <div>
           <div className="mb-4">
            <label className="text-sm font-medium mb-1 block">קיבלת קוד בהודעה. הקלד אותו כאן</label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-transparent placeholder-gray-400 text-white"
              type="number"
              placeholder="הקוד שקיבלת"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>
          {!isLoading ? (
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
              onClick={() => {
                if (otp) {
                  console.log({firstName, lastName})
                  if(firstName && lastName) {
                    verify(phone, otp, {first_name: firstName, last_name: lastName});
                  } else {
                    verify(phone, otp);
                  }
                }
              }}
            >
              התחבר
            </button>
          ) : (
            <Loader />
          )}
        </div>
      )}
    </div>
  );
};

export default LoginForm;
