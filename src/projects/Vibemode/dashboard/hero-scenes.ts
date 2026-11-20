import {
  type ImageAsset,
  type LayerOptions,
  type Num,
  type Point,
  composition,
  ellipse,
  kf,
  ks,
  poly,
  rect,
  v,
} from "../../shared/lib/lottie-build";
import { amazonLogo, facebookLogo, googleLogo, metaLogo, shopifyLogo } from "../../shared/lib/logos";

/**
 * The three hero animations, built as real Lottie data (see lib/lottie-build).
 * They play one after another — each one hands over on `complete`, so there is
 * no carousel, just a loop of three short films.
 */

const W = 400;
const H = 150;
const FPS = 30;

const TILE = 32;

const logos: ImageAsset[] = [
  { id: "amazon", svg: amazonLogo, width: 20, height: 20 },
  { id: "google", svg: googleLogo, width: 20, height: 20 },
  { id: "meta", svg: metaLogo, width: 20, height: 20 },
  { id: "shopify", svg: shopifyLogo, width: 20, height: 20 },
  { id: "facebook", svg: facebookLogo, width: 20, height: 20 },
];

/** A white tile with a marketplace logo, popping in at `at`. */
function tile(id: string, [x, y]: Point, at: Num, float = 14) {
  const pop = kf(
    [
      { t: at, s: [0, 0, 100] },
      { t: at + 7, s: [112, 112, 100] },
      { t: at + 12, s: [100, 100, 100] },
    ],
    "spring",
  );

  const drift = kf([
    { t: at + 12, s: [x, y, 0] },
    { t: at + 12 + float, s: [x, y - 5, 0] },
    { t: at + 12 + float * 2, s: [x, y, 0] },
  ]);

  const fade = kf([
    { t: at, s: [0] },
    { t: at + 5, s: [100] },
  ]);

  const surface: LayerOptions = {
    name: `tile-${id}`,
    in: at,
    transform: ks({ position: drift, anchor: [x, y], scale: pop, opacity: fade }),
    shapes: [
      rect(x - TILE / 2, y - TILE / 2 + 3, TILE, TILE, 10, {
        fill: "#1b3a6b",
        fillOpacity: 8,
      }),
      rect(x - TILE / 2, y - TILE / 2, TILE, TILE, 10, { fill: "#ffffff" }),
    ],
  };

  const mark = {
    name: `logo-${id}`,
    refId: id,
    width: 20,
    height: 20,
    in: at,
    // Image layers anchor inside the image box, not the composition.
    transform: ks({ position: drift, anchor: [10, 10], scale: pop, opacity: fade }),
  };

  return [surface, mark];
}

const leaf = (name: string, [x, y]: Point, rotation: Num, at: Num, tone = "#8fd3c8") => ({
  name,
  in: at,
  transform: ks({
    position: [x, y],
    anchor: [x, y],
    rotation: kf([
      { t: at, s: [rotation - 12] },
      { t: at + 14, s: [rotation] },
      { t: at + 46, s: [rotation + 6] },
      { t: at + 80, s: [rotation] },
    ]),
    scale: kf(
      [
        { t: at, s: [0, 0, 100] },
        { t: at + 12, s: [100, 100, 100] },
      ],
      "spring",
    ),
  }),
  shapes: [ellipse(x, y, 20, 40, { fill: tone })],
});

const shadow = (cx: Num, cy: Num, width: Num, at = 4) => ({
  name: "shadow",
  transform: ks({
    opacity: kf([
      { t: at, s: [0] },
      { t: at + 12, s: [22] },
    ]),
  }),
  shapes: [ellipse(cx, cy, width, 12, { fill: "#4f7ab5" })],
});

/* ------------------------------------------------------------------ people */

