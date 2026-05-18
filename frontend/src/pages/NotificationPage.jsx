import { useState } from "react";

const ACCENT = "#22c55e";
const DARK_BG = "#0f1117";
const CARD_BG = "#1a1d27";
const CARD_BORDER = "#2a2d3a";
const MUTED = "#6b7280";

const mockEvents = [
  { id: 1, title: "Technical Interview", company: "Google • Cloud Architecture", time: "10:30 AM – 11:30 AM", date: "Today", type: "interview", enabled: true },
  { id: 2, title: "Application Deadline", company: "Microsoft • SWE Internship", time: "11:59 PM", date: "Sept 16", type: "deadline", enabled: false },
  { id: 3, title: "Company Presentation", company: "Amazon • Recruitment Drive", time: "02:30 PM", date: "Today", type: "event", enabled: true },
  { id: 4, title: "Resume Workshop", company: "Career Cell • Seminar Hall", time: "03:00 PM", date: "Sept 18", type: "event", enabled: true },
];

const mockNotifications = [
  { id: 1, icon: "✓", color: ACCENT, title: "Shortlisted", body: "You have been moved to Round 2 for Tesla Inc.", time: "20 minutes ago", read: false },
  { id: 2, icon: "!", color: "#f59e0b", title: "Incomplete Profile", body: "Resume missing for Amazon SDE role.", time: "2 hours ago", read: false },
  { id: 3, icon: "✉", color: "#3b82f6", title: "New Message", body: "New message from Placement Cell regarding CV verification.", time: "5 hours ago", read: true },
  { id: 4, icon: "✓", color: ACCENT, title: "Interview Confirmed", body: "Your Google L3 interview is confirmed for tomorrow 10:30 AM.", time: "1 day ago", read: true },
];

const mockAlarms = [
  { id: 1, title: "Google Interview", subtitle: "L3 General Coding Round", time: "09:45", countdown: "In 45 mins", active: true, type: "interview" },
  { id: 2, title: "Submission Deadline", subtitle: "Meta Portfolio Upload", time: "23:59", countdown: "Tonight", active: true, type: "deadline" },
  { id: 3, title: "Aptitude Test", subtitle: "Cognizant Batch A", time: "08:00", countdown: "Finished", active: false, type: "test" },
];

const DAYS = ["S", "M", "T", "W", "T", "F", "S"];
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstDay(year, month) {
  return new Date(year, month, 1).getDay();
}

function Toggle({ enabled, onChange }) {
  return (
    <div
      onClick={() => onChange(!enabled)}
      style={{
        width: 42, height: 24, borderRadius: 12, cursor: "pointer",
        background: enabled ? ACCENT : "#374151",
        position: "relative", transition: "background 0.2s", flexShrink: 0,
      }}
    >
      <div style={{
        position: "absolute", top: 3, left: enabled ? 21 : 3,
        width: 18, height: 18, borderRadius: "50%", background: "#fff",
        transition: "left 0.2s",
      }} />
    </div>
  );
}

function EventTypeIcon({ type }) {
  const icons = { interview: "🎯", deadline: "⚠️", event: "📅", test: "📝" };
  return <span style={{ fontSize: 16 }}>{icons[type] || "📌"}</span>;
}

