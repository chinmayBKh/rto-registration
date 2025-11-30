import { useEffect, useState } from "react";
import axiosInstance from "../../api/axios";
import { useNavigate } from "react-router-dom";

function OfficerDashboard() {
  const [apps, setApps] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const res = await axiosInstance.get("/vehicle/all");
      setApps(res.data || []);
    };
    fetchData().catch(console.error);
  }, []);

  const handleUpdateClick = (appId) => {
    navigate(`/officer/update/${appId}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <h2 className="text-xl font-semibold mb-4">
        All Vehicle Applications
      </h2>
      <div className="overflow-x-auto bg-white shadow rounded-2xl">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-100 text-slate-700">
            <tr>
              <th className="px-4 py-2 text-left">App ID</th>
              <th className="px-4 py-2 text-left">Owner</th>
              <th className="px-4 py-2 text-left">Vehicle</th>
              <th className="px-4 py-2 text-left">Engine No</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Update Status</th>
            </tr>
          </thead>
          <tbody>
            {apps.map((app) => (
              <tr key={app.appId} className="border-t">
                <td className="px-4 py-2">{app.appId}</td>
                <td className="px-4 py-2">{app.ownerName}</td>
                <td className="px-4 py-2">
                  {app.vehicleType} - {app.brand} {app.model}
                </td>
                <td className="px-4 py-2">{app.engineNo}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      app.status === "Approved"
                        ? "bg-emerald-100 text-emerald-700"
                        : app.status === "Rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {app.status}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleUpdateClick(app.appId)}
                    className="px-3 py-1 text-xs bg-indigo-600 text-white rounded hover:bg-indigo-700"
                  >
                    Update Status
                  </button>
                </td>
              </tr>
            ))}
            {apps.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-4 text-center text-slate-500"
                >
                  No applications found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OfficerDashboard;