function person(cx: Num, cy: Num, at: Num): LayerOptions {
  return {
    name: "person",
    in: at,
    transform: ks({
      position: kf(
        [
          { t: at, s: [cx, cy + 26, 0] },
          { t: at + 16, s: [cx, cy, 0] },
          { t: at + 48, s: [cx, cy - 3, 0] },
          { t: at + 84, s: [cx, cy, 0] },
        ],
        "spring",
      ),
      anchor: [cx, cy],
      opacity: kf([
        { t: at, s: [0] },
        { t: at + 8, s: [100] },
      ]),
    }),
    shapes: [
      // hair, head, neck, shoulders
      ellipse(cx, cy - 40, 32, 28, { fill: "#20304f" }),
      ellipse(cx, cy - 32, 28, 30, { fill: "#f7cbaa" }),
      rect(cx - 5, cy - 22, 10, 12, 2, { fill: "#eab894" }),
      rect(cx - 24, cy - 14, 48, 36, 14, { fill: "#2f6ff0" }),
      // laptop
      poly(
        [
          [cx - 26, cy + 4],
          [cx + 26, cy + 4],
          [cx + 34, cy + 32],
          [cx - 34, cy + 32],
        ],
        { fill: "#dbe8ff" },
      ),
      poly(
        [
          [cx - 20, cy + 9],
          [cx + 20, cy + 9],
          [cx + 25, cy + 27],
          [cx - 25, cy + 27],
        ],
        { fill: "#ffffff", fillOpacity: 45 },
      ),
      rect(cx - 38, cy + 32, 76, 7, 3.5, { fill: "#c3d6f4" }),
    ],
  };
}

/* --------------------------------------------------------------- storefront */

function storefront(cx: Num, cy: Num, at: Num): LayerOptions {
  return {
    name: "storefront",
    in: at,
    transform: ks({
      position: kf(
        [
          { t: at, s: [cx, cy + 30, 0] },
          { t: at + 18, s: [cx, cy, 0] },
          { t: at + 52, s: [cx, cy - 3, 0] },
          { t: at + 88, s: [cx, cy, 0] },
        ],
        "spring",
      ),
      anchor: [cx, cy],
      opacity: kf([
        { t: at, s: [0] },
        { t: at + 8, s: [100] },
      ]),
    }),
    shapes: [
      rect(cx - 42, cy - 48, 84, 12, 3, { fill: "#f2b23f" }),
      rect(cx - 28, cy - 45, 56, 6, 3, { fill: "#ffffff", fillOpacity: 55 }),
      poly(
        [
          [cx - 46, cy - 36],
          [cx + 46, cy - 36],
          [cx + 39, cy - 22],
          [cx - 39, cy - 22],
        ],
        { fill: "#f7c66a" },
      ),
      poly(
        [
          [cx - 39, cy - 36],
          [cx - 24, cy - 36],
          [cx - 27, cy - 22],
          [cx - 42, cy - 22],
        ],
        { fill: "#e8554e" },
      ),
      poly(
        [
          [cx - 9, cy - 36],
          [cx + 6, cy - 36],
          [cx + 5, cy - 22],
          [cx - 10, cy - 22],
        ],
        { fill: "#e8554e" },
      ),
      poly(
        [
          [cx + 21, cy - 36],
          [cx + 36, cy - 36],
          [cx + 37, cy - 22],
          [cx + 22, cy - 22],
        ],
        { fill: "#e8554e" },
      ),
      rect(cx - 40, cy - 22, 80, 46, 5, { fill: "#eef4ff" }),
      rect(cx - 32, cy - 13, 22, 20, 3, { fill: "#8fc4f4" }),
      rect(cx + 10, cy - 13, 22, 20, 3, { fill: "#8fc4f4" }),
      rect(cx - 8, cy - 15, 16, 39, 3, { fill: "#2f6ff0" }),
      ellipse(cx + 4, cy + 5, 4, 4, { fill: "#ffffff" }),
      rect(cx - 48, cy + 24, 96, 7, 3.5, { fill: "#d7e3f5" }),
    ],
  };
}

/* ------------------------------------------------------------------ scenes */

/** d3 — "One catalog. Multiple marketplaces." */
const catalogScene = composition({
  name: "catalog",
  width: W,
  height: H,
  frames: 110,
  fps: FPS,
  images: logos,
  layers: [
    leaf("leaf-left", [48, 112], -22, 10),
    leaf("leaf-left-2", [68, 120], -6, 14, "#bfe6dd"),
    leaf("leaf-right", [352, 112], 22, 12),
    leaf("leaf-right-2", [332, 122], 8, 16, "#bfe6dd"),
    shadow(200, 126, 150),
    storefront(200, 78, 0),
    ...tile("shopify", [92, 48], 22),
    ...tile("amazon", [146, 22], 28),
    ...tile("google", [246, 24], 34),
    ...tile("meta", [304, 46], 40),
    ...tile("facebook", [338, 90], 46),
  ],
});

