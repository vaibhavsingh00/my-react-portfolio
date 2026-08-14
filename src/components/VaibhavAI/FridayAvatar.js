import React from 'react'

/**
 * Futuristic 3D-Style FRIDAY AI Energy Core Avatar
 * 
 * Features:
 * - High-tech luminous core with golden (#FFD700) and cyan (#00f0ff) energy
 * - Gyroscopic orbital energy rings with counter-rotations
 * - Orbiting photon particles and neural lattice accents
 * - Adaptive states: 'idle' (calm pulse) and 'thinking' (accelerated spin + intensified core)
 * - Scalable vector graphics with GPU-accelerated CSS animations
 * - Full accessibility and prefers-reduced-motion support
 */
const FridayAvatar = ({ size = 42, isThinking = false, className = '', glow = true }) => {
    const stateClass = isThinking ? 'friday-thinking' : 'friday-idle'

    return (
        <div
            className={`friday-avatar-wrapper ${stateClass} ${glow ? 'has-glow' : ''} ${className}`}
            style={{ width: size, height: size }}
            role="img"
            aria-label="FRIDAY AI assistant"
        >
            <svg
                viewBox="0 0 100 100"
                className="friday-avatar-svg"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    {/* Deep Blue / Cyan Atmospheric Filter */}
                    <filter id="friday-bloom" x="-30%" y="-30%" width="160%" height="160%">
                        <feGaussianBlur stdDeviation="2.5" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>

                    <filter id="core-glow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur1" />
                        <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" result="blur2" />
                        <feMerge>
                            <feMergeNode in="blur1" />
                            <feMergeNode in="blur2" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>

                    {/* Core Radial Gradient: Bright White-Gold Center to Cyan / Navy Edge */}
                    <radialGradient id="friday-core-grad" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                        <stop offset="25%" stopColor="#fff275" stopOpacity="0.95" />
                        <stop offset="55%" stopColor="#ffd700" stopOpacity="0.9" />
                        <stop offset="80%" stopColor="#ff9e00" stopOpacity="0.75" />
                        <stop offset="95%" stopColor="#00f0ff" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="#00f0ff" stopOpacity="0" />
                    </radialGradient>

                    {/* Outer Atmospheric Aura Gradient */}
                    <radialGradient id="friday-aura-grad" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.4" />
                        <stop offset="45%" stopColor="#ffd700" stopOpacity="0.2" />
                        <stop offset="85%" stopColor="#022c43" stopOpacity="0.05" />
                        <stop offset="100%" stopColor="#022c43" stopOpacity="0" />
                    </radialGradient>

                    {/* Primary Orbital Ring Gradient (Gold to Cyan) */}
                    <linearGradient id="friday-ring-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#ffd700" stopOpacity="0.95" />
                        <stop offset="35%" stopColor="#ffb703" stopOpacity="0.3" />
                        <stop offset="70%" stopColor="#00f0ff" stopOpacity="0.9" />
                        <stop offset="100%" stopColor="#ffffff" stopOpacity="0.7" />
                    </linearGradient>

                    {/* Secondary Orbital Ring Gradient (Cyan to Gold) */}
                    <linearGradient id="friday-ring-grad-2" x1="100%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.85" />
                        <stop offset="40%" stopColor="#0077b6" stopOpacity="0.2" />
                        <stop offset="80%" stopColor="#ffd700" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#ffffff" stopOpacity="0.9" />
                    </linearGradient>

                    {/* Third Equatorial Ring Gradient */}
                    <linearGradient id="friday-ring-grad-3" x1="0%" y1="50%" x2="100%" y2="50%">
                        <stop offset="0%" stopColor="#ffd700" stopOpacity="0.7" />
                        <stop offset="50%" stopColor="#00f0ff" stopOpacity="0.9" />
                        <stop offset="100%" stopColor="#ffd700" stopOpacity="0.7" />
                    </linearGradient>
                </defs>

                {/* Layer 1: Ambient Outer Energy Aura */}
                <circle
                    cx="50%"
                    cy="50%"
                    r="46"
                    fill="url(#friday-aura-grad)"
                    className="friday-aura"
                />

                {/* Layer 2: Subtle Neural Matrix Lines */}
                <g className="friday-neural-lattice" stroke="rgba(0, 240, 255, 0.25)" strokeWidth="0.75">
                    <line x1="50" y1="12" x2="50" y2="88" strokeDasharray="2, 6" />
                    <line x1="12" y1="50" x2="88" y2="50" strokeDasharray="2, 6" />
                    <line x1="23" y1="23" x2="77" y2="77" strokeDasharray="1.5, 5" strokeOpacity="0.2" />
                    <line x1="77" y1="23" x2="23" y2="77" strokeDasharray="1.5, 5" strokeOpacity="0.2" />
                </g>

                {/* Layer 3: Outer Orbital Ring 1 (Clockwise Gyroscope) */}
                <g className="friday-ring-group ring-1-group">
                    <ellipse
                        cx="50"
                        cy="50"
                        rx="40"
                        ry="16"
                        fill="none"
                        stroke="url(#friday-ring-grad-1)"
                        strokeWidth="1.6"
                        strokeDasharray="60 12 25 8"
                        filter="url(#friday-bloom)"
                        className="friday-ring ring-1"
                    />
                    {/* Orbiting Particle on Ring 1 */}
                    <circle cx="88" cy="50" r="2.2" fill="#ffffff" filter="url(#core-glow)" className="friday-node node-1" />
                    <circle cx="12" cy="50" r="1.6" fill="#ffd700" className="friday-node node-1-sub" />
                </g>

                {/* Layer 4: Orbital Ring 2 (Counter-Clockwise Gyroscope) */}
                <g className="friday-ring-group ring-2-group">
                    <ellipse
                        cx="50"
                        cy="50"
                        rx="36"
                        ry="14"
                        fill="none"
                        stroke="url(#friday-ring-grad-2)"
                        strokeWidth="1.4"
                        strokeDasharray="45 10 30 15"
                        filter="url(#friday-bloom)"
                        className="friday-ring ring-2"
                    />
                    {/* Orbiting Particle on Ring 2 */}
                    <circle cx="50" cy="14" r="2" fill="#00f0ff" filter="url(#core-glow)" className="friday-node node-2" />
                    <circle cx="50" cy="86" r="1.5" fill="#ffd700" className="friday-node node-2-sub" />
                </g>

                {/* Layer 5: Inner Equatorial Precision Ring 3 */}
                <g className="friday-ring-group ring-3-group">
                    <circle
                        cx="50"
                        cy="50"
                        r="25"
                        fill="none"
                        stroke="url(#friday-ring-grad-3)"
                        strokeWidth="1.2"
                        strokeDasharray="18 6 8 6"
                        className="friday-ring ring-3"
                    />
                    <circle cx="75" cy="50" r="1.4" fill="#00f0ff" className="friday-node node-3" />
                </g>

                {/* Layer 6: Dynamic Quantum Particle Nodes */}
                <g className="friday-particles">
                    <circle cx="34" cy="38" r="1.2" fill="#ffd700" opacity="0.8" className="particle p-1" />
                    <circle cx="66" cy="62" r="1.4" fill="#00f0ff" opacity="0.8" className="particle p-2" />
                    <circle cx="62" cy="36" r="1.0" fill="#ffffff" opacity="0.9" className="particle p-3" />
                    <circle cx="38" cy="64" r="1.1" fill="#ffb703" opacity="0.75" className="particle p-4" />
                </g>

                {/* Layer 7: Central Holographic AI Energy Core */}
                <g className="friday-core-group">
                    {/* Plasma Corona */}
                    <circle
                        cx="50"
                        cy="50"
                        r="18"
                        fill="url(#friday-core-grad)"
                        opacity="0.85"
                        filter="url(#core-glow)"
                        className="friday-core-corona"
                    />

                    {/* Dense Energy Sphere */}
                    <circle
                        cx="50"
                        cy="50"
                        r="12"
                        fill="url(#friday-core-grad)"
                        className="friday-core-sphere"
                    />

                    {/* Photonic Singularity Highlight */}
                    <circle
                        cx="47.5"
                        cy="47.5"
                        r="5"
                        fill="#ffffff"
                        opacity="0.95"
                        filter="url(#friday-bloom)"
                        className="friday-core-singularity"
                    />

                    {/* Specular Core Glimmer */}
                    <circle
                        cx="46"
                        cy="46"
                        r="1.8"
                        fill="#ffffff"
                        className="friday-core-specular"
                    />
                </g>
            </svg>
        </div>
    )
}

export default FridayAvatar
