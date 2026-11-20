/**
 * A very small Lottie (bodymovin) JSON builder.
 *
 * Hand-writing Lottie JSON for illustration scenes is unreadable, so scenes are
 * composed from these primitives instead and emitted as real Lottie data that
 * `lottie-web` plays like any After Effects export.
 */

export type Num = number;
export type Point = [Num, Num];

export interface Keyframe {
  /** Frame number. */
  t: Num;
  /** Value at that frame. */
  s: Num[];
}

export type Value = { a: 0; k: Num[] } | { a: 1; k: Record<string, unknown>[] };

/** A constant value. */
export const v = (...nums: Num[]): Value => ({ a: 0, k: nums });

/** An animated value with a soft ease between keyframes. */
export function kf(frames: Keyframe[], ease: "out" | "spring" | "linear" = "out"): Value {
  const curves = {
    out: { i: [0.25], o: [0.4] },
    spring: { i: [0.15], o: [0.5] },
    linear: { i: [0.5], o: [0.5] },
  }[ease];

  return {
    a: 1,
    k: frames.map((frame, index) =>
      index === frames.length - 1
        ? { t: frame.t, s: frame.s }
        : {
            t: frame.t,
            s: frame.s,
            i: { x: curves.i, y: [1] },
            o: { x: curves.o, y: [0] },
          },
    ),
  };
}

/** `#rrggbb` → Lottie's normalised rgba. */
export function rgb(hex: string): Num[] {
  const value = hex.replace("#", "");
  const full =
    value.length === 3
      ? value
          .split("")
          .map((c) => c + c)
          .join("")
      : value;
  return [
    Number.parseInt(full.slice(0, 2), 16) / 255,
    Number.parseInt(full.slice(2, 4), 16) / 255,
    Number.parseInt(full.slice(4, 6), 16) / 255,
    1,
  ];
}

export interface TransformOptions {
  position?: Num[] | Value;
  anchor?: Num[];
  scale?: Num[] | Value;
  rotation?: Num | Value;
  opacity?: Num | Value;
}

const asValue = (input: Num[] | Num | Value | undefined, fallback: Num[]): Value =>
  input === undefined
    ? { a: 0, k: fallback }
    : typeof input === "number"
      ? { a: 0, k: [input] }
      : Array.isArray(input)
        ? { a: 0, k: input }
        : input;

/** Shape-group transform (`ty: "tr"`). */
export const tr = (options: TransformOptions = {}): Record<string, unknown> => ({
  ty: "tr",
  p: asValue(options.position, [0, 0]),
  a: asValue(options.anchor, [0, 0]),
  s: asValue(options.scale, [100, 100]),
  r: asValue(options.rotation, [0]),
  o: asValue(options.opacity, [100]),
  sk: v(0),
  sa: v(0),
  nm: "tr",
});

/** Layer transform (`ks`). */
export const ks = (options: TransformOptions = {}): Record<string, unknown> => ({
  o: asValue(options.opacity, [100]),
  r: asValue(options.rotation, [0]),
  p: asValue(options.position, [0, 0, 0]),
  a: asValue(options.anchor, [0, 0, 0]),
  s: asValue(options.scale, [100, 100, 100]),
});

const fill = (color: string, opacity: Num = 100) => ({
  ty: "fl",
  c: { a: 0, k: rgb(color) },
  o: v(opacity),
  r: 1,
  nm: "fill",
});

const stroke = (color: string, width: Num, dash?: [Num, Num]) => ({
  ty: "st",
  c: { a: 0, k: rgb(color) },
  o: v(100),
  w: v(width),
  lc: 2,
  lj: 2,
  nm: "stroke",
  ...(dash
    ? {
        d: [
          { n: "d", nm: "dash", v: v(dash[0]) },
          { n: "g", nm: "gap", v: v(dash[1]) },
        ],
      }
    : {}),
});

export interface ShapeStyle {
  fill?: string;
  fillOpacity?: Num;
  stroke?: string;
  strokeWidth?: Num;
  dash?: [Num, Num];
  /** Animates the stroke drawing itself in. */
  trim?: Value;
}

const style = (options: ShapeStyle) => [
  ...(options.trim ? [{ ty: "tm", s: v(0), e: options.trim, o: v(0), m: 1, nm: "trim" }] : []),
  ...(options.fill ? [fill(options.fill, options.fillOpacity)] : []),
  ...(options.stroke ? [stroke(options.stroke, options.strokeWidth ?? 2, options.dash)] : []),
];

/** Rounded rectangle. */
export const rect = (
  x: Num,
  y: Num,
  width: Num,
  height: Num,
  radius: Num,
  options: ShapeStyle,
  transform: TransformOptions = {},
): Record<string, unknown> => ({
  ty: "gr",
  nm: "rect",
  it: [
    { ty: "rc", d: 1, s: v(width, height), p: v(x + width / 2, y + height / 2), r: v(radius) },
    ...style(options),
    tr(transform),
  ],
});

