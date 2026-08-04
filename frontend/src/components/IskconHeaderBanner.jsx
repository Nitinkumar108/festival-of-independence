export default function IskconHeaderBanner() {
  return (
    <div className="bg-gradient-to-r from-[#155e8c] via-[#1a5585] to-[#1d3d70] text-white py-2 sm:py-2.5 px-4 sm:px-8 border-b border-blue-300/30 shadow-sm relative z-40">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        
        {/* Left Side: ISKCON Emblem Logo + Organization Name (Without "The official site of the") */}
        <div className="flex items-center gap-3">
          {/* ISKCON Lotus Logo SVG */}
          <div className="w-10 sm:w-12 flex-shrink-0">
            <svg viewBox="0 0 100 80" className="w-full h-auto fill-current text-white drop-shadow-sm">
              {/* Outer Lotus Petals */}
              <path d="M50 5 C35 25 15 35 5 50 C20 50 35 45 50 25 C65 45 80 50 95 50 C85 35 65 25 50 5 Z" opacity="0.9" />
              <path d="M50 20 C40 35 25 45 15 58 C30 58 40 52 50 35 C60 52 70 58 85 58 C75 45 60 35 50 20 Z" opacity="0.95" />
              <path d="M50 35 C43 45 32 52 25 65 C35 65 43 60 50 48 C57 60 65 65 75 65 C68 52 57 45 50 35 Z" />
              {/* Center Tilak */}
              <path d="M50 38 C47 48 45 58 50 66 C55 58 53 48 50 38 Z" />
              <circle cx="50" cy="70" r="3" />
              {/* ISKCON Text Pill */}
              <rect x="20" y="73" width="60" height="7" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <text x="50" y="78.5" textAnchor="middle" fontSize="5.5" fontWeight="bold" letterSpacing="2" fill="currentColor">ISKCON</text>
            </svg>
          </div>

          <div className="flex flex-col">
            <span className="text-[11px] sm:text-xs font-medium text-blue-100 tracking-wide leading-tight">
              International Society for
            </span>
            <span className="text-sm sm:text-base font-black text-white tracking-wide uppercase leading-tight">
              Krishna Consciousness
            </span>
          </div>
        </div>

        {/* Right Side: Founder-Acharya Details & Srila Prabhupada Portrait */}
        <div className="flex items-center gap-3">
          <div className="flex flex-col text-center sm:text-right">
            <span className="text-[10px] sm:text-xs text-blue-100/90 font-medium italic leading-tight">
              Founder-<em>Acharya</em> His Divine Grace
            </span>
            <span className="text-xs sm:text-sm font-extrabold text-white tracking-wide leading-tight">
              A.C. Bhaktivedanta Swami Prabhupada
            </span>
          </div>

          <div className="relative flex-shrink-0">
            <img
              src="/prabhupada.png"
              alt="Srila Prabhupada"
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white/90 object-cover shadow-sm bg-blue-900"
            />
          </div>
        </div>

      </div>
    </div>
  );
}
