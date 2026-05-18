import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import API from "../services/api";
import Navbar from "../components/Navbar";
import COMPANIES from "../data/MockData";

const mockNotifications = [
  { id: 1, icon: "✓", color: "#22c55e", title: "Shortlisted", body: "You have been moved to Round 2 for Tesla Inc.", time: "20 minutes ago", read: false },
  { id: 2, icon: "!", color: "#f59e0b", title: "Incomplete Profile", body: "Resume missing for Amazon SDE role.", time: "2 hours ago", read: false },
  { id: 3, icon: "✉", color: "#3b82f6", title: "New Message", body: "New message from Placement Cell regarding CV verification.", time: "5 hours ago", read: true },
];

export default function Dashboard() {

  const [companies, setCompanies] = useState([]);
  const [applications, setApplications] = useState([]);
  const [resume, setResume] = useState(null);
  const [notifications, setNotifications] = useState(mockNotifications);
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  // FIXED: Safe user read with null guard
  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  })();

  const unreadCount = notifications.filter((n) => !n.read).length;

  const fetchCompanies = async () => {
    try {
      const res = await API.get("/companies");
      setCompanies(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchApplications = async () => {
    try {
      const res = await API.get(`/applications/${user._id}`);
      setApplications(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // FIXED: Added [] to stop infinite loop + auth guard
  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    fetchCompanies();
    if (user?._id) {
      fetchApplications();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const uploadResume = async () => {
    if (!resume) return alert("Please select a resume file first.");
    const data = new FormData();
    data.append("resume", resume);
    try {
      await API.post(`/upload/resume/${user._id}`, data);
      alert("Resume Uploaded Successfully");
      const updatedUser = { ...user, resume: resume.name };
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (error) {
      console.log(error);
    }
  };

  const alreadyApplied = (companyId) => {
    return applications.some((app) => app.company?._id === companyId);
  };

  const checkEligibility = (company) => {
    const allowedBranches = company.allowedBranches
      ?.split(",")
      .map((b) => b.trim().toLowerCase());
    const cgpaEligible = Number(user.cgpa) >= Number(company.minCGPA);
    const branchEligible = allowedBranches?.includes(user.branch?.trim().toLowerCase());
    const backlogEligible = Number(user.backlogs) <= Number(company.maxBacklogs);
    return cgpaEligible && branchEligible && backlogEligible;
  };

  const applyCompany = async (companyId) => {
    try {
      await API.post("/applications/apply", {
        studentId: user._id,
        companyId,
      });
      alert("Applied Successfully");
      fetchApplications();
    } catch (error) {
      console.log(error);
      alert("Application Failed");
    }
  };

  const filteredMockCompanies = COMPANIES.filter((company) => {
    const matchFilter =
      activeFilter === "all" ||
      (activeFilter === "open" && company.status === "open") ||
      (activeFilter === "soon" && company.status === "soon");
    const matchSearch =
      !searchQuery ||
      company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.domain.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.branches.toLowerCase().includes(searchQuery.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <div style={{ minHeight: "100vh", color: "white" }}>

      <Navbar />

      <div style={{ padding: "40px" }}>

        {/* HEADER */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "40px",
        }}>
          <h1 style={{ fontSize: "42px" }}>Student Dashboard</h1>
          <div style={{ display: "flex", gap: "15px" }}>
            <Link to="/leaderboard" style={navButton}>Leaderboard</Link>
            <Link to="/experiences" style={navButton}>Experiences</Link>
            <button onClick={() => navigate("/placed-students")} style={navButton}>
              Placed Students
            </button>
          </div>
        </div>

        {/* PROFILE CARD */}
        <div style={{
          backdropFilter: "blur(14px)",
          padding: "30px",
          borderRadius: "24px",
          marginBottom: "40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "20px",
          border: "1px solid rgba(255,255,255,0.08)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <div style={{
              width: "80px", height: "80px", borderRadius: "50%",
              background: "#111827", display: "flex", justifyContent: "center",
              alignItems: "center", fontSize: "34px", fontWeight: "700",
            }}>
              {user?.name?.charAt(0)}
            </div>
            <div>
              <h2 style={{ fontSize: "30px", marginBottom: "10px" }}>{user?.name}</h2>
              <p>Email: {user?.email}</p>
              <p>Branch: {user?.branch}</p>
              <p>CGPA: {user?.cgpa}</p>
              <p>Backlogs: {user?.backlogs}</p>
              <p>Batch: {user?.batch}</p>
              <p style={{
                color: user?.resume ? "#22c55e" : "#ef4444",
                fontWeight: "700", marginTop: "8px",
              }}>
                {user?.resume ? "✓ Resume Uploaded" : "✗ Resume Not Uploaded"}
              </p>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            <button style={{
              padding: "12px 20px", border: "none", borderRadius: "12px",
              color: "white", background: "#2563eb", cursor: "pointer", fontWeight: "600",
            }}>
              Edit Profile
            </button>
            <button
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                navigate("/login");
              }}
              style={{
                padding: "12px 20px", border: "none", borderRadius: "12px",
                background: "#ef4444", color: "white", cursor: "pointer", fontWeight: "600",
              }}
            >
              Logout
            </button>
          </div>
        </div>

        {/* NOTIFICATION CARD */}
        <div style={{
          borderRadius: "20px",
          overflow: "hidden",
          marginBottom: "40px",
          border: "1px solid rgba(255,255,255,0.10)",
          background: "white",
          color: "#1e293b",
        }}>
          <div style={{
            background: "linear-gradient(135deg, #1e40af, #3b82f6, #6366f1)",
            padding: "28px 30px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
            <div>
              <div style={{ fontSize: "26px", fontWeight: "800", color: "#facc15" }}>
                Recent Notifications
              </div>
              <div style={{ fontSize: "14px", color: "rgba(255,255,255,0.85)", marginTop: "6px" }}>
                Stay updated with your placement activities
              </div>
            </div>
            {unreadCount > 0 && (
              <div style={{
                background: "#ef4444", color: "white",
                borderRadius: "999px", padding: "6px 14px",
                fontWeight: "700", fontSize: "14px",
              }}>
                {unreadCount} Unread
              </div>
            )}
          </div>

          <div style={{ padding: "20px 24px" }}>
            {notifications.map((n) => (
              <div
                key={n.id}
                onClick={() =>
                  setNotifications((ns) =>
                    ns.map((item) =>
                      item.id === n.id ? { ...item, read: true } : item
                    )
                  )
                }
                style={{
                  display: "flex", gap: "14px", alignItems: "flex-start",
                  padding: "14px", borderRadius: "12px", marginBottom: "10px",
                  cursor: "pointer",
                  background: n.read ? "#f8fafc" : "#eff6ff",
                  border: `1px solid ${n.read ? "#e2e8f0" : n.color + "44"}`,
                  position: "relative",
                }}
              >
                {!n.read && (
                  <div style={{
                    position: "absolute", top: 14, right: 14,
                    width: "9px", height: "9px", borderRadius: "50%",
                    background: "#22c55e",
                  }} />
                )}
                <div style={{
                  width: "40px", height: "40px", borderRadius: "50%",
                  background: n.color + "22", display: "flex",
                  alignItems: "center", justifyContent: "center",
                  fontSize: "16px", color: n.color, flexShrink: 0,
                  fontWeight: "700", border: `2px solid ${n.color}44`,
                }}>
                  {n.icon}
                </div>
                <div>
                  <div style={{ fontWeight: "700", fontSize: "14px", color: "#1e293b", marginBottom: "2px" }}>
                    {n.title}
                  </div>
                  <div style={{ fontSize: "13px", color: "#475569", lineHeight: 1.5 }}>
                    {n.body}
                  </div>
                  <div style={{ fontSize: "11px", color: "#94a3b8", marginTop: "5px" }}>
                    {n.time}
                  </div>
                </div>
              </div>
            ))}
            <Link
              to="/notifications"
              style={{
                display: "block", width: "100%", padding: "14px",
                borderRadius: "12px",
                background: "linear-gradient(90deg, #2563eb, #6366f1)",
                color: "white", fontWeight: "700", fontSize: "15px",
                textAlign: "center", textDecoration: "none", marginTop: "10px",
              }}
            >
              View All Notifications
            </Link>
          </div>
        </div>

        {/* RESUME UPLOAD */}
        <div style={{
          backdropFilter: "blur(14px)",
          padding: "25px",
          marginBottom: "40px",
          borderRadius: "20px",
          border: "1px solid rgba(255,255,255,0.08)",
        }}>
          <h2 style={{ marginBottom: "15px" }}>Upload Resume</h2>
          <input
            type="file"
            onChange={(e) => setResume(e.target.files[0])}
            style={{
              color: "white", marginBottom: "20px",
              border: "1px solid rgba(255,255,255,0.08)", borderRadius: "7px",
            }}
          />
          <br />
          <button onClick={uploadResume} style={uploadButton}>
            Upload Resume
          </button>
        </div>

        {/* COMPANY CARDS SECTION */}
        <div
          id="company-cards"
          style={{
            background: "rgba(17, 24, 39, 0.85)",
            borderRadius: "24px",
            padding: "30px",
            marginBottom: "40px",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {/* Section Header */}
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
            flexWrap: "wrap",
            gap: "12px",
          }}>
            <div>
              <h2 style={{ margin: 0, fontSize: "26px", color: "#facc15" }}>
                🏢 Company Cards
              </h2>
              <p style={{ margin: "6px 0 0 0", color: "#94a3b8", fontSize: "14px" }}>
                Recruiters visiting DEC this season
              </p>
            </div>

            {/* FILTER BUTTONS — this was the broken part */}
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {["all", "open", "soon"].map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  style={{
                    padding: "8px 20px",
                    borderRadius: "999px",
                    border: activeFilter === f ? "none" : "1px solid rgba(255,255,255,0.2)",
                    background: activeFilter === f ? "#2563eb" : "transparent",
                    color: "white",
                    fontWeight: "600",
                    fontSize: "13px",
                    cursor: "pointer",
                    textTransform: "capitalize",
                  }}
                >
                  {f === "all" ? "All" : f === "open" ? "🟢 Open" : "🟡 Coming Soon"}
                </button>
              ))}
            </div>
          </div>

          {/* SEARCH BAR */}
          <input
            type="text"
            placeholder="🔍  Search by company, role, or branch..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "100%",
              padding: "13px 18px",
              borderRadius: "12px",
              border: "1px solid rgba(255,255,255,0.15)",
              background: "rgba(255,255,255,0.06)",
              color: "white",
              fontSize: "14px",
              marginBottom: "24px",
              boxSizing: "border-box",
              outline: "none",
            }}
          />

          {/* CARDS GRID */}
          {filteredMockCompanies.length === 0 ? (
            <div style={{
              textAlign: "center", padding: "60px 0",
              color: "#94a3b8", fontSize: "16px",
            }}>
              No companies match your search.
            </div>
          ) : (
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: "18px",
            }}>
              {filteredMockCompanies.map((company) => (
                <div
                  key={company.id}
                  style={{
                    background: company.bg,
                    borderRadius: "18px",
                    padding: "22px",
                    border: "1px solid rgba(0,0,0,0.08)",
                    boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
                    position: "relative",
                    transition: "transform 0.18s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-3px)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
                >
                  {/* NEW badge */}
                  {company.isNew && (
                    <span style={{
                      position: "absolute", top: "14px", right: "14px",
                      background: "#ef4444", color: "white",
                      fontSize: "11px", fontWeight: "700",
                      padding: "3px 10px", borderRadius: "999px",
                    }}>NEW</span>
                  )}

                  {/* Logo + Name */}
                  <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "16px" }}>
                    <div style={{
                      width: "54px", height: "54px", borderRadius: "14px",
                      background: company.tc, color: "white",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontWeight: "900", fontSize: "13px", flexShrink: 0,
                    }}>
                      {company.logo}
                    </div>
                    <div>
                      <div style={{ fontWeight: "800", fontSize: "18px", color: company.tc }}>
                        {company.name}
                      </div>
                      <div style={{ fontSize: "12px", color: "#64748b" }}>{company.domain}</div>
                    </div>
                  </div>

                  {/* Info Grid */}
                  <div style={{
                    display: "grid", gridTemplateColumns: "1fr 1fr",
                    gap: "8px", marginBottom: "14px",
                  }}>
                    {[
                      ["📦 Package", company.pkg],
                      ["📋 Roles", company.roles],
                      ["🎓 Min CGPA", company.cgpa],
                      ["📊 10th/12th %", company.pct],
                      ["⚠️ Backlogs", company.backlogs],
                      ["🌿 Branches", company.branches],
                    ].map(([label, val]) => (
                      <div key={label} style={{
                        background: "rgba(255,255,255,0.60)",
                        borderRadius: "8px", padding: "8px 10px",
                      }}>
                        <div style={{ fontSize: "10px", color: "#64748b", fontWeight: "600" }}>{label}</div>
                        <div style={{ fontSize: "12px", color: "#1e293b", fontWeight: "700", marginTop: "2px" }}>
                          {val}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Skills */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "16px" }}>
                    {company.skills.map((skill) => (
                      <span key={skill} style={{
                        padding: "4px 10px", borderRadius: "999px",
                        background: company.tc + "18", color: company.tc,
                        fontSize: "11px", fontWeight: "600",
                        border: `1px solid ${company.tc}44`,
                      }}>
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Important Dates */}
                  <div style={{
                    background: "rgba(255,255,255,0.55)",
                    borderRadius: "10px", padding: "12px",
                    marginBottom: "16px", fontSize: "12px",
                  }}>
                    <div style={{ fontWeight: "700", marginBottom: "8px", color: "#1e293b" }}>
                      📅 Important Dates
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px" }}>
                      {[
                        ["Reg. Opens", company.dates.regOpen],
                        ["Reg. Closes", company.dates.regClose],
                        ["Test", company.dates.test],
                        ["Interview", company.dates.interview],
                      ].map(([label, date]) => (
                        <div key={label}>
                          <span style={{ color: "#64748b" }}>{label}: </span>
                          <span style={{ fontWeight: "600", color: "#1e293b" }}>{date}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Status + Apply Button */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "10px" }}>
                    <span style={{
                      padding: "6px 14px", borderRadius: "999px",
                      fontSize: "12px", fontWeight: "700", whiteSpace: "nowrap",
                      background: company.status === "open" ? "#dcfce7" : "#fef9c3",
                      color: company.status === "open" ? "#15803d" : "#92400e",
                      border: company.status === "open" ? "1px solid #86efac" : "1px solid #fde68a",
                    }}>
                      {company.status === "open" ? "🟢 Open" : "🟡 Coming Soon"}
                    </span>
                    <button
                      onClick={() => {
                        if (company.status !== "open" || alreadyApplied(company.id)) return;
                        applyCompany(company.id);
                      }}
                      disabled={company.status !== "open" || alreadyApplied(company.id)}
                      style={{
                        flex: 1,
                        padding: "10px 16px",
                        borderRadius: "10px",
                        border: "none",
                        fontWeight: "700",
                        fontSize: "13px",
                        cursor: company.status === "open" && !alreadyApplied(company.id)
                          ? "pointer" : "not-allowed",
                        background: alreadyApplied(company.id)
                          ? "#22c55e"
                          : company.status !== "open"
                            ? "#94a3b8"
                            : company.tc,
                        color: "white",
                      }}
                    >
                      {alreadyApplied(company.id)
                        ? "✓ Applied"
                        : company.status !== "open"
                          ? "Coming Soon"
                          : "Apply Now"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* MY APPLICATIONS */}
        {applications.length > 0 && (
          <div style={{
            backdropFilter: "blur(14px)",
            padding: "30px",
            borderRadius: "20px",
            border: "1px solid rgba(255,255,255,0.08)",
            marginBottom: "40px",
          }}>
            <h2 style={{ marginBottom: "20px", color: "#facc15" }}>📄 My Applications</h2>
            {applications.map((app) => (
              <div
                key={app._id}
                style={{
                  padding: "16px 20px",
                  borderRadius: "12px",
                  marginBottom: "12px",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "10px",
                }}
              >
                <div>
                  <div style={{ fontWeight: "700", fontSize: "16px" }}>{app.company?.name}</div>
                  <div style={{ fontSize: "13px", color: "#94a3b8" }}>{app.company?.domain}</div>
                </div>
                <span style={{
                  padding: "6px 16px", borderRadius: "999px",
                  fontWeight: "700", fontSize: "13px",
                  background: app.status === "accepted" ? "#22c55e22"
                    : app.status === "rejected" ? "#ef444422" : "#f59e0b22",
                  color: app.status === "accepted" ? "#22c55e"
                    : app.status === "rejected" ? "#ef4444" : "#f59e0b",
                  border: `1px solid ${app.status === "accepted" ? "#22c55e44"
                    : app.status === "rejected" ? "#ef444444" : "#f59e0b44"}`,
                }}>
                  {app.status?.charAt(0).toUpperCase() + app.status?.slice(1) || "Pending"}
                </span>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

const navButton = {
  padding: "10px 18px",
  border: "1px solid rgba(255,255,255,0.2)",
  borderRadius: "10px",
  background: "transparent",
  color: "white",
  cursor: "pointer",
  fontWeight: "600",
  textDecoration: "none",
  fontSize: "14px",
};

const uploadButton = {
  padding: "12px 28px",
  border: "none",
  borderRadius: "10px",
  background: "#2563eb",
  color: "white",
  fontWeight: "700",
  fontSize: "15px",
  cursor: "pointer",
};