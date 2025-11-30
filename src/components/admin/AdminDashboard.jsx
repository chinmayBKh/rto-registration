// src/components/admin/AdminDashboard.jsx
function AdminDashboard() {
    return (
      <div className="min-h-screen bg-slate-50 p-6">
        <h2 className="text-xl font-semibold mb-4">Admin Dashboard</h2>
        <p className="text-slate-600 text-sm">
          Here you can show users, officers, and all applications by calling:
          <br />
          - /api/users (all users)
          <br />
          - /api/officer (all officers)
          <br />
          - /api/vehicle/all (all applications)
        </p>
      </div>
    );
  }
  
  export default AdminDashboard;
  