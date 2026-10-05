import React, { useCallback, useEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";
import { motion, useMotionValue, useReducedMotion } from "motion/react";
import { PROFILE } from "../../data/profileData";
import { BadgeCheck, MapPin, Sparkles } from "lucide-react";
import latestUserPhoto from "../../assets/images/user_photo_latest.jpg";

export interface HangingIdCardProps {
  key?: React.Key;
  /** Nama yang tertera di ID card */
  name?: string;
  /** Role atau jabatan */
  role?: string;
  /** Sub-role atau deskripsi singkat keahlian */
  subRole?: string;
  /** Nomor ID / Badge serial number */
  badgeId?: string;
  /** Warna aksen kartu & header (hex/rgb/hsl) */
  accentColor?: string;
  /** Panjang tali lanyard dalam piksel */
  ropeLength?: number;
  /** Warna tali lanyard */
  ropeColor?: string;
  /** URL foto / avatar */
  avatarUrl?: string;
  /** Alias untuk avatarUrl */
  photoUrl?: string;
  /** Gelar atau pendidikan */
  degree?: string;
  /** Status ketersediaan (misal: "Available for Projects") */
  statusText?: string;
  /** Studio, lab, atau organisasi */
  organization?: string;
  /** Lokasi (kota / negara) */
  location?: string;
  /** Kelas styling tambahan untuk wrapper container */
  className?: string;
  /** Custom body konten jika ingin menggantikan layout default */
  children?: React.ReactNode;
}

// Fisika konstanta untuk Pendulum Harmonic Oscillator
const GRAVITY = 3200;
const DAMPING = 0.93;
const MASS = 1;
const MAX_ANGLE = 1.35; // ~77 derajat limit aman ayunan

/**
 * Tali Lanyard SVG dinamis yang beradaptasi dengan `ropeLength` dan `ropeColor`
 */
function DynamicRope({
  length = 120,
  color = "#18181b",
  accentColor = "#ef4444",
}: {
  length: number;
  color: string;
  accentColor: string;
}) {
  const strapHeight = Math.max(50, length);
  const hookY = strapHeight;
  const totalSvgHeight = strapHeight + 56; // Strap + metal clasp & hook

  return (
    <svg
      className="overflow-visible pointer-events-none select-none transition-all duration-300"
      style={{
        width: 76,
        height: totalSvgHeight,
      }}
      viewBox={`0 0 76 ${totalSvgHeight}`}
      aria-hidden="true"
    >
      <defs>
        {/* Gradien tekstur tali utama */}
        <linearGradient
          id={`strap-grad-${color.replace("#", "")}`}
          x1="0"
          x2="1"
        >
          <stop offset="0%" stopColor="#0a0a0f" />
          <stop offset="25%" stopColor={color} />
          <stop offset="50%" stopColor="#27272a" />
          <stop offset="75%" stopColor={color} />
          <stop offset="100%" stopColor="#09090b" />
        </linearGradient>

        {/* Gradien strip aksen warna */}
        <linearGradient
          id={`strap-accent-${accentColor.replace("#", "")}`}
          x1="0"
          x2="1"
        >
          <stop offset="0%" stopColor={accentColor} stopOpacity="0.8" />
          <stop offset="50%" stopColor={accentColor} stopOpacity="1" />
          <stop offset="100%" stopColor={accentColor} stopOpacity="0.75" />
        </linearGradient>

        {/* Gradien metalik titanium untuk pengait */}
        <linearGradient id="metal-sheen" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#e2e8f0" />
          <stop offset="30%" stopColor="#64748b" />
          <stop offset="55%" stopColor="#94a3b8" />
          <stop offset="85%" stopColor="#334155" />
          <stop offset="100%" stopColor="#1e293b" />
        </linearGradient>

        {/* Rivet baut logam */}
        <radialGradient id="clasp-rivet" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#f1f5f9" />
          <stop offset="40%" stopColor="#94a3b8" />
          <stop offset="100%" stopColor="#334155" />
        </radialGradient>
      </defs>

      {/* Tali Lanyard Utama */}
      <rect
        x="24"
        y="0"
        width="28"
        height={strapHeight}
        rx="5"
        fill={`url(#strap-grad-${color.replace("#", "")})`}
        stroke="#ffffff"
        strokeOpacity="0.08"
        strokeWidth="1"
      />

      {/* Garis Aksen Sisi Kiri */}
      <rect
        x="25.5"
        y="0"
        width="2.5"
        height={strapHeight - 2}
        fill={`url(#strap-accent-${accentColor.replace("#", "")})`}
        opacity="0.95"
      />

      {/* Garis Aksen Sisi Kanan */}
      <rect
        x="48"
        y="0"
        width="2.5"
        height={strapHeight - 2}
        fill={`url(#strap-accent-${accentColor.replace("#", "")})`}
        opacity="0.95"
      />

      {/* Jahitan Benang Halus Tekstur Kain */}
      <line
        x1="31"
        y1="2"
        x2="31"
        y2={strapHeight - 2}
        stroke="#ffffff"
        opacity="0.15"
        strokeDasharray="3 3"
      />
      <line
        x1="45"
        y1="2"
        x2="45"
        y2={strapHeight - 2}
        stroke="#ffffff"
        opacity="0.15"
        strokeDasharray="3 3"
      />

      {/* === KLIP LOGAM (METAL CLAMP) === */}
      <g transform={`translate(0, ${hookY - 6})`}>
        {/* Badan Klip Penjepit Logam */}
        <rect
          x="22"
          y="0"
          width="32"
          height="16"
          rx="3"
          fill="url(#metal-sheen)"
          stroke="#0f172a"
          strokeWidth="0.8"
        />
        {/* Garis bevel atas & bawah klip */}
        <line
          x1="23"
          y1="1"
          x2="53"
          y2="1"
          stroke="#ffffff"
          strokeOpacity="0.6"
        />
        <line
          x1="23"
          y1="15"
          x2="53"
          y2="15"
          stroke="#000000"
          strokeOpacity="0.4"
        />

        {/* Rivet Kiri */}
        <circle
          cx="28"
          cy="8"
          r="2.6"
          fill="url(#clasp-rivet)"
          stroke="#1e293b"
          strokeWidth="0.5"
        />
        {/* Rivet Kanan */}
        <circle
          cx="48"
          cy="8"
          r="2.6"
          fill="url(#clasp-rivet)"
          stroke="#1e293b"
          strokeWidth="0.5"
        />

        {/* Aksen tengah klip */}
        <rect
          x="35"
          y="3"
          width="6"
          height="10"
          rx="1.5"
          fill="#0f172a"
          opacity="0.35"
        />

        {/* Ring Pengait Cincin */}
        <path
          d="M 32 16 C 32 24, 44 24, 44 16"
          fill="none"
          stroke="url(#metal-sheen)"
          strokeWidth="3.5"
          strokeLinecap="round"
        />

        {/* Cincin Logam Tengah (Swivel Ring) */}
        <circle
          cx="38"
          cy="26"
          r="6.5"
          fill="none"
          stroke="url(#metal-sheen)"
          strokeWidth="3"
        />

        {/* Lobster Hook Carabiner */}
        <path
          d="M 35 31 C 32 37, 33 46, 38 48 C 43 46, 44 37, 41 31"
          fill="none"
          stroke="url(#metal-sheen)"
          strokeWidth="3.5"
          strokeLinecap="round"
        />

        {/* Pengunci pegas (Spring gate) */}
        <line
          x1="36"
          y1="34"
          x2="36"
          y2="45"
          stroke="#ffffff"
          strokeWidth="1.6"
          opacity="0.8"
        />

        {/* Ujung Pengait masuk ke slot kartu */}
        <ellipse cx="38" cy="50" rx="2.5" ry="3.5" fill="url(#metal-sheen)" />
      </g>
    </svg>
  );
}

export function HangingIdCard({
  name = "Moh. Rifqi S. Lamadang",
  role = PROFILE.role,
  subRole = "Code • Visuals • Design",
  badgeId = "ID-2026-RIFQI",
  accentColor = "#ef4444",
  ropeLength = 100,
  ropeColor = "#18181b",
  avatarUrl,
  photoUrl,
  degree = PROFILE.degree,
  statusText = "Available for Projects",
  organization = "Web • Photography • Design",
  location = "Palu, Sulawesi Tengah",
  className = "",
  children,
}: HangingIdCardProps) {
  const lenis = useLenis();
  const scrollWasStopped = useRef(false);
  const rotation = useMotionValue(0);
  const reduced = useReducedMotion();
  const setAngle = (radians: number) =>
    rotation.set((-radians * 180) / Math.PI);

  // Physics state stored in refs to avoid re-renders during RAF loop
  const physics = useRef({
    angle: 0,
    velocity: 0,
  });

  const animFrame = useRef<number | null>(null);
  const lastTime = useRef<number | null>(null);
  const prevAngle = useRef(0);
  const dragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartAngle = useRef(0);

  const stageRef = useRef<HTMLDivElement>(null);

  // Effective pendulum arm length scales with ropeLength
  const totalPendulumLength = Math.max(80, ropeLength) + 120;

  /**
   * Mendapatkan koordinat layar titik jangkar gantung (anchor) atas
   */
  const getAnchorCoords = useCallback(() => {
    if (stageRef.current) {
      const rect = stageRef.current.getBoundingClientRect();
      return {
        x: rect.left + rect.width / 2,
        y: rect.top + 8,
      };
    }
    return { x: window.innerWidth / 2, y: 100 };
  }, []);

  /*
   * Physics loop (requestAnimationFrame)
   * Menghitung angular velocity realtime saat dragging untuk flick momentum,
   * dan simulasi pendulum harmonic oscillator saat dilepas.
   */
  const stepPhysics = useCallback(
    (time: number) => {
      if (lastTime.current === null) {
        lastTime.current = time;
      }

      // Cap delta-time ke maksimal 0.05s agar simulasi stabil
      const dt = Math.min((time - lastTime.current) / 1000, 0.05);
      lastTime.current = time;

      const p = physics.current;

      if (dragging.current) {
        if (dt > 0) {
          p.velocity = (p.angle - prevAngle.current) / dt;
        }
        prevAngle.current = p.angle;
        animFrame.current = requestAnimationFrame(stepPhysics);
      } else {
        // Persamaan pendulum gravitasi bertangensial:
        // a = -(GRAVITY / L) * sin(angle) - (DAMPING / MASS) * velocity
        const acceleration =
          -(GRAVITY / totalPendulumLength) * Math.sin(p.angle) -
          (DAMPING / MASS) * p.velocity;

        p.velocity += acceleration * dt;
        p.angle += p.velocity * dt;

        setAngle(p.angle);

        // Terus jalankan frame sampai mendekati hening sempurna
        if (Math.abs(p.angle) > 0.0006 || Math.abs(p.velocity) > 0.0006) {
          animFrame.current = requestAnimationFrame(stepPhysics);
        } else {
          p.angle = 0;
          p.velocity = 0;
          setAngle(0);
          animFrame.current = null;
        }
      }
    },
    [totalPendulumLength],
  );

  /*
   * Mulai physics loop
   */
  const startPhysics = useCallback(() => {
    if (animFrame.current) {
      cancelAnimationFrame(animFrame.current);
    }
    lastTime.current = null;
    animFrame.current = requestAnimationFrame(stepPhysics);
  }, [stepPhysics]);

  /*
   * Impulse hentakan pendulum
   */
  const triggerImpulse = useCallback(
    (impulse = 3.6) => {
      physics.current.velocity = impulse;
      startPhysics();
    },
    [startPhysics],
  );

  /*
   * Pointer down (drag start): Mengikuti posisi kursor secara langsung
   */
  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    event.preventDefault();
    scrollWasStopped.current = !!lenis?.isStopped;
    lenis?.stop();
    dragging.current = true;
    dragStartX.current = event.clientX;
    prevAngle.current = physics.current.angle;
    physics.current.velocity = 0;

    const anchor = getAnchorCoords();
    const dx = event.clientX - anchor.x;
    const dy = Math.max(50, event.clientY - anchor.y);
    const targetAngle = Math.atan2(dx, dy);
    const clampedAngle = Math.max(-MAX_ANGLE, Math.min(MAX_ANGLE, targetAngle));

    physics.current.angle = clampedAngle;
    setAngle(clampedAngle);

    try {
      event.currentTarget.setPointerCapture(event.pointerId);
    } catch {
      // Ignore if pointer capture fails
    }

    if (!animFrame.current) {
      lastTime.current = null;
      animFrame.current = requestAnimationFrame(stepPhysics);
    }
  };

  /*
   * Pointer move (drag move): Menghitung sudut tepat ke posisi pointer saat ini
   */
  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;

    const anchor = getAnchorCoords();
    const dx = event.clientX - anchor.x;
    const dy = Math.max(50, event.clientY - anchor.y);
    const targetAngle = Math.atan2(dx, dy);
    const clampedAngle = Math.max(-MAX_ANGLE, Math.min(MAX_ANGLE, targetAngle));

    physics.current.angle = clampedAngle;
    setAngle(clampedAngle);
  };

  /*
   * Pointer up (drag release with flick velocity)
   */
  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;

    dragging.current = false;
    if (!scrollWasStopped.current) lenis?.start();

    try {
      event.currentTarget.releasePointerCapture(event.pointerId);
    } catch {
      // Ignore
    }

    // Tap impulse: jika tap singkat tanpa drag jauh
    const dragDistance = Math.abs(event.clientX - dragStartX.current);
    if (
      dragDistance < 6 &&
      Math.abs(physics.current.velocity) < 0.25 &&
      Math.abs(physics.current.angle) < 0.08
    ) {
      const anchor = getAnchorCoords();
      const clickFromCenter = event.clientX - anchor.x;
      const dir = clickFromCenter > 0 ? -3.5 : 3.5;
      physics.current.velocity = dir;
    }

    if (!animFrame.current) {
      lastTime.current = null;
      animFrame.current = requestAnimationFrame(stepPhysics);
    }
  };

  /*
   * Click tap impulse ketika kartu diam
   */
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (
      Math.abs(physics.current.velocity) < 0.25 &&
      Math.abs(physics.current.angle) < 0.08
    ) {
      const anchor = getAnchorCoords();
      const clickFromCenter = event.clientX - anchor.x;
      const dir = clickFromCenter > 0 ? -3.5 : 3.5;
      triggerImpulse(dir);
    }
  };

  /*
   * Ayunan inisial saat mount dan saat di-scroll ke viewport
   */
  useEffect(() => {
    const timer = setTimeout(() => {
      if (reduced) return;
      physics.current.velocity = 2.6;
      startPhysics();
    }, 450);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !dragging.current && !reduced) {
            if (
              Math.abs(physics.current.velocity) < 0.2 &&
              Math.abs(physics.current.angle) < 0.05
            ) {
              physics.current.velocity = 2.6;
              startPhysics();
            }
          }
        });
      },
      { threshold: 0.2 },
    );

    if (stageRef.current) {
      observer.observe(stageRef.current);
    }

    return () => {
      clearTimeout(timer);
      observer.disconnect();
      if (animFrame.current) {
        cancelAnimationFrame(animFrame.current);
      }
      if (dragging.current && !scrollWasStopped.current) lenis?.start();
    };
  }, [startPhysics, reduced]);
  const initialPhoto = avatarUrl || photoUrl || latestUserPhoto;
  const [photoSrc, setPhotoSrc] = useState<string>(initialPhoto);
  const [imgLoadFailed, setImgLoadFailed] = useState<boolean>(false);

  useEffect(() => {
    const nextPhoto = avatarUrl || photoUrl || latestUserPhoto;
    setPhotoSrc(nextPhoto);
    setImgLoadFailed(false);
  }, [avatarUrl, photoUrl]);

  // Derive initial letters for fallback monogram
  const nameInitials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");

  return (
    <div
      ref={stageRef}
      className={`relative flex flex-col items-center justify-start select-none w-full max-w-[360px] mx-auto py-2 ${className}`}
      aria-label={`Interactive hanging ID card for ${name}`}
    >
      {/* Anchor Gantungan Statis di Atas */}
      <div className="relative z-30 flex flex-col items-center">
        {/* Cincin Wall Bracket / Pin Anchor */}
        <div className="w-9 h-3 rounded-full bg-gradient-to-r from-zinc-700 via-zinc-400 to-zinc-800 shadow-[0_2px_8px_rgba(0,0,0,0.6)] border border-white/20" />
        <div className="w-3.5 h-3.5 -mt-1 rounded-full bg-gradient-to-br from-zinc-300 to-zinc-700 shadow-inner border border-zinc-900" />
      </div>

      {/* Assembly Satu Pendulum Utuh (Tali + Klip + Kartu) */}
      <motion.div
        data-testid="lanyard-assembly"
        tabIndex={0}
        role="button"
        aria-label="Ayunkan kartu identitas. Gunakan tombol panah atau tarik kartu."
        onKeyDown={(event) => {
          if (
            event.key === "ArrowLeft" ||
            event.key === "ArrowRight" ||
            event.key === "Enter" ||
            event.key === " "
          ) {
            event.preventDefault();
            triggerImpulse(event.key === "ArrowLeft" ? -2 : 2);
          }
        }}
        className="relative flex flex-col items-center cursor-grab active:cursor-grabbing origin-top touch-none will-change-transform"
        style={{
          rotate: rotation,
          touchAction: "none",
          transformOrigin: "top center",
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onLostPointerCapture={() => {
          if (dragging.current) {
            dragging.current = false;
            if (!scrollWasStopped.current) lenis?.start();
            startPhysics();
          }
        }}
        onClick={handleClick}
        onDragStart={(e) => e.preventDefault()}
      >
        {/* Tali Lanyard Dinamis */}
        <DynamicRope
          length={ropeLength}
          color={ropeColor}
          accentColor={accentColor}
        />

        {/* Custom Body OR Default Highly-Polished ID Card */}
        {children ? (
          <div className="-mt-1 relative z-20">{children}</div>
        ) : (
          <article
            className="relative z-20 w-[270px] sm:w-[285px] -mt-1 rounded-2xl bg-zinc-950/95 text-zinc-100 border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.06)] overflow-hidden backdrop-blur-xl"
            draggable={false}
          >
            {/* Slot Lubang ID Card Di Atas */}
            <div className="flex justify-center pt-2.5 pb-1">
              <div className="w-11 h-2 rounded-full bg-zinc-900 border border-white/20 shadow-inner flex items-center justify-center">
                <div className="w-8 h-0.5 rounded-full bg-zinc-950" />
              </div>
            </div>

            {/* Header Kartu dengan Gradien Aksen Dinamis */}
            <div
              className="relative px-5 pt-3 pb-7 flex flex-col items-center justify-center overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${accentColor}25 0%, #09090b 85%)`,
                borderBottom: `1px solid ${accentColor}40`,
              }}
            >
              {/* Mesh background grid halus */}
              <div
                className="absolute inset-0 opacity-15 pointer-events-none"
                style={{
                  backgroundImage: `radial-gradient(${accentColor} 1px, transparent 1px)`,
                  backgroundSize: "12px 12px",
                }}
              />

              {/* Monogram / Avatar Foto */}
              <div
                className="relative w-20 h-20 sm:w-22 sm:h-22 rounded-full p-1 shadow-xl"
                style={{
                  background: `linear-gradient(135deg, ${accentColor}, #ffffff40)`,
                }}
              >
                <div className="w-full h-full rounded-full overflow-hidden bg-zinc-900 relative flex items-center justify-center">
                  {!imgLoadFailed && photoSrc ? (
                    <img
                      src={photoSrc}
                      alt={name}
                      draggable={false}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center relative z-10"
                      onError={() => {
                        // Cascade fallback: jika URL eksternal gagal -> coba aset lokal terbaru -> /profile_photo.jpg -> /avatar.jpg
                        if (photoSrc.startsWith("http")) {
                          setPhotoSrc("/user_photo_latest.jpg");
                        } else if (
                          photoSrc !== "/profile_photo.jpg" &&
                          photoSrc !== "/avatar.jpg"
                        ) {
                          setPhotoSrc("/profile_photo.jpg");
                        } else if (photoSrc === "/profile_photo.jpg") {
                          setPhotoSrc("/avatar.jpg");
                        } else {
                          setImgLoadFailed(true);
                        }
                      }}
                    />
                  ) : null}

                  {/* Fallback Text Monogram */}
                  <div className="absolute inset-0 flex items-center justify-center font-extrabold text-white text-lg tracking-wider bg-zinc-900 z-0">
                    {nameInitials || "ID"}
                  </div>
                </div>

                {/* Status Dot Aktif */}
                <div className="absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-zinc-950 shadow-md animate-pulse" />
              </div>
            </div>

            {/* Konten Badan Kartu */}
            <div className="px-5 py-4 flex flex-col items-center text-center">
              <span
                className="text-[9px] font-mono tracking-widest uppercase font-bold px-2 py-0.5 rounded-full border mb-2"
                style={{
                  color: accentColor,
                  borderColor: `${accentColor}40`,
                  backgroundColor: `${accentColor}15`,
                }}
              >
                IDENTIFICATION PASS
              </span>

              <h3 className="text-base sm:text-lg font-extrabold text-white tracking-tight font-display">
                {name}
              </h3>

              <p className="text-xs font-semibold text-zinc-300 mt-0.5">
                {role}
              </p>
              {subRole && (
                <p className="text-[10px] text-zinc-400 mt-0.5 font-mono">
                  {subRole}
                </p>
              )}

              {/* Grid Metadata Badge */}
              <div className="w-full grid grid-cols-2 gap-2 mt-3.5 pt-3 border-t border-white/10 text-left">
                <div className="bg-white/[0.03] p-2 rounded-lg border border-white/5">
                  <span className="block text-[9px] font-mono text-zinc-400 uppercase tracking-wider">
                    Degree
                  </span>
                  <span className="text-[11px] font-bold text-zinc-200 truncate block">
                    {degree}
                  </span>
                </div>

                <div className="bg-white/[0.03] p-2 rounded-lg border border-white/5">
                  <span className="block text-[9px] font-mono text-zinc-400 uppercase tracking-wider">
                    Status
                  </span>
                  <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1">
                    <BadgeCheck size={12} className="shrink-0" />
                    <span className="truncate">{statusText}</span>
                  </span>
                </div>

                <div className="col-span-2 bg-white/[0.03] p-2 rounded-lg border border-white/5">
                  <span className="block text-[9px] font-mono text-zinc-400 uppercase tracking-wider">
                    Studio &amp; Lab
                  </span>
                  <span className="text-[11px] font-semibold text-zinc-200 truncate block">
                    {organization}
                  </span>
                </div>
              </div>

              {/* Lokasi */}
              <div className="flex items-center gap-1.5 text-[11px] text-zinc-400 mt-3">
                <MapPin
                  size={12}
                  style={{ color: accentColor }}
                  className="shrink-0"
                />
                <span>{location}</span>
              </div>

              {/* Barcode Garis Simbolik */}
              <div className="w-full flex items-center justify-center gap-[2.5px] mt-3.5 pt-3 border-t border-white/10 opacity-85">
                {Array.from({ length: 32 }).map((_, i) => (
                  <span
                    key={i}
                    className="bg-white/80 h-6 block"
                    style={{
                      width: i % 4 === 0 ? 3 : i % 2 === 0 ? 1.5 : 1,
                      opacity: i % 3 === 0 ? 0.95 : 0.65,
                    }}
                  />
                ))}
              </div>

              {/* Nomor Seri ID Badge */}
              <div className="text-[10px] font-mono text-zinc-400 tracking-widest mt-1">
                {badgeId}
              </div>
            </div>
          </article>
        )}
      </motion.div>

      {/* Petunjuk Interaksi Halus */}
      <p className="mt-3 text-[10px] font-mono text-zinc-400 tracking-wider text-center pointer-events-none">
        drag lanyard to swing • tap to nudge
      </p>
    </div>
  );
}

export default HangingIdCard;