function AlarmCard({ alarm, onSnooze, onDismiss }) {
  const typeColors = { interview: "#3b82f6", deadline: "#ef4444", test: "#f59e0b" };
  const color = typeColors[alarm.type] || ACCENT;
  return (
    <div style={{
      background: CARD_BG, border: `1px solid ${CARD_BORDER}`, borderRadius: 12,
      padding: "16px", marginBottom: 12, opacity: alarm.active ? 1 : 0.5,
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 8, background: color + "22",
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18,
          }}>🔔</div>
          <div>
            <div style={{ fontWeight: 600, fontSize: 14, color: "#f1f5f9" }}>{alarm.title}</div>
            <div style={{ fontSize: 12, color: MUTED }}>{alarm.subtitle}</div>
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontWeight: 700, fontSize: 20, color: alarm.active ? color : MUTED }}>{alarm.time}</div>
          <div style={{ fontSize: 11, color: alarm.active ? ACCENT : MUTED }}>{alarm.countdown}</div>
        </div>
      </div>
      {alarm.active && (
        <div style={{ display: "flex", gap: 8 }}>
          {["5m Snooze", "Alert", "Adjust"].map(action => (
            <button
              key={action}
              onClick={() => action.includes("Snooze") ? onSnooze(alarm.id) : onDismiss(alarm.id)}
              style={{
                flex: 1, padding: "7px 0", borderRadius: 8, border: `1px solid ${CARD_BORDER}`,
                background: "transparent", color: "#94a3b8", fontSize: 12, cursor: "pointer",
              }}
            >
              {action}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function NotificationPage() {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [selectedDay, setSelectedDay] = useState(today.getDate());
  const [events, setEvents] = useState(mockEvents);
  const [notifications, setNotifications] = useState(mockNotifications);
  const [alarms, setAlarms] = useState(mockAlarms);
  const [activeTab, setActiveTab] = useState("calendar");
  const [filter, setFilter] = useState("All Alarms");

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDay(year, month);
  const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7;

  const unreadCount = notifications.filter(n => !n.read).length;
  const activeAlarms = alarms.filter(a => a.active).length;

  function prevMonth() {
    if (month === 0) { setMonth(11); setYear(y => y - 1); }
    else setMonth(m => m - 1);
  }
  function nextMonth() {
    if (month === 11) { setMonth(0); setYear(y => y + 1); }
    else setMonth(m => m + 1);
  }
  function toggleEvent(id) {
    setEvents(ev => ev.map(e => e.id === id ? { ...e, enabled: !e.enabled } : e));
  }
  function markRead(id) {
    setNotifications(ns => ns.map(n => n.id === id ? { ...n, read: true } : n));
  }
  function markAllRead() {
    setNotifications(ns => ns.map(n => ({ ...n, read: true })));
  }
  function snoozeAlarm(id) {
    setAlarms(as => as.map(a => a.id === id ? { ...a, countdown: "Snoozed 5m" } : a));
  }
  function dismissAlarm(id) {
    setAlarms(as => as.map(a => a.id === id ? { ...a, active: false, countdown: "Dismissed" } : a));
  }

  const filteredAlarms = filter === "All Alarms" ? alarms
    : filter === "Interview" ? alarms.filter(a => a.type === "interview")
    : alarms.filter(a => a.type === "deadline");

  const tabStyle = (tab) => ({
    flex: 1, padding: "10px 0", border: "none", cursor: "pointer",
    borderRadius: 8, fontSize: 13, fontWeight: 500,
    background: activeTab === tab ? ACCENT : "transparent",
    color: activeTab === tab ? "#000" : MUTED,
    transition: "all 0.2s",
  });

  const dayHasEvent = (d) => {
    if (month === 8 && year === 2024) {
      if (d === 13) return true;
      if (d === 16) return true;
    }
    return false;
  };

  return (
    <div style={{
      minHeight: "100vh", background: DARK_BG, color: "#f1f5f9",
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif", padding: "0 0 80px",
    }}>

      {/* Header */}
      <div style={{
        padding: "20px 20px 0", display: "flex",
        justifyContent: "space-between", alignItems: "center",
      }}>
        <div style={{ fontSize: 18, fontWeight: 700, color: ACCENT }}>
          🎓 Placement Portal
        </div>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          {unreadCount > 0 && (
            <div style={{
              width: 20, height: 20, borderRadius: "50%", background: "#ef4444",
              fontSize: 11, fontWeight: 700, color: "#fff",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>{unreadCount}</div>
          )}
          <div style={{
            width: 32, height: 32, borderRadius: "50%",
            background: ACCENT + "22", display: "flex",
            alignItems: "center", justifyContent: "center", fontSize: 14,
          }}>👤</div>
        </div>
      </div>

      {/* Tab Switcher */}
      <div style={{ padding: "16px 20px 0" }}>
        <div style={{ display: "flex", gap: 4, background: CARD_BG, borderRadius: 10, padding: 4 }}>
          {["calendar", "notifications", "alarms"].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={tabStyle(tab)}>
              {tab === "calendar" ? "📅 Calendar"
                : tab === "notifications" ? `🔔 Alerts${unreadCount ? ` (${unreadCount})` : ""}`
                : "⏰ Alarms"}
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding: "16px 20px 0" }}>

        {/* CALENDAR TAB */}
        {activeTab === "calendar" && (
          <div>
            <div style={{
              background: "#1e1206", border: "1px solid #f59e0b44",
              borderRadius: 12, padding: "14px 16px", marginBottom: 16,
            }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#f59e0b", letterSpacing: 1, marginBottom: 4 }}>
                ⚠ CRITICAL DEADLINE
              </div>
              <div style={{ fontSize: 13, color: "#fcd34d" }}>
                Application closing in 4 hours. Ensure all documents are verified.
              </div>
              <button style={{
                marginTop: 12, width: "100%", padding: "10px", borderRadius: 8,
                border: "none", background: ACCENT, color: "#000",
                fontWeight: 700, fontSize: 13, cursor: "pointer",
              }}>
                Submit Application Now
              </button>
            </div>

            <div style={{
              background: CARD_BG, borderRadius: 14,
              border: `1px solid ${CARD_BORDER}`, padding: "16px", marginBottom: 16,
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <button onClick={prevMonth} style={{ background: "none", border: "none", color: MUTED, fontSize: 18, cursor: "pointer" }}>‹</button>
                <span style={{ fontWeight: 700, fontSize: 15 }}>{MONTHS[month]} {year}</span>
                <button onClick={nextMonth} style={{ background: "none", border: "none", color: MUTED, fontSize: 18, cursor: "pointer" }}>›</button>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4, marginBottom: 8 }}>
                {DAYS.map((d, i) => (
                  <div key={i} style={{ textAlign: "center", fontSize: 11, color: MUTED, fontWeight: 600 }}>{d}</div>
                ))}
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4 }}>
                {Array.from({ length: totalCells }).map((_, i) => {
                  const dayNum = i - firstDay + 1;
                  const isValid = dayNum >= 1 && dayNum <= daysInMonth;
                  const isToday = isValid && dayNum === today.getDate() && month === today.getMonth() && year === today.getFullYear();
                  const isSelected = isValid && dayNum === selectedDay;
                  const hasEvent = isValid && dayHasEvent(dayNum);
                  return (
                    <div
                      key={i}
                      onClick={() => isValid && setSelectedDay(dayNum)}
                      style={{
                        height: 34, borderRadius: 8, display: "flex", flexDirection: "column",
                        alignItems: "center", justifyContent: "center", fontSize: 13,
                        cursor: isValid ? "pointer" : "default",
                        background: isSelected && !isToday ? ACCENT + "33" : "transparent",
                        color: isValid ? (isToday ? "#000" : "#f1f5f9") : "transparent",
                        position: "relative",
                        ...(isToday ? { background: ACCENT, borderRadius: "50%", width: 34, margin: "0 auto" } : {}),
                      }}
                    >
                      {isValid ? dayNum : ""}
                      {hasEvent && !isToday && (
                        <div style={{ width: 4, height: 4, borderRadius: "50%", background: ACCENT, position: "absolute", bottom: 3 }} />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <span style={{ fontWeight: 700, fontSize: 15 }}>Upcoming Events</span>
              <span style={{ fontSize: 12, color: ACCENT, cursor: "pointer" }}>View all</span>
            </div>

            {events.map(ev => (
              <div key={ev.id} style={{
                background: CARD_BG, border: `1px solid ${CARD_BORDER}`, borderRadius: 12,
                padding: "14px 16px", marginBottom: 10, display: "flex", alignItems: "center", gap: 12,
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 8,
                  background: ev.type === "deadline" ? "#ef444422" : ACCENT + "22",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <EventTypeIcon type={ev.type} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{ev.title}</div>
                  <div style={{ fontSize: 12, color: MUTED }}>{ev.company}</div>
                  <div style={{ fontSize: 11, color: MUTED, marginTop: 4 }}>
                    🕐 {ev.time} &nbsp; 📅 {ev.date}
                  </div>
                </div>
                {ev.type !== "deadline" && <Toggle enabled={ev.enabled} onChange={() => toggleEvent(ev.id)} />}
                {ev.type === "deadline" && (
                  <div style={{
                    width: 36, height: 36, borderRadius: "50%", background: ACCENT,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 20, color: "#000", cursor: "pointer", fontWeight: 700,
                  }}>+</div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* NOTIFICATIONS TAB */}
        {activeTab === "notifications" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <span style={{ fontWeight: 700, fontSize: 15 }}>Recent Notifications</span>
              {unreadCount > 0 && (
                <span onClick={markAllRead} style={{ fontSize: 12, color: ACCENT, cursor: "pointer" }}>
                  Mark all read
                </span>
              )}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
              {[
                { label: "Applied", value: "12", sub: "↑ +2 this week", color: ACCENT },
                { label: "Interviews", value: "04", sub: "Next tomorrow", color: "#3b82f6" },
              ].map(stat => (
                <div key={stat.label} style={{
                  background: CARD_BG, border: `1px solid ${CARD_BORDER}`,
                  borderRadius: 12, padding: "14px 16px",
                }}>
                  <div style={{ fontSize: 12, color: MUTED, marginBottom: 4 }}>{stat.label}</div>
                  <div style={{ fontSize: 28, fontWeight: 700, color: stat.color }}>{stat.value}</div>
                  <div style={{ fontSize: 11, color: stat.color, marginTop: 2 }}>{stat.sub}</div>
                </div>
              ))}
            </div>

            {notifications.map(n => (
              <div
                key={n.id}
                onClick={() => markRead(n.id)}
                style={{
                  background: CARD_BG,
                  border: `1px solid ${n.read ? CARD_BORDER : ACCENT + "44"}`,
                  borderRadius: 12, padding: "14px 16px", marginBottom: 10,
                  cursor: "pointer", display: "flex", gap: 12, alignItems: "flex-start",
                  position: "relative",
                }}
              >
                {!n.read && (
                  <div style={{
                    position: "absolute", top: 14, right: 14,
                    width: 8, height: 8, borderRadius: "50%", background: ACCENT,
                  }} />
                )}
                <div style={{
                  width: 36, height: 36, borderRadius: "50%", flexShrink: 0,
                  background: n.color + "22", display: "flex", alignItems: "center",
                  justifyContent: "center", fontSize: 14, color: n.color,
                }}>
                  {n.icon}
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 2 }}>{n.title}</div>
                  <div style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.4 }}>{n.body}</div>
                  <div style={{ fontSize: 11, color: MUTED, marginTop: 6 }}>{n.time}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ALARMS TAB */}
        {activeTab === "alarms" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div>
                <div style={{ fontSize: 11, color: ACCENT, fontWeight: 600, letterSpacing: 1 }}>ACTIVE SCHEDULE</div>
                <div style={{ fontSize: 18, fontWeight: 700 }}>Reminders</div>
              </div>
              <button style={{
                padding: "8px 14px", borderRadius: 8, border: "none",
                background: ACCENT, color: "#000", fontWeight: 700, fontSize: 13, cursor: "pointer",
              }}>+ Add New Alarm</button>
            </div>

            <div style={{ display: "flex", gap: 8, marginBottom: 16, overflowX: "auto", paddingBottom: 4 }}>
              {["All Alarms", "Interview", "Deadlines"].map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  style={{
                    padding: "6px 14px", borderRadius: 20,
                    border: `1px solid ${filter === f ? ACCENT : CARD_BORDER}`,
                    background: filter === f ? ACCENT + "22" : "transparent",
                    color: filter === f ? ACCENT : MUTED,
                    fontSize: 12, cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0,
                  }}
                >{f}</button>
              ))}
            </div>

            {filteredAlarms.map(alarm => (
              <AlarmCard key={alarm.id} alarm={alarm} onSnooze={snoozeAlarm} onDismiss={dismissAlarm} />
            ))}

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 8 }}>
              <div style={{
                background: CARD_BG, border: `1px solid ${CARD_BORDER}`,
                borderRadius: 12, padding: "16px", textAlign: "center",
              }}>
                <div style={{ fontSize: 36, fontWeight: 700, color: ACCENT }}>{activeAlarms}</div>
                <div style={{ fontSize: 12, color: MUTED }}>Active Alarms</div>
              </div>
              <div style={{
                background: CARD_BG, border: `1px solid ${CARD_BORDER}`,
                borderRadius: 12, padding: "16px", textAlign: "center",
              }}>
                <div style={{ fontSize: 36, fontWeight: 700, color: "#3b82f6" }}>85%</div>
                <div style={{ fontSize: 12, color: MUTED }}>Punctuality Score</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Nav */}
      <div style={{
        position: "fixed", bottom: 0, left: 0, right: 0,
        background: "#12151f", borderTop: `1px solid ${CARD_BORDER}`,
        display: "flex", justifyContent: "space-around", padding: "12px 0 20px",
      }}>
        {[
          { icon: "🏠", label: "Home" },
          { icon: "📅", label: "Calendar", tab: "calendar" },
          { icon: "⏰", label: "Alarms", tab: "alarms" },
          { icon: "👤", label: "Profile" },
        ].map(item => (
          <div
            key={item.label}
            onClick={() => item.tab && setActiveTab(item.tab)}
            style={{
              display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
              cursor: "pointer", opacity: activeTab === item.tab ? 1 : 0.5,
            }}
          >
            <span style={{ fontSize: 20 }}>{item.icon}</span>
            <span style={{
              fontSize: 10, color: activeTab === item.tab ? ACCENT : MUTED, fontWeight: 500,
            }}>{item.label}</span>
          </div>
        ))}
      </div>

    </div>
  );
}