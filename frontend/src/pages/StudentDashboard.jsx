import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function StudentDashboard() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [schedule, setSchedule] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [registeredEvents, setRegisteredEvents] = useState([]);

  useEffect(() => {
    api.get("/students/me").then((res) => setProfile(res.data)).catch(() => {});
    api.get("/students/me/schedule").then((res) => setSchedule(res.data)).catch(() => {});
    api.get("/students/me/notifications").then((res) => setNotifications(res.data)).catch(() => {});
    api.get("/students/me/registered-events").then((res) => setRegisteredEvents(res.data)).catch(() => {});
  }, []);

  if (!profile) return <div className="max-w-4xl mx-auto px-4 py-16 text-center text-gray-500">Loading profile...</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-navy mb-1">Welcome, {profile.fullName}</h1>
        <p className="text-gray-600">{profile.email} • {profile.phoneNumber}</p>
      </div>

      {/* Notifications / Announcements Section */}
      <div className="border rounded-xl p-6 bg-amber-50/50 border-amber-200 shadow-sm">
        <h3 className="font-bold text-navy text-lg mb-3 flex items-center gap-2">
          📢 Announcements & Notifications
        </h3>
        {notifications.length === 0 ? (
          <p className="text-sm text-gray-500 italic">No new announcements from admin.</p>
        ) : (
          <div className="space-y-3">
            {notifications.map((n) => (
              <div key={n.id} className="bg-white p-4 rounded-lg border border-amber-100 shadow-xs">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="font-semibold text-navy text-base">{n.title}</h4>
                  <span className="text-xs text-gray-400">{new Date(n.createdAt).toLocaleDateString()}</span>
                </div>
                <p className="text-sm text-gray-700 whitespace-pre-wrap">{n.message}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="border rounded-xl p-6 bg-cream border-amber-100">
          <h3 className="font-semibold text-navy mb-2 text-lg">Registration Status</h3>
          <p className="inline-block text-sm px-3.5 py-1 rounded-full font-semibold bg-emerald-100 text-emerald-800">
            Confirmed (Free Course)
          </p>
          <p className="text-xs text-gray-600 mt-2">
            You have full access to all course sessions and resources.
          </p>
        </div>

        <div className="border rounded-xl p-6 bg-white">
          <h3 className="font-semibold text-navy mb-2 text-lg">Profile Details</h3>
          <p className="text-sm text-gray-600"><strong>College:</strong> {profile.College?.name || "—"}</p>
          <p className="text-sm text-gray-600"><strong>Phone:</strong> {profile.phoneNumber}</p>
          <p className="text-sm text-gray-600"><strong>Address:</strong> {profile.address}</p>
        </div>
      </div>

      {/* My Registered Programs / Events */}
      <div className="border rounded-xl p-6 bg-white">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-navy text-lg">My Registered Events</h3>
          <Link to="/events" className="text-sm font-semibold text-saffron hover:underline">
            View All Programs →
          </Link>
        </div>
        {registeredEvents.length === 0 ? (
          <p className="text-sm text-gray-500">You haven't registered for any events yet.</p>
        ) : (
          <div className="grid sm:grid-cols-2 gap-4">
            {registeredEvents.map((ev) => (
              <div key={ev.id} className="border rounded-lg p-4 bg-gray-50/50 flex flex-col justify-between">
                <div>
                  {ev.posterUrl && (
                    <img
                      src={ev.posterUrl}
                      alt={ev.title}
                      className="w-full h-32 object-cover rounded-md mb-3"
                    />
                  )}
                  <h4 className="font-semibold text-navy">{ev.title}</h4>
                  <p className="text-xs text-gray-500 mt-1">📅 {new Date(ev.dateTime).toLocaleString()}</p>
                  {ev.venue && <p className="text-xs text-gray-600 mt-0.5">📍 {ev.venue}</p>}
                </div>
                <span className="mt-3 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded inline-block self-start border border-emerald-200">
                  ✓ Registered
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Upcoming Program Schedule */}
      <div>
        <h3 className="font-bold text-navy text-lg mb-4">Upcoming Schedule</h3>
        {schedule.length === 0 && <p className="text-gray-500 text-sm">No upcoming programs yet.</p>}
        <div className="space-y-3">
          {schedule.map((e) => (
            <div key={e.id} className="border rounded-xl p-4 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <p className="font-semibold text-navy">{e.title}</p>
                <p className="text-xs text-gray-500">📅 {new Date(e.dateTime).toLocaleString()}</p>
                {e.venue && <p className="text-xs text-gray-600">📍 {e.venue}</p>}
              </div>
              {e.joiningLink && (
                <a
                  href={e.joiningLink}
                  className="bg-navy text-white text-xs font-semibold px-4 py-2 rounded-lg hover:opacity-90 self-start sm:self-auto text-center"
                  target="_blank"
                  rel="noreferrer"
                >
                  Join Link
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
