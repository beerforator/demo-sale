import { useMemo } from 'react'

// ══════════════════════════════════════════════
// Щупальца по краям экрана — «осьминог обнимает» страницу.
//
// Рисуются не вручную заданными кривыми Безье, а параметрически:
// задаётся только осевая линия (десяток опорных точек), а контур,
// сужение к кончику и присоски считаются из неё. Так щупальце
// остаётся органичным при любой правке — достаточно подвинуть точку,
// и толщина с присосками пересчитаются сами.
// ══════════════════════════════════════════════

// Сплайн Кэтмулла — Рома: проходит ровно через опорные точки,
// поэтому осевую линию можно править «на глаз».
function sampleSpine(points, perSegment) {
  const pts = [points[0], ...points, points[points.length - 1]]
  const out = []

  for (let i = 1; i < pts.length - 2; i++) {
    const p0 = pts[i - 1]
    const p1 = pts[i]
    const p2 = pts[i + 1]
    const p3 = pts[i + 2]

    for (let j = 0; j < perSegment; j++) {
      const t = j / perSegment
      const t2 = t * t
      const t3 = t2 * t
      out.push({
        x: 0.5 * (2 * p1.x + (-p0.x + p2.x) * t + (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * t2 + (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * t3),
        y: 0.5 * (2 * p1.y + (-p0.y + p2.y) * t + (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * t2 + (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * t3),
      })
    }
  }
  out.push(points[points.length - 1])
  return out
}

const fmt = (n) => Math.round(n * 10) / 10

function buildTentacle({ points, width, taper, suckerSide, suckerCount }) {
  const spine = sampleSpine(points, 22)
  const n = spine.length

  // Полутолщина в точке: от основания к кончику по степенному закону
  const halfWidth = (t) => (width / 2) * Math.pow(1 - t, taper) + 0.8

  const left = []
  const right = []
  const normals = []

  for (let i = 0; i < n; i++) {
    const p = spine[i]
    const prev = spine[Math.max(0, i - 1)]
    const next = spine[Math.min(n - 1, i + 1)]

    let dx = next.x - prev.x
    let dy = next.y - prev.y
    const len = Math.hypot(dx, dy) || 1
    dx /= len
    dy /= len

    // Нормаль к оси
    const nx = -dy
    const ny = dx
    normals.push({ nx, ny })

    const w = halfWidth(i / (n - 1))
    left.push({ x: p.x + nx * w, y: p.y + ny * w })
    right.push({ x: p.x - nx * w, y: p.y - ny * w })
  }

  const toPath = (arr) => arr.map((p) => `${fmt(p.x)} ${fmt(p.y)}`).join('L')
  const outline = `M${toPath(left)}L${toPath([...right].reverse())}Z`

  // Присоски идут по одной стороне оси, сгущаясь к кончику
  const suckers = []
  for (let k = 0; k < suckerCount; k++) {
    const t = Math.pow((k + 0.5) / suckerCount, 1.18)
    const idx = Math.min(n - 1, Math.round(t * (n - 1)))
    const p = spine[idx]
    const { nx, ny } = normals[idx]
    const w = halfWidth(t)
    if (w < 2.4) continue
    suckers.push({
      cx: fmt(p.x + nx * w * 0.34 * suckerSide),
      cy: fmt(p.y + ny * w * 0.34 * suckerSide),
      r: fmt(Math.max(1.1, w * 0.36)),
    })
  }

  return { outline, suckers }
}

// Осевые линии. Система координат: 300×1000, щупальца входят
// из-за левого края (x < 0) и загибаются внутрь экрана.
const SPINES = [
  {
    id: 'a',
    points: [
      { x: -46, y: 44 }, { x: 44, y: 58 }, { x: 112, y: 106 },
      { x: 132, y: 172 }, { x: 96, y: 214 }, { x: 56, y: 182 },
      { x: 66, y: 146 },
    ],
    width: 40, taper: 2.2, suckerSide: -1, suckerCount: 22,
    sway: { dur: 19, delay: -3 }, draw: 0.1,
  },
  {
    id: 'b',
    points: [
      { x: -60, y: 176 }, { x: 62, y: 236 }, { x: 156, y: 344 },
      { x: 194, y: 470 }, { x: 156, y: 578 }, { x: 74, y: 622 },
      { x: 34, y: 700 }, { x: 88, y: 758 }, { x: 158, y: 730 },
      { x: 172, y: 664 },
    ],
    width: 84, taper: 1.85, suckerSide: -1, suckerCount: 44,
    sway: { dur: 24, delay: -8 }, draw: 0,
  },
  {
    id: 'c',
    points: [
      { x: -54, y: 486 }, { x: 40, y: 540 }, { x: 104, y: 646 },
      { x: 112, y: 772 }, { x: 62, y: 862 }, { x: 4, y: 892 },
      { x: -14, y: 946 },
    ],
    width: 56, taper: 2.0, suckerSide: 1, suckerCount: 32,
    sway: { dur: 27, delay: -14 }, draw: 0.35,
  },
  {
    id: 'd',
    points: [
      { x: -48, y: 806 }, { x: 58, y: 848 }, { x: 126, y: 924 },
      { x: 140, y: 1010 },
    ],
    width: 46, taper: 2.4, suckerSide: -1, suckerCount: 20,
    sway: { dur: 21, delay: -6 }, draw: 0.55,
  },
]

function TentacleSide({ side }) {
  const shapes = useMemo(() => SPINES.map((s) => ({ ...s, ...buildTentacle(s) })), [])

  return (
    <div className={`tentacles__side tentacles__side--${side}`} aria-hidden="true">
      <svg viewBox="0 0 300 1000" preserveAspectRatio="xMinYMid slice">
        {shapes.map((s) => (
          <g
            key={s.id}
            className="tentacle-group"
            style={{ '--sway-dur': `${s.sway.dur}s`, '--sway-delay': `${s.sway.delay}s` }}
          >
            <path
              className="tentacle-outline"
              d={s.outline}
              pathLength="1"
              style={{ '--draw-delay': `${s.draw}s` }}
            />
            {s.suckers.map((c, i) => (
              <circle
                key={i}
                className="tentacle-sucker"
                cx={c.cx}
                cy={c.cy}
                r={c.r}
                style={{ '--sucker-delay': `${1.5 + s.draw + i * 0.012}s` }}
              />
            ))}
          </g>
        ))}
      </svg>
    </div>
  )
}

export default function Tentacles() {
  return (
    <div className="tentacles" aria-hidden="true">
      <TentacleSide side="left" />
      <TentacleSide side="right" />
    </div>
  )
}
