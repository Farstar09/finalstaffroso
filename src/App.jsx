import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// === LOGO HANDLING ===
// Make sure this file exists: public/assets/ROSO_Owner.png
const LOGO_SRC = "assets/ROSO_Owner.png";
const LOGO_FALLBACK =
  "https://placehold.co/256x256/000000/FF0000?text=ROSO";

function LogoImage({ className = "", alt = "ROSO Logo" }) {
  return (
    <img
      src={LOGO_SRC}
      alt={alt}
      className={className}
      onError={(e) => {
        e.currentTarget.onerror = null;
        e.currentTarget.src = LOGO_FALLBACK;
      }}
    />
  );
}

// === PRELOADER WITH CRACK + EXPLOSION ===
function Preloader() {
  return (
    <motion.div
      className="fixed inset-0 z-[999] bg-black flex items-center justify-center overflow-hidden"
      initial={{ opacity: 1, scale: 1 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 3 }} // screen explodes from center
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      {/* global scanlines over the whole screen */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.07] mix-blend-overlay
                   bg-[linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)]
                   bg-[length:100%_3px]"
      />

      {/* logo + glow + crack */}
      <div className="relative z-10 flex flex-col items-center">
        {/* red glow around logo */}
        <motion.div
          className="absolute -inset-20 blur-3xl"
          initial={{ opacity: 0.25, scale: 0.9 }}
          animate={{
            opacity: [0.2, 0.7, 0.3, 0.8, 0.35],
            scale: [0.9, 1.05, 1, 1.08, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "mirror",
          }}
          style={{
            background:
              "radial-gradient(circle at center, rgba(248,113,113,0.85), transparent 70%)",
          }}
        />

        {/* main logo breathing */}
        <motion.div
          className="relative z-10 w-32 h-32 md:w-40 md:h-40 flex items-center justify-center"
          initial={{ opacity: 0.3, scale: 0.95 }}
          animate={{
            opacity: [0.3, 1, 0.7, 1],
            scale: [0.95, 1, 0.98, 1.02, 1],
          }}
          transition={{ duration: 1.8, repeat: Infinity, repeatType: "mirror" }}
        >
          <LogoImage className="w-full h-full object-contain drop-shadow-[0_0_32px_rgba(248,113,113,0.9)]" />
        </motion.div>

        {/* crack / glitch duplicate */}
        <motion.div
          className="absolute z-20 w-32 h-32 md:w-40 md:h-40 mix-blend-screen"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.9, 0],
            x: [0, -5, 6, -3, 0],
            y: [0, -2, 2, -1, 0],
            skewX: [0, -4, 4, -2, 0],
          }}
          transition={{
            duration: 0.35,
            repeat: Infinity,
            repeatDelay: 2.2, // crack every ~2.2s
          }}
        >
          <LogoImage className="w-full h-full object-contain" />
        </motion.div>

        {/* tagline */}
        <motion.span
          className="relative z-40 mt-6 text-[10px] md:text-xs tracking-[0.35em] uppercase text-red-400/80"
          initial={{ opacity: 0.3 }}
          animate={{ opacity: [0.3, 1, 0.5, 1, 0.6] }}
          transition={{ duration: 1.8, repeat: Infinity }}
        >
          NEVER STOP WINNING
        </motion.span>
      </div>
    </motion.div>
  );
}

