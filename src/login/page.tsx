"use client";

import React, { useCallback, useEffect } from "react";
import { loginWithPhone, verifyOTP } from "../api";
import OtpInput from "react-otp-input";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [phone, setPhone] = React.useState("");
  const [otp, setOtp] = React.useState<string | undefined>(undefined);
  const [step, setStep] = React.useState(1);
  const [isLoading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const login = async () => {
    await loginWithPhone(phone);
    setStep(2);
  };

  const verify = useCallback(
    async (phone: string, otp: string) => {
      setLoading(true);
      const res = await verifyOTP(phone, otp);
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
      verify(phone, otp);
    }
  }, [phone, otp, verify]);

  return (
    <div className="p-8 rounded-md">
      {step === 1 && (
        <div>
          <div className="mb-4">
            <label className="text-sm font-medium mb-1 block">Phone</label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-transparent placeholder-gray-400 text-white"
              type="phone"
              placeholder="Enter your phone"
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
            Login
          </button>
        </div>
      )}
      {step === 2 && (
        <div>
          <div className="mb-4">
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={numOfOtpInputs}
              renderSeparator={<span>-</span>}
              renderInput={(props) => (
                <input {...props} className="text-black" />
              )}
            />
          </div>
          {!isLoading ? (
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
              onClick={() => {
                if (otp) {
                  verify(phone, otp);
                }
              }}
            >
              Login
            </button>
          ) : (
            <div>loading...</div>
          )}
        </div>
      )}
    </div>
  );
};

export default LoginForm;
