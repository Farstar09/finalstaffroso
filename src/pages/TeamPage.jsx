import React from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { teams } from "../data/TeamData";

export default function TeamPage() {
  const { teamName } = useParams();
  const decodedName = decodeURIComponent(teamName);

  const team = teams[decodedName];

  if (!team) {
    return (
      <div className="text-center text-white p-20">
        <h1 className="text-3xl font-bold mb-4">Team Not Found</h1>
        <Link to="/" className="text-red-400 underline">
          Return Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white px-6 py-20 max-w-5xl mx-auto">
      <Link to="/" className="text-red-400 underline">← Back</Link>

      <div className="text-center mt-6">
        <img
          src={team.logo}
          alt={decodedName}
          className="w-40 h-40 mx-auto mb-4 object-contain"
        />
        <h1 className="text-4xl font-bold">{decodedName}</h1>
      </div>

      {/* Manager */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-3 text-red-400">Manager</h2>
        <p>{team.manager.name || "TBD"} — {team.manager.discord || "No Discord"}</p>
      </div>

      {/* Coaches */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-3 text-red-400">Coaching Staff</h2>
        {team.coaches.length === 0 ? (
          <p className="opacity-60">No coaches listed.</p>
        ) : (
          <ul className="space-y-2">
            {team.coaches.map((c, i) => (
              <li key={i}>{c.name} — {c.discord || "No Discord"}</li>
            ))}
          </ul>
        )}
      </div>

      {/* Roster */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-3 text-red-400">Roster</h2>
        <ul className="space-y-3">
          {team.roster.map((p, i) => (
            <li key={i} className="bg-white/5 p-4 rounded-xl border border-white/10">
              <p className="text-lg font-semibold">{p.name}</p>
              <p className="opacity-70">{p.role}</p>
              <p className="opacity-60">{p.discord || "No Discord"}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Recent wins */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-3 text-red-400">Recent Wins</h2>
        {team.recentWins.length === 0 ? (
          <p className="opacity-60">No recent wins listed.</p>
        ) : (
          <ul className="space-y-2">
            {team.recentWins.map((w, i) => (
              <li key={i}>{w}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
