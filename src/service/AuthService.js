import http from "./http";

const login = async (email, password) => {
  const res = await http.post("/auth/login", {
    email: email,
    password: password,
    mode: "json",
    otp: "string",
  });
  const accessToken = res?.data?.data?.access_token;
  const refreshToken = res?.data?.data?.refresh_token;
  if (accessToken) {
    localStorage.setItem("accessToken", JSON.stringify(accessToken));
    localStorage.setItem("refreshToken", JSON.stringify(refreshToken));
    return {
      status: true,
      data: res?.data,
    };
  } else {
    localStorage.clear();
    return {
      status: false,
      data: res?.data?.errors[0]?.message,
    };
  }
};

const refreshToken = async () => {
  const res = await http.post(
    "/auth/refresh",
    {
      refresh_token: JSON.parse(localStorage.getItem("refreshToken")),
    },
    {
      headers: {
        Authorization: null,
      },
    }
  );
  const accessToken = res?.data?.data?.access_token;
  const refreshToken = res?.data?.data?.refresh_token;
  if (accessToken) {
    localStorage.setItem("accessToken", JSON.stringify(accessToken));
    localStorage.setItem("refreshToken", JSON.stringify(refreshToken));
    return {
      status: true,
      data: res?.data,
    };
  } else {
    localStorage.clear();
  }
};

const logout = () => {
  localStorage.clear();
};

const AuthService = {
  login,
  refreshToken,
  logout,
};

export default AuthService;
