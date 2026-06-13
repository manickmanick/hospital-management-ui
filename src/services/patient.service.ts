import axios from "axios";

const API_URL = "http://localhost:3000/api/patients";

export const getPatients = async () => {
  const response = await axios.get(API_URL);

  return response.data;
};

export const createPatient = async (data: {
  name: string;
  age: number;
  phone: string;
}) => {
  const response = await axios.post(API_URL, data);

  return response.data;
};
