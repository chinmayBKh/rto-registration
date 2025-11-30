import { useState } from "react";
import axiosInstance from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import Toast from "../common/Toast";

const initialForm = {
  ownerName: "",
  aadhaar: "",
  address: "",
  vehicleType: "",
  brand: "",
  model: "",
  engineNo: "",
  chassisNo: "",
};

function ApplyVehicle() {
  const { auth } = useAuth();
  const [form, setForm] = useState(initialForm);
  const [toast, setToast] = useState({ type: "", message: "" });

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast({ type: "", message: "" }), 3000);
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...form,
        userId: auth.userId || Number(localStorage.getItem("userId")) || 1,
        officerId: null,
      };

      const res = await axiosInstance.post("/vehicle/apply", payload);
      console.log("Application created:", res.data);

      showToast("success", "✔ Application submitted successfully");
      setForm(initialForm);
    } catch (err) {
      console.error(err);
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Failed to submit";

      if (msg.toLowerCase().includes("chassis")) {
        showToast("error", "❌ Chassis number already exists");
      } else if (msg.toLowerCase().includes("engine")) {
        showToast("error", "❌ Engine number already registered");
      } else {
        showToast("error", msg);
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex justify-center py-10">
      <Toast type={toast.type} message={toast.message} />
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-xl font-semibold text-slate-800 mb-6">
          Apply for Vehicle Registration
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div className="md:col-span-2">
            <label className="block text-sm text-slate-600 mb-1">
              Owner Name *
            </label>
            <input
              name="ownerName"
              value={form.ownerName}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-3 py-2 text-sm focus:ring focus:ring-indigo-200 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-600 mb-1">
              Aadhaar (12 digits) *
            </label>
            <input
              name="aadhaar"
              maxLength={12}
              minLength={12}
              value={form.aadhaar}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-3 py-2 text-sm focus:ring focus:ring-indigo-200 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-600 mb-1">
              Vehicle Type *
            </label>
            <select
              name="vehicleType"
              value={form.vehicleType}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-3 py-2 text-sm focus:ring focus:ring-indigo-200 outline-none"
            >
              <option value="">Select</option>
              <option value="Bike">Bike</option>
              <option value="Car">Car</option>
              <option value="Tractor">Tractor</option>
              <option value="Auto">Auto</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-slate-600 mb-1">
              Brand *
            </label>
            <input
              name="brand"
              value={form.brand}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-3 py-2 text-sm focus:ring focus:ring-indigo-200 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-600 mb-1">
              Model *
            </label>
            <input
              name="model"
              value={form.model}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-3 py-2 text-sm focus:ring focus:ring-indigo-200 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-600 mb-1">
              Engine Number *
            </label>
            <input
              name="engineNo"
              value={form.engineNo}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-3 py-2 text-sm focus:ring focus:ring-indigo-200 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-600 mb-1">
              Chassis Number *
            </label>
            <input
              name="chassisNo"
              value={form.chassisNo}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-3 py-2 text-sm focus:ring focus:ring-indigo-200 outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm text-slate-600 mb-1">
              Address *
            </label>
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              required
              rows={3}
              className="w-full border rounded-lg px-3 py-2 text-sm focus:ring focus:ring-indigo-200 outline-none resize-none"
            />
          </div>

          <div className="md:col-span-2 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition"
            >
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ApplyVehicle;
