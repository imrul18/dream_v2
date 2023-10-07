import http from "./http";

const login = async (email, password) => {
  const res = await http.post("/auth/login", {
    email: email,
    password: password,
    mode: "json",
    otp: "string",
  });
  const accessToken = res?.data?.data?.access_token;
  const accessTokenExpires = res?.data?.data?.expires;
  const refreshToken = res?.data?.data?.refresh_token;
  if (accessToken) {
    localStorage.setItem("accessToken", JSON.stringify(accessToken));
    localStorage.setItem("refreshToken", JSON.stringify(refreshToken));
    localStorage.setItem(
      "refreshTime",
      JSON.stringify(new Date().getTime() + accessTokenExpires - 30000)
    );

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
  const accessTokenExpires = res?.data?.data?.expires;
  const refreshToken = res?.data?.data?.refresh_token;
  if (accessToken) {
    localStorage.setItem("accessToken", JSON.stringify(accessToken));
    localStorage.setItem("refreshToken", JSON.stringify(refreshToken));
    localStorage.setItem(
      "refreshTime",
      JSON.stringify(new Date().getTime() + accessTokenExpires - 30000)
    );
    return {
      status: true,
      data: res?.data,
    };
  } else {
    localStorage.clear();
  }
};

const forget = async (email) => {
  const res = await http.post("/auth/password/request", {
    email: email,
  });
  if (res?.data) return false;
  else return true;
};

const logout = () => {
  localStorage.clear();
};

const AuthService = {
  login,
  refreshToken,
  forget,
  logout,
};

export default AuthService;
