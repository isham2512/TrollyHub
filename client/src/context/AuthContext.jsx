import { createContext, useContext, useEffect, useState } from "react";
import api from "../api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {

  // ✅ SAFE INIT (no crash on refresh)
  const [auth, setAuth] = useState(() => {
    try {
      const stored = localStorage.getItem("trollyhub_auth");
      return stored ? JSON.parse(stored) : null;
    } catch (err) {
      localStorage.removeItem("trollyhub_auth");
      return null;
    }
  });

  const [loading, setLoading] = useState(false);

  // ✅ SYNC WITH LOCALSTORAGE (safe)
  useEffect(() => {
    try {
      if (auth) {
        localStorage.setItem("trollyhub_auth", JSON.stringify(auth));
      } else {
        localStorage.removeItem("trollyhub_auth");
      }
    } catch (err) {
      console.error("LocalStorage error:", err);
    }
  }, [auth]);

  // ✅ STAFF LOGIN
  const loginStaff = async (payload) => {
    setLoading(true);
    try {
      const { data } = await api.post("/auth/staff-login", payload);
      setAuth(data);
      return data;
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // ✅ REQUEST OTP
  const requestCustomerOtp = async (payload) => {
    setLoading(true);
    try {
      const { data } = await api.post("/auth/customer/request-otp", payload);
      return data;
    } catch (err) {
      console.error("OTP request error:", err.response?.data || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // ✅ VERIFY OTP
  const verifyCustomerOtp = async (payload) => {
    setLoading(true);
    try {
      const { data } = await api.post("/auth/customer/verify-otp", payload);
      setAuth(data);
      return data;
    } catch (err) {
      console.error("OTP verify error:", err.response?.data || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // ✅ LOGOUT
  const logout = () => {
    setAuth(null);
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        loading,
        loginStaff,
        requestCustomerOtp,
        verifyCustomerOtp,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Hook
export const useAuth = () => useContext(AuthContext);
