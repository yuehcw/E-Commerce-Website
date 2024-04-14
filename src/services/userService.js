import axios from "axios";

const API_BASE_URL = "https://dummyjson.com";

export const addUser = async (
  firstname,
  lastname,
  email,
  username,
  password,
) => {
  try {
    return await axios.post(`${API_BASE_URL}/users/add`, {
      fistName: firstname,
      lastName: lastname,
      email: email,
      username: username,
      password: password,
    });
  } catch (error) {
    console.error("Failed to add a user:", error);
    throw error;
  }
};
