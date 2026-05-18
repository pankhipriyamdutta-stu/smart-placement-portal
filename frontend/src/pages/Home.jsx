import { useNavigate } from "react-router-dom";

import collegeLogo from "../assets/collegeLogo.jpg";
import collegeBackground from "../assets/college.jpg";

export default function Home() {
  const navigate = useNavigate();

  const handleCompanyClick = () => {
    navigate("/dashboard");
    setTimeout(() => {
      const el = document.getElementById("company-cards");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>

      {/* HEADER */}
      <div style={{
        background: "white",
        padding: "18px 30px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "4px solid #1d4ed8",
        width: "100%",
        boxSizing: "border-box",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <img
            src={collegeLogo}
            alt="DEC Logo"
            style={{ width: "110px", height: "110px", objectFit: "contain" }}
          />
          <div>
            <h1 style={{
              margin: "0", color: "#0b1f59", fontSize: "30px",
              fontWeight: "900", lineHeight: "1.2",
            }}>
              Dhemaji Engineering College
            </h1>
            <p style={{
              marginTop: "6px", color: "#334155",
              fontSize: "17px", fontWeight: "500",
            }}>
              A GOVT. OF ASSAM INSTITUTION APPROVED BY AICTE
            </p>
          </div>
        </div>
        <h1 style={{
          color: "#0f172a", fontSize: "30px", fontWeight: "900",
          margin: "0", whiteSpace: "nowrap",
        }}>
          DEC PLACEMENT PORTAL
        </h1>
      </div>

      {/* MAIN SECTION */}
      <div style={{
        padding: "40px 0px 0px 0px",
        background: `url(${collegeBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100%",
        flex: 1,
      }}>

        {/* UNIFIED GRID */}
        <div style={{
          maxWidth: "1150px",
          margin: "0 auto 50px auto",
          padding: "0 20px",
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
        }}>

          {/* COMPANY CARDS — spans all 3 columns */}
          <div style={{ gridColumn: "1 / -1" }}>
            <div style={{
              background: "white",
              borderRadius: "18px",
              overflow: "hidden",
              boxShadow: "0 10px 25px rgba(0,0,0,0.25)",
            }}>

              {/* Blue banner — same as portal cards */}
              <div style={{
                height: "150px",
                background: "linear-gradient(rgba(37,99,235,0.82), rgba(37,99,235,0.82)), url(https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1400&auto=format&fit=crop)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "6px",
              }}>
                <h2 style={{
                  color: "#facc15", fontSize: "26px",
                  fontWeight: "900", textAlign: "center",
                  margin: 0, padding: "0 20px",
                }}>
                  🏢 Recruiting Companies
                </h2>
                <p style={{
                  color: "rgba(255,255,255,0.88)",
                  fontSize: "13px", margin: 0, textAlign: "center",
                }}>
                  Top recruiters visiting DEC this placement season — click any card to apply
                </p>
              </div>

              {/* Company sub-cards */}
              <div style={{ padding: "22px" }}>
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "16px",
                  marginBottom: "20px",
                }}>
                  {homeCompanies.map((company) => (
                    <div
                      key={company.id}
                      onClick={handleCompanyClick}
                      style={{
                        background: company.bg,
                        borderRadius: "14px",
                        overflow: "hidden",
                        cursor: "pointer",
                        border: "1px solid rgba(0,0,0,0.07)",
                        boxShadow: "0 3px 10px rgba(0,0,0,0.08)",
                        transition: "transform 0.18s, box-shadow 0.18s",
                        position: "relative",
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.transform = "translateY(-4px)";
                        e.currentTarget.style.boxShadow = "0 12px 28px rgba(0,0,0,0.18)";
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "0 3px 10px rgba(0,0,0,0.08)";
                      }}
                    >
                      {/* Company banner */}
                      <div style={{
                        height: "72px",
                        background: `linear-gradient(135deg, ${company.tc}cc, ${company.tc}88)`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "0 14px",
                      }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                          <div style={{
                            width: "40px", height: "40px", borderRadius: "10px",
                            background: "rgba(255,255,255,0.25)",
                            backdropFilter: "blur(4px)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontWeight: "900", fontSize: "11px", color: "white",
                            border: "1.5px solid rgba(255,255,255,0.40)",
                            flexShrink: 0,
                          }}>
                            {company.logo}
                          </div>
                          <div>
                            <div style={{ fontWeight: "800", fontSize: "14px", color: "white" }}>
                              {company.name}
                            </div>
                            <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.80)" }}>
                              {company.domain}
                            </div>
                          </div>
                        </div>
                        {company.isNew && (
                          <span style={{
                            background: "#ef4444", color: "white",
                            fontSize: "9px", fontWeight: "700",
                            padding: "2px 7px", borderRadius: "999px",
                          }}>NEW</span>
                        )}
                      </div>

                      {/* Company card body */}
                      <div style={{ padding: "12px" }}>
                        <div style={{
                          display: "grid", gridTemplateColumns: "1fr 1fr",
                          gap: "5px", marginBottom: "10px",
                        }}>
                          {[
                            ["📦 Package", company.pkg],
                            ["📋 Role", company.roles],
                            ["🎓 CGPA", company.cgpa],
                            ["🌿 Branches", company.branches],
                          ].map(([label, value]) => (
                            <div key={label} style={{
                              background: "rgba(255,255,255,0.70)",
                              borderRadius: "7px", padding: "5px 8px",
                            }}>
                              <div style={{ fontSize: "9px", color: "#64748b", fontWeight: "600" }}>
                                {label}
                              </div>
                              <div style={{ fontSize: "10px", color: "#1e293b", fontWeight: "700", marginTop: "1px" }}>
                                {value}
                              </div>
                            </div>
                          ))}
                        </div>

                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <span style={{
                            padding: "3px 10px", borderRadius: "999px",
                            fontSize: "10px", fontWeight: "700",
                            background: company.status === "open" ? "#dcfce7" : "#fef9c3",
                            color: company.status === "open" ? "#15803d" : "#92400e",
                            border: company.status === "open" ? "1px solid #86efac" : "1px solid #fde68a",
                          }}>
                            {company.status === "open" ? "🟢 Open" : "🟡 Coming Soon"}
                          </span>
                          <span style={{
                            fontSize: "11px", fontWeight: "700",
                            color: company.tc, textDecoration: "underline",
                          }}>
                            View Details →
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bottom CTA */}
                <button
                  onClick={() => navigate("/dashboard")}
                  style={{
                    width: "100%", padding: "15px", borderRadius: "999px",
                    border: "none", background: "#2563eb", color: "white",
                    fontWeight: "700", fontSize: "17px", cursor: "pointer",
                  }}
                >
                  See All Companies & Apply on Dashboard
                </button>
              </div>
            </div>
          </div>

          {/* PORTAL CARDS */}
          {portalCards.map((card) => (
            <div
              key={card.title}
              style={{
                background: "white",
                borderRadius: "18px",
                overflow: "hidden",
                boxShadow: "0 10px 25px rgba(0,0,0,0.25)",
              }}
            >
              <div style={{
                height: "150px",
                background: `linear-gradient(rgba(37,99,235,0.70), rgba(37,99,235,0.70)), url(${card.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}>
                <h2 style={{
                  color: "#facc15", fontSize: "26px",
                  fontWeight: "900", textAlign: "center", padding: "0 20px",
                }}>
                  {card.title}
                </h2>
              </div>
              <div style={{ padding: "22px" }}>
                <p style={{
                  color: "#0f172a", lineHeight: "1.8",
                  marginBottom: "25px", minHeight: "90px", fontSize: "18px",
                }}>
                  {card.description}
                </p>
                <button
                  onClick={() => navigate(card.route)}
                  style={{
                    width: "100%", padding: "15px", borderRadius: "999px",
                    border: "none", background: "#2563eb", color: "white",
                    fontWeight: "700", fontSize: "17px", cursor: "pointer",
                  }}
                >
                  {card.button}
                </button>
              </div>
            </div>
          ))}

          {/* NOTIFICATION CARD */}
          <div style={{
            background: "white",
            borderRadius: "18px",
            overflow: "hidden",
            boxShadow: "0 10px 25px rgba(0,0,0,0.25)",
          }}>
            <div style={{
              height: "150px",
              background: "linear-gradient(rgba(37,99,235,0.70), rgba(37,99,235,0.70)), url(https://images.unsplash.com/photo-1611532736597-de2d4265fba3?q=80&w=1200&auto=format&fit=crop)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}>
              <h2 style={{
                color: "#facc15", fontSize: "26px",
                fontWeight: "900", textAlign: "center", padding: "0 20px",
              }}>
                🔔 Notifications
              </h2>
            </div>
            <div style={{ padding: "16px 22px" }}>
              <div style={{
                display: "flex", gap: "10px", alignItems: "flex-start",
                padding: "10px", borderRadius: "10px", marginBottom: "8px",
                background: "#eff6ff", border: "1px solid #22c55e44",
              }}>
                <div style={{
                  width: "32px", height: "32px", borderRadius: "50%",
                  background: "#22c55e22", display: "flex", alignItems: "center",
                  justifyContent: "center", color: "#22c55e",
                  fontWeight: "700", flexShrink: 0, fontSize: "14px",
                }}>✓</div>
                <div>
                  <div style={{ fontWeight: "700", fontSize: "13px", color: "#1e293b" }}>Shortlisted</div>
                  <div style={{ fontSize: "12px", color: "#475569" }}>Moved to Round 2 for Tesla Inc.</div>
                </div>
              </div>
              <div style={{
                display: "flex", gap: "10px", alignItems: "flex-start",
                padding: "10px", borderRadius: "10px", marginBottom: "8px",
                background: "#fffbeb", border: "1px solid #f59e0b44",
              }}>
                <div style={{
                  width: "32px", height: "32px", borderRadius: "50%",
                  background: "#f59e0b22", display: "flex", alignItems: "center",
                  justifyContent: "center", color: "#f59e0b",
                  fontWeight: "700", flexShrink: 0, fontSize: "14px",
                }}>!</div>
                <div>
                  <div style={{ fontWeight: "700", fontSize: "13px", color: "#1e293b" }}>Incomplete Profile</div>
                  <div style={{ fontSize: "12px", color: "#475569" }}>Resume missing for Amazon SDE role.</div>
                </div>
              </div>
              <div style={{
                display: "flex", gap: "10px", alignItems: "flex-start",
                padding: "10px", borderRadius: "10px", marginBottom: "12px",
                background: "#f0f9ff", border: "1px solid #3b82f644",
              }}>
                <div style={{
                  width: "32px", height: "32px", borderRadius: "50%",
                  background: "#3b82f622", display: "flex", alignItems: "center",
                  justifyContent: "center", color: "#3b82f6",
                  fontWeight: "700", flexShrink: 0, fontSize: "14px",
                }}>✉</div>
                <div>
                  <div style={{ fontWeight: "700", fontSize: "13px", color: "#1e293b" }}>New Message</div>
                  <div style={{ fontSize: "12px", color: "#475569" }}>Message from Placement Cell.</div>
                </div>
              </div>
              <button
                onClick={() => navigate("/notifications")}
                style={{
                  width: "100%", padding: "15px", borderRadius: "999px",
                  border: "none", background: "#2563eb", color: "white",
                  fontWeight: "700", fontSize: "17px", cursor: "pointer",
                }}
              >
                View Notifications
              </button>
            </div>
          </div>

        </div>

        {/* FOOTER */}
        <div style={{
          background: "#07143d", color: "white",
          padding: "35px 50px", marginTop: "10px",
          borderTop: "4px solid #1d4ed8",
        }}>
          <div style={{
            display: "flex", justifyContent: "space-between",
            alignItems: "center", flexWrap: "wrap", gap: "30px",
          }}>
            <div>
              <h2 style={{ margin: "0 0 10px 0", fontSize: "28px", fontWeight: "800" }}>
                Dhemaji Engineering College
              </h2>
              <p style={{ margin: "0", color: "#cbd5e1", lineHeight: "1.8", fontSize: "16px" }}>
                Tekjuri, Railway Station Road<br />
                Dhemaji, Assam - 787057<br />
                Email: dhemajiec@gmail.com
              </p>
            </div>
            <div style={{ textAlign: "right" }}>
              <h2 style={{ margin: "0 0 10px 0", fontSize: "24px", fontWeight: "800" }}>
                DEC Placement Portal
              </h2>
              <p style={{ color: "#cbd5e1", lineHeight: "1.8", fontSize: "15px", margin: "0" }}>
                Smart Placement Management System<br />
                For Students, Recruiters & Placement Cell
              </p>
            </div>
          </div>
          <hr style={{ margin: "30px 0", border: "1px solid rgba(255,255,255,0.1)" }} />
          <p style={{ textAlign: "center", margin: "0", color: "#94a3b8", fontSize: "15px" }}>
            © 2026 Dhemaji Engineering College • All Rights Reserved
          </p>
        </div>

      </div>
    </div>
  );
}

// ── Portal section cards ──────────────────────────────────────────────────────
const portalCards = [
  {
    title: "Job Search",
    description: "Search and apply for placement opportunities offered by recruiters visiting Dhemaji Engineering College.",
    button: "Student Login",
    route: "/login",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Training & Placement",
    description: "Access placement training resources, aptitude preparation, interview guidance and campus updates.",
    button: "Student Registration",
    route: "/register",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Recruiter Zone",
    description: "Companies can register, post jobs and manage campus recruitment drives.",
    button: "Recruiter Register",
    route: "/recruiter-login",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Interview Experiences",
    description: "Learn from seniors by reading experiences and preparation tips.",
    button: "View Experiences",
    route: "/experiences",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Placement Leaderboard",
    description: "Track highest packages, top recruiters and placement statistics.",
    button: "View Leaderboard",
    route: "/leaderboard",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Resume Builder",
    description: "Upload resumes, improve profiles and prepare for placements.",
    button: "Get Started",
    route: "/resume-builder",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Placed Students",
    description: "View all students who have been successfully placed in top companies.",
    button: "View Placed Students",
    route: "/placed-students",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200&auto=format&fit=crop",
  },
];

// ── Companies shown on home page ──────────────────────────────────────────────
const homeCompanies = [
  {
    id: 1, name: "PWC", domain: "Software Engineering", logo: "PW",
    bg: "#E6F1FB", tc: "#0C447C", status: "open", isNew: false,
    cgpa: "8.0+", pkg: "42-48 LPA", roles: "SWE-1, SWE-2", branches: "CSE, IT, ECE",
  },
  {
    id: 2, name: "Microsoft", domain: "Cloud and Software", logo: "MS",
    bg: "#E6F1FB", tc: "#185FA5", status: "open", isNew: false,
    cgpa: "7.5+", pkg: "38-45 LPA", roles: "SDE-1", branches: "CSE, IT, ECE, EEE",
  },
  {
    id: 3, name: "Amazon", domain: "E-Commerce and Cloud", logo: "AMZ",
    bg: "#FAEEDA", tc: "#854F0B", status: "open", isNew: false,
    cgpa: "7.0+", pkg: "35-44 LPA", roles: "SDE-1, SDE-2", branches: "CSE, IT, ECE, ME",
  },
  {
    id: 4, name: "TCS", domain: "IT Services", logo: "TCS",
    bg: "#EAF3DE", tc: "#3B6D11", status: "open", isNew: false,
    cgpa: "6.0+", pkg: "3.5-7 LPA", roles: "Engineer Trainee", branches: "All Branches",
  },
  {
    id: 5, name: "Infosys", domain: "IT Consulting", logo: "INF",
    bg: "#EAF3DE", tc: "#27500A", status: "soon", isNew: false,
    cgpa: "6.5+", pkg: "4.5-9 LPA", roles: "Systems Engineer", branches: "All Branches",
  },
  {
    id: 9, name: "TEDx", domain: "Events and Media", logo: "TEDx",
    bg: "#FCEBEB", tc: "#A32D2D", status: "soon", isNew: true,
    cgpa: "No minimum", pkg: "Internship / Stipend", roles: "Content, Design", branches: "All Branches",
  },
];