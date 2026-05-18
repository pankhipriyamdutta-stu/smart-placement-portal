import React from "react";
import { placementImages } from "./PlacementImages";

const placements = [
  { name: "Arunjyoti Changkakoty", branch: "B.Tech CSE", company: "Intensiv Filter Himenviro", image: placementImages.arunjyoti },
  { name: "Chiranjib Roy", branch: "B.Tech CSE", company: "TCS", image: placementImages.chiranjib },
  { name: "Sajidur Rahman Hazarika", branch: "B.Tech ME", company: "Neilsoft", image: placementImages.sajidur },
  { name: "Gargi Bharadwaj", branch: "B.Tech CSE", company: "PwC", image: placementImages.gargi },
  { name: "Sristi Shyam Lahon", branch: "B.Tech ME", company: "KollegeApply", image: placementImages.sristi_farhin },
  { name: "Farhin Hussain", branch: "B.Tech Civil", company: "KollegeApply", image: placementImages.farhin },
  { name: "Bibek Kumar Borah", branch: "B.Tech CSE", company: "Maventic", image: placementImages.bibek },
  { name: "Samina Khanom", branch: "B.Tech Civil", company: "Berger Paints", image: placementImages.samina },
  { name: "Rituparna Maut", branch: "B.Tech ME", company: "Unlox", image: placementImages.unlox1 },
  { name: "MD Masum Ahmed", branch: "B.Tech ME", company: "Unlox", image: placementImages.unlox2 },
];

export default function PlacedStudentsPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#f0f4ff", padding: "40px 20px" }}>

      {/* Header */}
      <div style={{
        textAlign: "center",
        marginBottom: "40px",
        background: "linear-gradient(135deg, #1a3c8f, #2563eb)",
        color: "white",
        padding: "40px 20px",
        borderRadius: "16px",
        maxWidth: "900px",
        margin: "0 auto 40px auto"
      }}>
        <h1 style={{ fontSize: "2rem", fontWeight: "900", marginBottom: "8px" }}>
          🎓 Training & Placement Cell Congratulates
        </h1>
        <p style={{ fontSize: "1.1rem", opacity: 0.9 }}>
          Dhemaji Engineering College — Campus Placement Drive 2025-26
        </p>
      </div>

      {/* Cards Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        gap: "24px",
        maxWidth: "1100px",
        margin: "0 auto"
      }}>
        {placements.map((student, index) => (
          <div
            key={index}
            style={{
              background: "white",
              borderRadius: "16px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              overflow: "hidden",
              textAlign: "center",
              transition: "transform 0.2s",
            }}
            onMouseEnter={e => e.currentTarget.style.transform = "translateY(-6px)"}
            onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
          >
            <img
              src={student.image}
              alt={student.name}
              style={{ width: "100%", height: "200px", objectFit: "cover" }}
            />
            <div style={{ padding: "16px" }}>
              <h3 style={{ fontSize: "1rem", fontWeight: "700", color: "#1e3a8a", marginBottom: "4px" }}>
                {student.name}
              </h3>
              <p style={{ fontSize: "0.8rem", color: "#555", marginBottom: "8px" }}>
                {student.branch}
              </p>
              <div style={{
                background: "#dbeafe",
                color: "#1d4ed8",
                borderRadius: "20px",
                padding: "4px 12px",
                fontSize: "0.8rem",
                fontWeight: "600"
              }}>
                📌 {student.company}
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}