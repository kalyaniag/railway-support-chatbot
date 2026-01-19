"use client";

interface DishaAvatarProps {
  size?: "sm" | "md" | "lg" | "xl";
  showRing?: boolean;
  showText?: boolean;
}

export default function DishaAvatar({
  size = "md",
  showRing = true,
  showText = false,
}: DishaAvatarProps) {
  const sizes = {
    sm: { outer: "w-9 h-9", inner: "w-7 h-7", ring: 2, text: "text-[4px]" },
    md: { outer: "w-11 h-11", inner: "w-9 h-9", ring: 3, text: "text-[5px]" },
    lg: { outer: "w-16 h-16", inner: "w-14 h-14", ring: 4, text: "text-[7px]" },
    xl: { outer: "w-20 h-20", inner: "w-18 h-18", ring: 4, text: "text-[8px]" },
  };

  const s = sizes[size];

  return (
    <div className={`relative ${s.outer} flex-shrink-0`}>
      {/* Outer ring with gradient */}
      {showRing && (
        <div
          className={`absolute inset-0 rounded-full`}
          style={{
            background:
              "linear-gradient(135deg, #2196F3 0%, #1976D2 50%, #0D47A1 100%)",
            padding: s.ring,
          }}
        >
          <div className="w-full h-full rounded-full bg-white" />
        </div>
      )}

      {/* Inner circle with Disha illustration */}
      <div
        className={`absolute inset-0 ${showRing ? "m-0.5" : ""} rounded-full overflow-hidden flex items-center justify-center`}
        style={{
          background: showRing
            ? "white"
            : "linear-gradient(135deg, #2196F3 0%, #1976D2 100%)",
        }}
      >
        <svg
          viewBox="0 0 100 100"
          className={`${s.inner}`}
          style={{ marginTop: showRing ? "8%" : "0" }}
        >
          {/* Background circle */}
          <circle cx="50" cy="50" r="48" fill="url(#bgGradient)" />

          {/* Gradient definitions */}
          <defs>
            <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E3F2FD" />
              <stop offset="100%" stopColor="#BBDEFB" />
            </linearGradient>
            <linearGradient
              id="shirtGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#2196F3" />
              <stop offset="100%" stopColor="#1565C0" />
            </linearGradient>
            <linearGradient id="skinGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFCC80" />
              <stop offset="100%" stopColor="#FFB74D" />
            </linearGradient>
            <linearGradient id="hairGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#4A4A4A" />
              <stop offset="100%" stopColor="#2D2D2D" />
            </linearGradient>
          </defs>

          {/* Hair back */}
          <ellipse cx="50" cy="35" rx="22" ry="20" fill="url(#hairGradient)" />

          {/* Face */}
          <ellipse cx="50" cy="38" rx="16" ry="18" fill="url(#skinGradient)" />

          {/* Hair front/bangs */}
          <path
            d="M34 30 Q50 22 66 30 Q64 36 50 34 Q36 36 34 30"
            fill="url(#hairGradient)"
          />

          {/* Eyes */}
          <ellipse cx="43" cy="38" rx="3" ry="3.5" fill="#2D2D2D" />
          <ellipse cx="57" cy="38" rx="3" ry="3.5" fill="#2D2D2D" />
          <circle cx="42" cy="37" r="1" fill="white" />
          <circle cx="56" cy="37" r="1" fill="white" />

          {/* Eyebrows */}
          <path
            d="M39 33 Q43 31 47 33"
            stroke="#4A4A4A"
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M53 33 Q57 31 61 33"
            stroke="#4A4A4A"
            strokeWidth="1.5"
            fill="none"
          />

          {/* Nose */}
          <path
            d="M50 40 L50 45 Q48 46 50 46"
            stroke="#E0A060"
            strokeWidth="1"
            fill="none"
          />

          {/* Smile */}
          <path
            d="M44 50 Q50 55 56 50"
            stroke="#C75050"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />

          {/* Bindi */}
          <circle cx="50" cy="30" r="1.5" fill="#E53935" />

          {/* Neck */}
          <rect x="45" y="54" width="10" height="8" fill="url(#skinGradient)" />

          {/* Body/Shirt */}
          <path
            d="M30 95 L30 70 Q30 62 40 60 L45 58 L50 62 L55 58 L60 60 Q70 62 70 70 L70 95 Z"
            fill="url(#shirtGradient)"
          />

          {/* Hands in Namaste */}
          <path
            d="M42 72 L50 65 L58 72 L58 85 Q50 90 42 85 Z"
            fill="url(#skinGradient)"
            stroke="#E0A060"
            strokeWidth="0.5"
          />

          {/* Fingers detail */}
          <path
            d="M46 72 L50 68 L54 72"
            stroke="#E0A060"
            strokeWidth="0.5"
            fill="none"
          />
          <path
            d="M46 76 L50 72 L54 76"
            stroke="#E0A060"
            strokeWidth="0.5"
            fill="none"
          />

          {/* Hair sides */}
          <path
            d="M28 35 Q26 45 30 55"
            stroke="url(#hairGradient)"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M72 35 Q74 45 70 55"
            stroke="url(#hairGradient)"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Text overlay for larger sizes */}
      {showText && size === "lg" && (
        <>
          <div
            className="absolute top-1 left-1/2 -translate-x-1/2 font-bold text-blue-700"
            style={{ fontSize: "6px" }}
          >
            AskDISHA 2.0
          </div>
          <div
            className="absolute bottom-1 left-1/2 -translate-x-1/2 font-medium text-blue-600"
            style={{ fontSize: "5px" }}
          >
            IRCTC Assistant
          </div>
        </>
      )}

      {/* Online indicator */}
      {showRing && (
        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
      )}
    </div>
  );
}
