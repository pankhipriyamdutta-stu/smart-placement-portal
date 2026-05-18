import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  })();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const goToCompanyCards = () => {
    navigate("/dashboard");
    setTimeout(() => {
      const el = document.getElementById("company-cards");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  return (
    <div style={{
      width: "100%",
      background: "#111827",
      padding: "18px 40px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      position: "sticky",
      top: 0,
      zIndex: 1000,
      boxSizing: "border-box",
      borderBottom: "2px solid rgba(37,99,235,0.4)",
    }}>

      <h2
        style={{
          color: "#8b5cf6",
          margin: 0,
          cursor: "pointer",
          fontSize: "22px",
          fontWeight: "900",
        }}
        onClick={() => navigate("/dashboard")}
      >
        SmartPlace
      </h2>

      <div style={{ display: "flex", gap: "6px", alignItems: "center", flexWrap: "wrap" }}>

        <Link to="/dashboard" style={linkStyle}>Dashboard</Link>

        <button onClick={goToCompanyCards} style={linkButtonStyle}>
          Company Cards
        </button>

        <Link to="/leaderboard" style={linkStyle}>Leaderboard</Link>

        <Link to="/experiences" style={linkStyle}>Experiences</Link>

        <Link to="/notifications" style={linkStyle}>Notifications</Link>

        <Link to="/placed-students" style={linkStyle}>Placed Students</Link>

        {user?.role === "admin" && (
          <Link to="/admin" style={linkStyle}>Admin</Link>
        )}

        <button
          onClick={logout}
          style={{
            padding: "9px 18px",
            border: "none",
            borderRadius: "10px",
            background: "#ef4444",
            color: "white",
            cursor: "pointer",
            fontWeight: "600",
            fontSize: "14px",
            marginLeft: "6px",
          }}
        >
          Logout
        </button>

      </div>
    </div>
  );
}

const linkStyle = {
  color: "white",
  textDecoration: "none",
  fontWeight: "500",
  fontSize: "14px",
  padding: "8px 14px",
  borderRadius: "8px",
};

const linkButtonStyle = {
  color: "white",
  textDecoration: "none",
  fontWeight: "500",
  fontSize: "14px",
  padding: "8px 14px",
  borderRadius: "8px",
  background: "transparent",
  border: "none",
  cursor: "pointer",
};