/** Ellipse, positioned by its centre. */
export const ellipse = (
  cx: Num,
  cy: Num,
  width: Num,
  height: Num,
  options: ShapeStyle,
  transform: TransformOptions = {},
): Record<string, unknown> => ({
  ty: "gr",
  nm: "ellipse",
  it: [{ ty: "el", d: 1, s: v(width, height), p: v(cx, cy) }, ...style(options), tr(transform)],
});

/** Straight-edged path through `points`. */
export const poly = (
  points: Point[],
  options: ShapeStyle & { closed?: boolean },
  transform: TransformOptions = {},
): Record<string, unknown> => ({
  ty: "gr",
  nm: "path",
  it: [
    {
      ty: "sh",
      d: 1,
      ks: {
        a: 0,
        k: {
          i: points.map(() => [0, 0]),
          o: points.map(() => [0, 0]),
          v: points,
          c: options.closed ?? true,
        },
      },
    },
    ...style(options),
    tr(transform),
  ],
});

/** Cubic path: each point carries in/out tangents relative to the vertex. */
export const curve = (
  vertices: { v: Point; i?: Point; o?: Point }[],
  options: ShapeStyle & { closed?: boolean },
  transform: TransformOptions = {},
): Record<string, unknown> => ({
  ty: "gr",
  nm: "curve",
  it: [
    {
      ty: "sh",
      d: 1,
      ks: {
        a: 0,
        k: {
          i: vertices.map((point) => point.i ?? [0, 0]),
          o: vertices.map((point) => point.o ?? [0, 0]),
          v: vertices.map((point) => point.v),
          c: options.closed ?? false,
        },
      },
    },
    ...style(options),
    tr(transform),
  ],
});

export interface LayerOptions {
  name: string;
  shapes: Record<string, unknown>[];
  transform?: Record<string, unknown>;
  /** Frame the layer appears on. */
  in?: Num;
  out?: Num;
}

export interface ImageAsset {
  id: string;
  /** Inline SVG markup; it is embedded as a data URI. */
  svg: string;
  width: Num;
  height: Num;
}

export interface ImageLayerOptions {
  name: string;
  refId: string;
  width: Num;
  height: Num;
  transform?: Record<string, unknown>;
  in?: Num;
  out?: Num;
}

export interface TextLayerOptions {
  name: string;
  text: string;
  size: Num;
  color: string;
  font?: string;
  weight?: string;
  transform?: Record<string, unknown>;
  in?: Num;
  out?: Num;
}

export interface Composition {
  name: string;
  width: Num;
  height: Num;
  frames: Num;
  fps?: Num;
  layers: (LayerOptions | ImageLayerOptions | TextLayerOptions)[];
  images?: ImageAsset[];
}

const isImage = (layer: object): layer is ImageLayerOptions => "refId" in layer;
const isText = (layer: object): layer is TextLayerOptions => "text" in layer;

/** SVG markup → a data URI Lottie can use as an image asset. */
function dataUri(svg: string, width: Num, height: Num): string {
  const sized = svg
    .trim()
    .replace(
      /^<svg/,
      `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"`,
    );
  return `data:image/svg+xml;base64,${btoa(sized)}`;
}

/** Assembles a Lottie animation object. */
export function composition({
  name,
  width,
  height,
  frames,
  fps = 30,
  layers,
  images = [],
}: Composition): Record<string, unknown> {
  const fonts = layers.some(isText)
    ? {
        fonts: {
          list: [
            {
              fName: "Inter-Bold",
              fFamily: "Inter",
              fStyle: "Bold",
              fWeight: "700",
              ascent: 72,
            },
            {
              fName: "Inter-Regular",
              fFamily: "Inter",
              fStyle: "Regular",
              fWeight: "400",
              ascent: 72,
            },
          ],
        },
      }
    : {};

  return {
    v: "5.7.4",
    fr: fps,
    ip: 0,
    op: frames,
    w: width,
    h: height,
    nm: name,
    ddd: 0,
    ...fonts,
    assets: images.map((image) => ({
      id: image.id,
      w: image.width,
      h: image.height,
      u: "",
      p: dataUri(image.svg, image.width, image.height),
      e: 1,
    })),
    layers: [...layers].reverse().map((layer, index) => {
      const base = {
        ddd: 0,
        ind: index + 1,
        nm: layer.name,
        sr: 1,
        ks: layer.transform ?? ks(),
        ao: 0,
        ip: layer.in ?? 0,
        op: layer.out ?? frames,
        st: 0,
        bm: 0,
      };

      if (isImage(layer))
        return { ...base, ty: 2, refId: layer.refId, w: layer.width, h: layer.height };

      if (isText(layer)) {
        return {
          ...base,
          ty: 5,
          t: {
            d: {
              k: [
                {
                  t: 0,
                  s: {
                    s: layer.size,
                    f: layer.weight === "700" ? "Inter-Bold" : "Inter-Regular",
                    t: layer.text,
                    j: 0,
                    tr: 0,
                    lh: layer.size * 1.3,
                    ls: 0,
                    fc: rgb(layer.color).slice(0, 3),
                  },
                },
              ],
            },
            p: {},
            m: { g: 1, a: v(0, 0) },
            a: [],
          },
        };
      }

      return { ...base, ty: 4, shapes: [...layer.shapes].reverse() };
    }),
  };
}
