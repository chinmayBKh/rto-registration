import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axios";
import Toast from "../common/Toast";

function UpdateStatus() {
  const { appId } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("Pending");
  const [app, setApp] = useState(null);
  const [toast, setToast] = useState({ type: "", message: "" });

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast({ type: "", message: "" }), 3000);
  };

  useEffect(() => {
    const fetchApp = async () => {
      // there is a getApplication(Long appId) service method;
      // controller most likely has GET /api/vehicle/{appId}
      try {
        const res = await axiosInstance.get(`/vehicle/${appId}`);
        setApp(res.data);
        setStatus(res.data.status || "Pending");
      } catch (e) {
        console.warn("GET /vehicle/{appId} might not exist, skipping");
      }
    };
    fetchApp().catch(console.error);
  }, [appId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Status enum in backend: Pending, Approved, Rejected
      const res = await axiosInstance.put(
        `/vehicle/status/${appId}?status=${status}`
      );
      console.log(res.data);
      showToast("success", `Status updated to ${status}`);
      setTimeout(() => navigate("/officer/dashboard"), 1200);
    } catch (err) {
      console.error(err);
      showToast("error", "Failed to update status");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex justify-center py-10">
      <Toast type={toast.type} message={toast.message} />
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-xl font-semibold mb-6">
          Update Application Status
        </h2>
        <p className="text-sm text-slate-500 mb-4">
          App ID: <span className="font-mono">{appId}</span>
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-slate-600 mb-1">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm focus:ring focus:ring-indigo-200 outline-none"
            >
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg text-sm font-medium"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateStatus;