/** d1 — "Keep your business growing everywhere." */
const growScene = composition({
  name: "grow",
  width: W,
  height: H,
  frames: 105,
  fps: FPS,
  images: logos,
  layers: [
    leaf("leaf-left", [46, 114], -20, 12),
    leaf("leaf-right", [356, 114], 20, 16, "#bfe6dd"),
    shadow(176, 126, 130),
    {
      name: "arcs",
      in: 8,
      transform: ks(),
      shapes: [
        poly(
          [
            [186, 74],
            [228, 50],
            [266, 34],
          ],
          {
            stroke: "#a9c6ee",
            strokeWidth: 2,
            dash: [4, 6],
            closed: false,
            trim: kf([
              { t: 8, s: [0] },
              { t: 34, s: [100] },
            ]),
          },
        ),
        poly(
          [
            [186, 74],
            [238, 62],
            [292, 50],
          ],
          {
            stroke: "#a9c6ee",
            strokeWidth: 2,
            dash: [4, 6],
            closed: false,
            trim: kf([
              { t: 14, s: [0] },
              { t: 40, s: [100] },
            ]),
          },
        ),
      ],
    },
    person(176, 76, 0),
    ...tile("amazon", [262, 30], 26),
    ...tile("google", [306, 20], 32),
    ...tile("meta", [344, 46], 38),
    ...tile("shopify", [330, 88], 44),
  ],
});

/** d2 — "Sync your products. Sell everywhere." */
const syncScene = composition({
  name: "sync",
  width: W,
  height: H,
  frames: 115,
  fps: FPS,
  images: logos,
  layers: [
    leaf("leaf-left", [40, 114], -20, 12),
    leaf("leaf-right", [364, 118], 20, 16, "#bfe6dd"),
    shadow(150, 126, 130),
    person(150, 76, 0),
    ...tile("amazon", [210, 32], 24),
    ...tile("google", [252, 20], 30),
    ...tile("meta", [292, 32], 36),
    ...tile("shopify", [196, 86], 42),
    {
      name: "card",
      in: 48,
      transform: ks({
        position: kf(
          [
            { t: 48, s: [348, 48, 0] },
            { t: 62, s: [322, 48, 0] },
            { t: 96, s: [322, 44, 0] },
          ],
          "spring",
        ),
        anchor: [322, 48],
        opacity: kf([
          { t: 48, s: [0] },
          { t: 58, s: [100] },
        ]),
      }),
      shapes: [
        rect(266, 29, 112, 44, 10, { fill: "#1b3a6b", fillOpacity: 8 }),
        rect(266, 26, 112, 44, 10, { fill: "#ffffff" }),
      ],
    },
    {
      name: "card-title",
      text: "One catalog",
      size: 13,
      color: "#0f2147",
      weight: "700",
      in: 52,
      transform: ks({
        position: [276, 46, 0],
        opacity: kf([
          { t: 52, s: [0] },
          { t: 62, s: [100] },
        ]),
      }),
    },
    {
      name: "card-copy",
      text: "Multiple marketplaces",
      size: 11,
      color: "#5c6b83",
      in: 56,
      transform: ks({
        position: [276, 62, 0],
        opacity: kf([
          { t: 56, s: [0] },
          { t: 66, s: [100] },
        ]),
      }),
    },
  ],
});

export interface HeroScene {
  id: string;
  title: string;
  copy: string;
  link?: string;
  data: Record<string, unknown>;
}

/** Played in this order, then looped. */
export const heroScenes: HeroScene[] = [
  {
    id: "catalog",
    title: "One catalog.<br />Multiple marketplaces.",
    copy: "Keep your products in sync and reach more customers, everywhere.",
    link: "Learn more",
    data: catalogScene,
  },
  {
    id: "grow",
    title: "Keep your business<br />growing everywhere.",
    copy: "Sync once. Sell everywhere.",
    data: growScene,
  },
  {
    id: "sync",
    title: "Sync your products.<br />Sell everywhere.",
    copy: "Manage your catalog, automate feeds and grow across multiple marketplaces.",
    link: "Learn more",
    data: syncScene,
  },
];

export const sceneDuration = (index: Num): Num =>
  ((heroScenes[index]?.data["op"] as Num) ?? 100) / FPS;

export { v };
