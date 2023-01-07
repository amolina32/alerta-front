import axios from "axios";

const baseUrl = "https://p01--spry-territory--6fcqcbmvnytt.code.run/auth";

export const login = async (email: string, password: string) => {
  return (
    await axios.post(`${baseUrl}/login`, {
      password: password,
      email: email,
    })
  ).data;
};

export const test = async () => {
  const url = "https://p01--spry-territory--6fcqcbmvnytt.code.run/users/";
  return (await axios.get(`${url}`)).data;
};