// === MAIN APP (handles preloader + page slide-in) ===
export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // let the logo breathe + crack once before exploding
    const t = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {loading ? (
        <Preloader key="preloader" />
      ) : (
        <motion.div
          key="page"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative min-h-screen bg-black text-white font-sans overflow-x-hidden"
        >
          {/* Floating watermark */}
          <div className="pointer-events-none fixed inset-0 z-0 flex items-center justify-center opacity-[0.04]">
            <LogoImage
              alt="ROSO Watermark"
              className="w-[60vh] max-w-[600px] object-contain"
            />
          </div>

          {/* Main content above watermark */}
          <div className="relative z-10">
            <Navbar />
            <Hero />
            <Teams />
            <Ownership />
            <NewsSection />
            <Footer />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// === NAVBAR ===
function Navbar() {
  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="w-full fixed top-0 left-0 z-50 bg-black/70 backdrop-blur-xl border-b border-red-600/20"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo + wordmark */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg flex items-center justify-center overflow-hidden">
            <LogoImage alt="ROSO Logo" className="w-full h-full object-contain" />
          </div>
          <span className="text-lg font-semibold tracking-wide">
            ROSOIDEAE ESPORTS
          </span>
        </div>

        <div className="hidden md:flex gap-10 text-sm opacity-80">
          <a href="#teams" className="hover:text-red-500">
            Teams
          </a>
          <a href="#ownership" className="hover:text-red-500">
            Ownership
          </a>
          <a href="#news" className="hover:text-red-500">
            Socials
          </a>
        </div>
      </div>
    </motion.nav>
  );
}

// === HERO SECTION ===
function Hero() {
  return (
    <section className="relative h-[90vh] w-full flex items-center justify-center overflow-hidden">
      {/* animated dark backdrop */}
      <motion.div
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/90"></div>
      </motion.div>

      {/* content + animated glow behind title */}
      <div className="relative z-10 text-center px-6">
        <motion.div
          className="pointer-events-none absolute inset-x-0 -top-10 mx-auto h-40 max-w-xl blur-3xl opacity-70"
          initial={{ opacity: 0.2, scale: 0.9 }}
          animate={{ opacity: [0.2, 0.6, 0.3, 0.7], scale: [0.9, 1.05, 1] }}
          transition={{ duration: 6, repeat: Infinity, repeatType: "mirror" }}
          style={{
            background:
              "radial-gradient(circle at top, rgba(248,113,113,0.6), transparent 60%)",
          }}
        />

        <motion.h1
          className="relative text-5xl md:text-7xl font-extrabold tracking-tight mb-4"
          initial={{ opacity: 0.9 }}
          animate={{ opacity: [0.9, 1, 0.6, 1, 0.8, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          WHERE TALENT BLOOMS
        </motion.h1>

        <p className="text-lg md:text-xl opacity-80 max-w-2xl mx-auto">
          ROSOIDEAE — A New Era of Competitive Esports.
        </p>
      </div>
    </section>
  );
}

// === TEAMS SECTION ===
function Teams() {
 const valorantTeams = [
  "ROSO ROYAL",
  "ROSO HYACINTH",
  "ROSO SAPPHIRE",
  "ROSO CORE",
  "ROSO GC ACADEMY",
  "ROSO EIDO",
];


  return (
    <section id="teams" className="py-24 px-6 max-w-7xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold mb-12 text-center"
      >
        Valorant Teams
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {valorantTeams.map((team) => (
  <motion.div
    key={team}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <a href={`/team/${encodeURIComponent(team)}`}>
      <div className="bg-white/5 p-8 rounded-xl border border-white/10 hover:border-red-600/40 transition cursor-pointer">
        <h3 className="text-2xl font-semibold mb-2 text-red-500">{team}</h3>
        <p className="opacity-80">
          {team === "ROSO ROYAL"
            ? "Esports Academy Team"
            : "Official ROSO Valorant Team"}
        </p>
      </div>
    </a>
  </motion.div>
))}

      </div>
    </section>
  );
}

// === OWNERSHIP SECTION ===
function Ownership() {
  const ownership = [
    { name: "Attract", primary: "FOUNDER", roles: ["Owner", "Social Media Manager"] },
    { name: "Star", primary: "Owner / Lead Manager", roles: ["Lead HR", "Lead Admin"] },
    { name: "Verify Redd", primary: "Owner", roles: ["Tournament Director"] },
    { name: "TBD", primary: "To Be Announced", roles: [] },
  ];

  return (
    <section id="ownership" className="py-24 px-6 max-w-7xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold mb-12 text-center"
      >
        Ownership
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {ownership.map((owner) => (
          <motion.div
            key={owner.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white/5 p-8 rounded-xl border border-white/10 text-center"
          >
            <h3 className="text-2xl font-bold text-red-500">{owner.name}</h3>
            <p className="opacity-80 mt-2 text-sm uppercase tracking-wide">
              {owner.primary}
            </p>
            {owner.roles.length > 0 && (
              <div className="mt-3 space-y-1 text-xs opacity-70">
                {owner.roles.map((r, i) => (
                  <div key={i}>{r}</div>
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// === SOCIALS SECTION ===
function NewsSection() {
  return (
    <section id="news" className="py-24 px-6 max-w-7xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold mb-12 text-center"
      >
        Socials
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Twitter */}
        <motion.a
          href="https://x.com/RosoideaeGG"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/5 rounded-xl p-6 border border-white/10 text-center hover:border-red-600/40 transition cursor-pointer"
        >
          <h3 className="text-2xl font-semibold mb-2 text-blue-400">Twitter</h3>
          <p className="opacity-70 text-sm">Follow our official updates.</p>
        </motion.a>

        {/* Discord */}
        <motion.a
          href="https://discord.com/invite/roso"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/5 rounded-xl p-6 border border-white/10 text-center hover:border-red-600/40 transition cursor-pointer"
        >
          <h3 className="text-2xl font-semibold mb-2 text-indigo-400">Discord</h3>
          <p className="opacity-70 text-sm">Join the ROSO community.</p>
        </motion.a>

        {/* YouTube */}
        <motion.a
          href="https://www.youtube.com/@RosoEsports"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/5 rounded-xl p-6 border border-white/10 text-center hover:border-red-600/40 transition cursor-pointer"
        >
          <h3 className="text-2xl font-semibold mb-2 text-red-500">YouTube</h3>
          <p className="opacity-70 text-sm">Watch match VODs and highlights.</p>
        </motion.a>
      </div>
    </section>
  );
}

// === FOOTER ===
function Footer() {
  return (
    <footer className="py-10 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-3">
        <div className="w-10 h-10 opacity-80">
          <LogoImage
            alt="ROSOIDEAE Footer Logo"
            className="w-full h-full object-contain"
          />
        </div>
        <div className="text-xs md:text-sm opacity-60 text-center">
          © {new Date().getFullYear()} ROSOIDEAE ESPORTS. All Rights Reserved.
        </div>
        <div className="text-[10px] uppercase tracking-[0.2em] opacity-40">
          WHERE TALENT BLOOMS
        </div>
      </div>
    </footer>
  );
}
