import axios from "axios";
import { IUser } from "../hooks/useUser";

export const loginWithPhone = async (
  phone: string,
  isNewUser?: boolean
): Promise<{ success: boolean; isNewUser?: boolean }> => {
  const res = await axiosInstance.post(
    "/login",
    { phone, is_new_user: !!isNewUser },
    {
      withCredentials: false,
    }
  );
  if (res.status === 200) {
    return { success: true, isNewUser: res.data.is_new_user };
  }
  return { success: false };
};

export const verifyOTP = async (
  phone: string,
  otp: string,
  name?: { first_name: string; last_name: string }
): Promise<{ token?: string; success: boolean }> => {
  const res = await axiosInstance.post(
    "/verify",
    { phone, otp: Number(otp), name },
    {
      withCredentials: false,
    }
  );
  if (res.status === 200) {
    return res.data;
  }
  return { success: false };
};

export const protectedRoute = async () => {
  try {
    const res = await axiosInstance.get("/protected");
    if (res?.status === 200) {
      return res.data;
    }
    return { success: false };
  } catch (error) {
    localStorage.removeItem("access-token");
    return { success: false };
  }
};

export const getCharacters = async (): Promise<{
  characters?: any[];
  success: boolean;
}> => {
  const res = await axiosInstance.get("/protected/characters/all");
  if (res.status === 200) {
    return res.data;
  }
  return { success: false };
};

export const createTrainee = async (
  name: string
): Promise<{
  trainee?: any;
  success: boolean;
}> => {
  const res = await axiosInstance.post("/protected/trainees/create", {
    name,
  });
  if (res.status === 200) {
    return res.data;
  }
  return { success: false };
};

export const getTrainees = async (): Promise<{
  trainees?: Trainee[];
  success: boolean;
}> => {
  const res = await axiosInstance.get("/protected/trainees/my");
  if (res.status === 200) {
    return res.data;
  }
  return { success: false };
};

const getUsers = async (): Promise<{
  users?: IUser[];
  success: boolean;
}> => {
  const res = await axiosInstance.get("/protected/admin/users");
  if (res.status === 200) {
    return res.data;
  }
  return { success: false };
};

const impersonateUser = async (
  userId: string
): Promise<{
  token?: string;
  old_token?: string;
  success: boolean;
}> => {
  const res = await axiosInstance.post(
    `/protected/admin/users/${userId}/impersonate`
  );
  if (res.status === 200) {
    return res.data;
  }
  return { success: false };
};

export const AdminActions = {
  getUsers,
  impersonateUser,
};

export type Trainee = {
  _id: string;
  name: string;
  trainer_id: string;
  trainee_id?: string;
  created_at: string;
  activities?: TraineeActivity[];
};

export type TraineeActivity = {
  _id?: string;
  trainee_id?: string;
  name?: string;
  training_type_id: string;
  description?: string;
  amount?: string;
  created_at: string;
};

export const getTrainee = async (
  traineeId: string
): Promise<{
  trainee?: Trainee;
  success: boolean;
}> => {
  const res = await axiosInstance.get(
    `/protected/trainees/getOne/${traineeId}`
  );
  if (res.status === 200) {
    return res.data;
  }
  return { success: false };
};

export type TrainingType = {
  _id: string;
  name: string;
  trainer_id: string;
};

export const getTrainingTypes = async (): Promise<{
  training_types?: TrainingType[];
  success: boolean;
}> => {
  const res = await axiosInstance.get(`/protected/trainees/trainingTypes`);
  if (res.status === 200) {
    return res.data;
  }
  return { success: false };
};

export const createTrainingType = async (input: {
  name: string;
}): Promise<{
  training_type_id?: string;
  success: boolean;
}> => {
  const res = await axiosInstance.post(
    `/protected/trainees/createTrainingType`,
    input
  );
  if (res.status === 200) {
    return res.data;
  }
  return { success: false };
};

export const createActivity = async (
  input: TraineeActivity
): Promise<{
  activity?: TraineeActivity;
  success: boolean;
}> => {
  const res = await axiosInstance.post(
    `/protected/trainees/create_activity`,
    input
  );
  if (res.status === 200) {
    return res.data;
  }
  return { success: false };
};

const env = process.env.NODE_ENV || "development";
const isProduction = env === "production";

const axiosInstance = axios.create({
  baseURL: isProduction
    ? "https://gym-server-a8kd.onrender.com"
    : "http://localhost:8000", // Update with your server's URL
  withCredentials: true,
});

axiosInstance.interceptors.response.use((config) => {
  if (config?.data?.token) {
    localStorage.setItem("access-token", config.data.token);
  }
  return config;
});

axiosInstance.interceptors.request.use((config) => {
  const cookie = localStorage.getItem("access-token");
  if (cookie) {
    config.headers.setAuthorization(`Bearer ${cookie}`);
  }
  return config;
});

export default axiosInstance;
