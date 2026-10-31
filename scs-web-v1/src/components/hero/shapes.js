const palette = {
  deep: [0.79, 0.24, 0.06],
  brand: [0.914, 0.31, 0.11],
  bright: [1, 0.42, 0.21],
  soft: [1, 0.62, 0.46],
  ink: [0.08, 0.075, 0.07],
};

function mulberry32(seed) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * The 3SC mark as three extruded boxes, in logo units (viewBox 36 x 32, y down).
 * Each box carries the colour its particles take in every stage.
 */
const logoBoxes = [
  { x: 5, y: 0, w: 31, h: 27, z: [-0.45, 0.05], colors: [palette.deep, palette.brand] },
  { x: 0, y: 20, w: 24, h: 12, z: [-0.2, 0.3], colors: [palette.ink, palette.ink] },
  { x: 3, y: 11, w: 21, h: 8, z: [0.3, 0.75], colors: [palette.bright, palette.soft] },
  { x: 15, y: 19, w: 9, h: 10, z: [0.3, 0.75], colors: [palette.bright, palette.soft] },
];

function boxArea(box, scale) {
  const w = box.w * scale;
  const h = box.h * scale;
  const d = box.z[1] - box.z[0];
  return 2 * (w * h + w * d + h * d);
}

function sampleBoxSurface(box, scale, rand) {
  const w = box.w * scale;
  const h = box.h * scale;
  const d = box.z[1] - box.z[0];
  const x0 = box.x * scale;
  const y0 = box.y * scale;
  const faces = [w * h, w * h, w * d, w * d, h * d, h * d];
  const total = faces.reduce((sum, value) => sum + value, 0);
  let pick = rand() * total;
  let face = 0;
  while (pick > faces[face]) pick -= faces[face++];
  const u = rand();
  const v = rand();
  switch (face) {
    case 0: return [x0 + u * w, y0 + v * h, box.z[1]];
    case 1: return [x0 + u * w, y0 + v * h, box.z[0]];
    case 2: return [x0 + u * w, y0, box.z[0] + v * d];
    case 3: return [x0 + u * w, y0 + h, box.z[0] + v * d];
    case 4: return [x0, y0 + u * h, box.z[0] + v * d];
    default: return [x0 + w, y0 + u * h, box.z[0] + v * d];
  }
}

function rotate([x, y, z], rx, ry) {
  const cy = Math.cos(ry);
  const sy = Math.sin(ry);
  const x1 = x * cy + z * sy;
  const z1 = -x * sy + z * cy;
  const cx = Math.cos(rx);
  const sx = Math.sin(rx);
  return [x1, y * cx - z1 * sx, y * sx + z1 * cx];
}

export function buildShapes(count, seed = 7) {
  const rand = mulberry32(seed);
  const data = new Float32Array(count * 3);
  const intel = new Float32Array(count * 3);
  const insight = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const meta = new Float32Array(count * 4);

  const scale = 3.4 / 36;
  const areas = logoBoxes.map((box) => boxArea(box, scale));
  const areaTotal = areas.reduce((sum, value) => sum + value, 0);

  const golden = Math.PI * (3 - Math.sqrt(5));
  const sphereCount = Math.floor(count * 0.72);
  const radius = 1.85;
  const streams = 9;

  for (let i = 0; i < count; i++) {
    let pick = rand() * areaTotal;
    let boxIndex = 0;
    while (pick > areas[boxIndex]) pick -= areas[boxIndex++];
    const box = logoBoxes[boxIndex];
    const [lx, ly, lz] = sampleBoxSurface(box, scale, rand);
    const centred = [lx - 18 * scale, -(ly - 16 * scale), lz];
    const [ix, iy, iz] = rotate(centred, 0.32, -0.62);
    insight.set([ix, iy, iz], i * 3);

    const tint = rand();
    const [a, b] = box.colors;
    colors.set([a[0] + (b[0] - a[0]) * tint, a[1] + (b[1] - a[1]) * tint, a[2] + (b[2] - a[2]) * tint], i * 3);

    const isStream = rand() < 0.62;
    if (isStream) {
      const lane = Math.floor(rand() * streams);
      const x = -4.2 + rand() * 8.4;
      const base = -1.6 + (lane / (streams - 1)) * 3.2;
      const y = base + Math.sin(x * 0.9 + lane) * 0.22 + (rand() - 0.5) * 0.05;
      data.set([x, y, (rand() - 0.5) * 0.6], i * 3);
    } else {
      data.set([(rand() - 0.5) * 8.4, (rand() - 0.5) * 3.8, (rand() - 0.5) * 2.4], i * 3);
    }

    if (i < sphereCount) {
      const t = i + 0.5;
      const y = 1 - (2 * t) / sphereCount;
      const r = Math.sqrt(1 - y * y);
      const theta = golden * t;
      const jitter = 1 + (rand() - 0.5) * 0.04;
      intel.set([Math.cos(theta) * r * radius * jitter, y * radius * jitter, Math.sin(theta) * r * radius * jitter], i * 3);
    } else {
      const u = rand() * 2 - 1;
      const phi = rand() * Math.PI * 2;
      const rr = Math.cbrt(rand()) * radius * 0.92;
      const s = Math.sqrt(1 - u * u);
      intel.set([Math.cos(phi) * s * rr, u * rr, Math.sin(phi) * s * rr], i * 3);
    }

    meta.set([rand(), 0.55 + rand() * 0.9, isStream ? 1 : 0, rand() * Math.PI * 2], i * 4);
  }

  return { data, intel, insight, colors, meta };
}

/** Nearest-neighbour links between a subset of sphere nodes. */
export function buildLinks(intel, nodes = 220, perNode = 2) {
  const points = [];
  const stride = Math.max(1, Math.floor(intel.length / 3 / nodes / 1.4));
  for (let i = 0; i < nodes; i++) {
    const index = i * stride * 3;
    points.push([intel[index], intel[index + 1], intel[index + 2]]);
  }
  const segments = [];
  points.forEach((point, i) => {
    const nearest = points
      .map((other, j) => ({ j, d: (other[0] - point[0]) ** 2 + (other[1] - point[1]) ** 2 + (other[2] - point[2]) ** 2 }))
      .filter(({ j }) => j !== i)
      .sort((a, b) => a.d - b.d)
      .slice(0, perNode);
    nearest.forEach(({ j }) => {
      if (j > i) segments.push(...point, ...points[j]);
    });
  });
  return new Float32Array(segments);
}
