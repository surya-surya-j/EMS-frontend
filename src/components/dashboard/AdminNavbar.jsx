import { useAuth } from "../../Context/AuthsContext";

const AdminNavbar = () => {
  const { user, logout } = useAuth();
  return (
    <div className="flex justify-between h-12 bg-teal-600 text-white items-center px-5">
      <p>Welcome {user.name}</p>
      <button
        className="bg-teal-700 px-4 py-1 hover:bg-teal-800"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
};

export default AdminNavbar;
