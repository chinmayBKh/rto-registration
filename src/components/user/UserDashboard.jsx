import { useEffect, useState } from "react";
import axiosInstance from "../../api/axios";
import { useAuth } from "../../context/AuthContext";

function UserDashboard() {
  const { auth } = useAuth();
  const [apps, setApps] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axiosInstance.get("/vehicle/all");
      const all = res.data || [];
      const userId = auth.userId || Number(localStorage.getItem("userId"));
      const myApps = all.filter((a) => a.userId === userId);
      setApps(myApps);
    };
    fetchData().catch(console.error);
  }, [auth.userId]);

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <h2 className="text-xl font-semibold mb-4">
        My Vehicle Applications
      </h2>
      <div className="overflow-x-auto bg-white shadow rounded-2xl">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-100 text-slate-700">
            <tr>
              <th className="px-4 py-2 text-left">App ID</th>
              <th className="px-4 py-2 text-left">Vehicle</th>
              <th className="px-4 py-2 text-left">Engine No</th>
              <th className="px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {apps.map((app) => (
              <tr key={app.appId} className="border-t">
                <td className="px-4 py-2">{app.appId}</td>
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
              </tr>
            ))}
            {apps.length === 0 && (
              <tr>
                <td
                  colSpan={4}
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

export default UserDashboard;
