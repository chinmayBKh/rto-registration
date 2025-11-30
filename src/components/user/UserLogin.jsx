import { useState } from "react";
import axiosInstance from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import Toast from "../common/Toast";

function UserLogin() {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [toast, setToast] = useState({ type: "", message: "" });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast({ type: "", message: "" }), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post("/users/login", form);

      // Try ApiResponse pattern first
      let token = null;
      let id = null;

      if (res.data?.data) {
        token = res.data.data.token || res.data.data.jwt || res.data.data;
        id = res.data.data.id || res.data.data.userId;
      } else if (res.data?.token) {
        token = res.data.token;
        id = res.data.id || res.data.userId;
      } else if (typeof res.data === "string") {
        token = res.data;
      }

      if (!token) {
        throw new Error("Token missing in response");
      }

      login({ token, role: "USER", id: id || 1 }); // fallback id=1 if backend not sending
      showToast("success", "User login successful");
    } catch (err) {
      console.error(err);
      showToast("error", "Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center">
      <Toast type={toast.type} message={toast.message} />
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-semibold text-center mb-6">
          User Login
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-slate-600 mb-1 block">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-3 py-2 text-sm focus:ring focus:ring-indigo-200 outline-none"
            />
          </div>
          <div>
            <label className="text-sm text-slate-600 mb-1 block">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-3 py-2 text-sm focus:ring focus:ring-indigo-200 outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg text-sm font-medium"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default UserLogin;
