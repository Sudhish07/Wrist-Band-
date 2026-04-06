import { useEffect, useMemo, useState } from "react";
import api from "../service/api";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await api.get("/admin/users");
      setUsers(res.data || []);
    } catch (error) {
      console.error("Failed to fetch users:", error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    try {
      await api.delete(`/admin/users/${id}`);
      fetchUsers();
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const totalUsers = users.length;
  const totalAdmins = useMemo(
    () => users.filter((user) => user.role === "admin").length,
    [users]
  );
  const totalNormalUsers = totalUsers - totalAdmins;

  return (
    <div className="page-wrap">
      <div className="hero-section">
        <div>
          <p className="section-tag">Admin Panel</p>
          <h1>Admin Dashboard</h1>
          <p className="hero-text">
            View all registered users, monitor roles, and manage user access.
          </p>
        </div>
      </div>

      {loading ? (
        <div className="empty-state">Loading users...</div>
      ) : (
        <>
          <div className="admin-stats-grid">
            <div className="metric-card metric-primary">
              <p className="metric-label">Total Users</p>
              <h2>{totalUsers}</h2>
              <span>registered accounts</span>
            </div>

            <div className="metric-card">
              <p className="metric-label">Admin Accounts</p>
              <h3>{totalAdmins}</h3>
            </div>

            <div className="metric-card">
              <p className="metric-label">Normal Users</p>
              <h3>{totalNormalUsers}</h3>
            </div>
          </div>

          <div className="admin-table-card">
            <div className="admin-table-header">
              <div>
                <h2>User Management</h2>
                <p>All signed up users are listed below.</p>
              </div>
            </div>

            {users.length === 0 ? (
              <div className="empty-state">No users found</div>
            ) : (
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Created</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td>
                          <div className="user-name-cell">
                            <div className="user-avatar">
                              {(user.name || "U").charAt(0).toUpperCase()}
                            </div>
                            <span>{user.name}</span>
                          </div>
                        </td>
                        <td>{user.email}</td>
                        <td>
                          <span className={`role-badge ${user.role === "admin" ? "admin" : "user"}`}>
                            {user.role}
                          </span>
                        </td>
                        <td>
                          {user.created_at
                            ? new Date(user.created_at).toLocaleString()
                            : "--"}
                        </td>
                        <td>
                          {user.role !== "admin" ? (
                            <button
                              className="delete-user-btn"
                              onClick={() => deleteUser(user.id)}
                            >
                              Remove
                            </button>
                          ) : (
                            <span className="admin-locked-text">Protected</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default AdminDashboard;