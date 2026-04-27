interface TastingNotes {
  acidity: number;   // 0–10
  body: number;
  sweetness: number;
  aroma: number;
}

interface TastingChartProps {
  notes: TastingNotes;
  size?: number;
}

const LABELS = ['Acidity', 'Body', 'Sweetness', 'Aroma'] as const;
const CX = 60, CY = 60, R = 42;

// Axis endpoints: top, right, bottom, left (diamond layout for 4 axes)
const AXES = [
  { dx: 0,  dy: -1 }, // top    → Acidity
  { dx: 1,  dy: 0  }, // right  → Body
  { dx: 0,  dy: 1  }, // bottom → Sweetness
  { dx: -1, dy: 0  }, // left   → Aroma
];

export function TastingChart({ notes, size = 120 }: TastingChartProps) {
  const values = [notes.acidity, notes.body, notes.sweetness, notes.aroma];

  // Grid rings at 25%, 50%, 75%, 100%
  const rings = [0.25, 0.5, 0.75, 1].map((pct) =>
    AXES.map(({ dx, dy }) => `${CX + dx * R * pct},${CY + dy * R * pct}`).join(' ')
  );

  // Data polygon
  const dataPoints = AXES.map(({ dx, dy }, i) => {
    const n = (values[i] ?? 0) / 10;
    return `${CX + dx * R * n},${CY + dy * R * n}`;
  }).join(' ');

  return (
    <svg
      viewBox="0 0 120 120"
      width={size}
      height={size}
      aria-label={`Tasting notes: Acidity ${notes.acidity}/10, Body ${notes.body}/10, Sweetness ${notes.sweetness}/10, Aroma ${notes.aroma}/10`}
      role="img"
    >
      {/* Grid rings */}
      {rings.map((pts, i) => (
        <polygon
          key={i}
          points={pts}
          fill="none"
          stroke="rgba(184,179,148,0.35)"
          strokeWidth="0.5"
        />
      ))}

      {/* Axis lines */}
      {AXES.map(({ dx, dy }, i) => (
        <line
          key={i}
          x1={CX} y1={CY}
          x2={CX + dx * R} y2={CY + dy * R}
          stroke="rgba(184,179,148,0.4)"
          strokeWidth="0.5"
        />
      ))}

      {/* Data polygon */}
      <polygon
        points={dataPoints}
        fill="rgba(200,169,110,0.3)"
        stroke="#C8A96E"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />

      {/* Axis labels */}
      {AXES.map(({ dx, dy }, i) => {
        const lx = CX + dx * (R + 10);
        const ly = CY + dy * (R + 10);
        return (
          <text
            key={i}
            x={lx}
            y={ly}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize="6"
            fill="#8B6D4A"
            fontFamily="system-ui, sans-serif"
          >
            {LABELS[i]}
          </text>
        );
      })}
    </svg>
  );
}
