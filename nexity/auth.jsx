
// auth.jsx — Email + OTP login (simulated) and loading screen
// Replicates the "LOGIN SCREEN" and "Loading Screen · Option 1" frames of the Figma
// prototype (insumos/Nexity Benká Group .pdf, pages 2–5 and 28), measured on a
// 1512 × 980 canvas. There is no backend: authService fakes every response using
// AUTH_DEMO, so the whole flow can be demoed without sending a single email.

const AUTH_ART = {
  // Background "K" shapes, 1512 × 980 design canvas (clipped to 810 wide)
  shapes: [
    ['#0094FF', 'M -29 489.9C 278.5 402.7 417.8 119.7 449.1 -11L 264.4 -11C 233.6 154.6 56 265.9 -29 300.9ZM -29 489.9'],
    ['#0F91FF', 'M 331 489.9C 638.5 402.7 777.9 119.7 809.1 -11L 624.5 -11C 593.6 154.6 416 265.9 331 300.9ZM 331 489.9'],
    ['#0F91FF', 'M -29 489.9C 278.5 577.1 417.8 860.2 449.1 990.8L 264.4 990.8C 233.6 825.2 56 713.9 -29 679ZM -29 489.9'],
    ['#0094FF', 'M 331 489.9C 638.5 577.1 777.9 860.2 809.1 990.8L 624.5 990.8C 593.6 825.2 416 713.9 331 679ZM 331 489.9'],
  ],
  // Benká mark, top-left corner (70.42 × 41.07)
  mark: ['M 27.48 20.32L 27.48 41.07L 36.99 41.07L 36.99 10.8L 36.97 10.8C 36.97 10.48 36.95 10.15 36.92 9.82C 36.52 5.47 33.51 1.86 29.47 0.54C 28.41 0.19 27.3 0.01 26.13 0.01L 26.08 0.01C 26.05 0.01 26.01 0.01 25.97 0.01L 0 0.01L 0 9.42L 24.03 9.42C 20.32 17.01 9.73 26.2 0 30.19L 0 41.07C 9.84 37.56 22.38 28.9 27.49 20.32ZM 27.48 20.32', 'M 53.79 19.83C 51.41 21.85 48.76 23.64 45.9 25.15L 45.74 25.27L 58.11 41.07L 70.42 41.07ZM 53.79 19.83', 'M 36.99 17.65C 44.73 15.69 52.29 8.89 55.61 0L 66.97 0C 62.63 13.53 51.98 24.45 36.99 28.7ZM 36.99 17.65'],
  // Benká Group lockup in the footer (118.85 × 14.52)
  lockup: [
    ['#000000', 'M 7.47 5.6L 7.47 11.32L 10.06 11.32L 10.06 2.98L 10.05 2.98C 10.05 2.89 10.05 2.8 10.03 2.71C 9.92 1.51 9.1 0.52 8.01 0.15C 7.72 0.06 7.43 0 7.1 0L 7.09 0C 7.08 0 7.08 0 7.07 0L 0 0L 0 2.59L 6.53 2.59C 5.52 4.68 2.65 7.22 0 8.32L 0 11.32C 2.69 10.35 6.08 7.96 7.47 5.6ZM 7.47 5.6'],
    ['#7DB9FF', 'M 14.61 5.47C 13.97 6.02 13.25 6.51 12.48 6.93L 12.43 6.96L 15.8 11.32L 19.14 11.32ZM 14.61 5.47'],
    ['#0D42FF', 'M 10.06 4.87C 12.15 4.32 14.21 2.45 15.12 0L 18.19 0C 17.01 3.73 14.12 6.74 10.06 7.9L 10.06 4.86ZM 10.06 4.87'],
    ['#000000', 'M 39.45 3.62C 38.76 3.17 37.98 2.94 37.1 2.94C 36.31 2.94 35.59 3.14 34.94 3.51C 34.27 3.88 33.77 4.39 33.4 5.04C 33.02 5.7 32.84 6.41 32.84 7.21C 32.84 8.01 33.03 8.72 33.41 9.38C 33.79 10.04 34.31 10.55 34.96 10.92C 35.63 11.29 36.37 11.48 37.18 11.48C 38.04 11.48 38.8 11.28 39.47 10.88C 39.97 10.57 40.37 10.19 40.7 9.74C 40.75 9.7 40.78 9.65 40.81 9.61L 39.15 8.87C 39.1 8.92 39.08 8.95 39.04 9C 38.87 9.16 38.71 9.31 38.5 9.42C 38.13 9.64 37.71 9.75 37.24 9.75C 36.78 9.75 36.33 9.64 35.97 9.42C 35.59 9.19 35.29 8.89 35.09 8.5C 35 8.32 34.92 8.12 34.87 7.91L 41.29 7.91C 41.43 7.02 41.32 6.19 40.99 5.43C 40.66 4.66 40.14 4.07 39.44 3.62ZM 34.91 6.37C 34.95 6.21 35.02 6.06 35.08 5.93C 35.29 5.53 35.57 5.22 35.93 5.01C 36.28 4.78 36.67 4.67 37.11 4.67C 37.54 4.67 37.93 4.78 38.26 4.98C 38.6 5.18 38.86 5.46 39.07 5.81C 39.17 5.98 39.25 6.17 39.3 6.37ZM 34.91 6.37'],
    ['#000000', 'M 59.81 3.07L 57.52 3.07C 57.25 4.43 55.64 6.12 54.2 6.58L 54.2 3.39L 54.55 3.04C 54.59 2.99 54.56 2.92 54.5 2.92L 51.93 2.92C 51.87 2.92 51.84 2.99 51.88 3.04L 52.21 3.39L 52.21 10.86L 51.88 11.21C 51.84 11.24 51.87 11.32 51.93 11.32L 54.5 11.32C 54.56 11.32 54.59 11.25 54.55 11.21L 54.2 10.86L 54.2 8.81C 54.62 8.64 55.04 8.44 55.46 8.19L 57.88 11.33L 60.38 11.33L 57.04 7C 58.15 5.99 59.12 4.66 59.81 3.07ZM 59.81 3.07'],
    ['#000000', 'M 30.34 5.58C 30.31 5.56 30.27 5.54 30.24 5.52C 30.57 5.3 30.83 5.01 31.03 4.67C 31.32 4.21 31.45 3.69 31.45 3.09C 31.45 2.49 31.32 1.99 31.03 1.52C 30.76 1.05 30.36 0.68 29.86 0.4C 29.34 0.14 28.75 0 28.08 0L 22.75 0C 22.65 0 22.6 0.13 22.67 0.2L 23.28 0.81L 23.28 10.51L 22.67 11.11C 22.6 11.19 22.65 11.32 22.75 11.32L 28.57 11.32C 29.23 11.32 29.83 11.19 30.34 10.93C 30.84 10.67 31.24 10.3 31.51 9.84C 31.8 9.38 31.94 8.85 31.94 8.26C 31.94 7.68 31.8 7.14 31.51 6.67C 31.24 6.2 30.84 5.83 30.34 5.58ZM 25.35 1.89L 27.9 1.89C 28.22 1.89 28.5 1.95 28.73 2.08C 28.97 2.21 29.16 2.38 29.29 2.59C 29.42 2.82 29.48 3.06 29.48 3.34C 29.48 3.63 29.42 3.87 29.29 4.09C 29.16 4.32 28.97 4.49 28.73 4.62C 28.48 4.75 28.2 4.81 27.9 4.81L 25.35 4.81ZM 29.58 8.71C 29.46 8.93 29.28 9.11 29.04 9.24C 28.8 9.37 28.52 9.43 28.22 9.43L 25.35 9.43L 25.35 6.5L 28.22 6.5C 28.52 6.5 28.8 6.57 29.04 6.7C 29.28 6.83 29.46 7 29.58 7.21C 29.72 7.43 29.78 7.67 29.78 7.96C 29.78 8.23 29.72 8.48 29.58 8.7ZM 29.58 8.71'],
    ['#000000', 'M 50.49 10.87L 50.49 6.36C 50.49 5.7 50.35 5.12 50.07 4.6C 49.79 4.08 49.4 3.67 48.89 3.39C 48.39 3.09 47.84 2.94 47.2 2.94C 46.56 2.94 46.02 3.1 45.51 3.41C 45.17 3.63 44.89 3.88 44.66 4.2L 44.66 3.07L 42.38 3.07C 42.31 3.07 42.29 3.14 42.32 3.18L 42.67 3.53L 42.67 10.85L 42.32 11.2C 42.29 11.23 42.31 11.32 42.38 11.32L 44.95 11.32C 45.01 11.32 45.04 11.24 45 11.2L 44.66 10.85L 44.66 6.7C 44.66 6.32 44.75 5.99 44.92 5.7C 45.08 5.4 45.33 5.17 45.62 5.01C 45.92 4.85 46.21 4.77 46.57 4.77C 46.95 4.77 47.26 4.85 47.56 5.01C 47.86 5.17 48.09 5.4 48.25 5.7C 48.41 5.99 48.5 6.32 48.5 6.7L 48.5 10.85L 48.16 11.2C 48.11 11.23 48.14 11.32 48.2 11.32L 50.78 11.32C 50.83 11.32 50.87 11.24 50.83 11.2L 50.5 10.87ZM 50.49 10.87'],
    ['#000000', 'M 66.65 0L 64.48 0C 64.42 0 64.39 0.07 64.43 0.12L 64.65 0.33L 63.91 2.21L 65.06 2.21C 65.1 2.21 65.14 2.19 65.17 2.15L 66.7 0.12C 66.73 0.07 66.71 0 66.65 0ZM 66.65 0'],
    ['#000000', 'M 68.27 11.21L 67.95 10.88L 67.95 6.04C 67.95 5.02 67.64 4.25 67 3.72C 66.36 3.18 65.53 2.92 64.5 2.92C 63.84 2.92 63.25 3.03 62.73 3.24C 62.21 3.45 61.79 3.75 61.47 4.14C 61.15 4.54 60.95 4.97 60.87 5.46L 62.84 5.9C 62.93 5.48 63.12 5.15 63.41 4.92C 63.7 4.68 64.07 4.57 64.51 4.57C 64.96 4.57 65.28 4.67 65.55 4.88C 65.81 5.08 65.94 5.34 65.94 5.66C 65.94 5.89 65.88 6.05 65.75 6.16C 65.63 6.27 65.43 6.35 65.15 6.37L 63.73 6.51C 62.84 6.6 62.1 6.85 61.52 7.26C 60.93 7.67 60.63 8.29 60.63 9.13C 60.63 9.61 60.75 10.02 60.98 10.38C 61.2 10.73 61.52 11 61.92 11.2C 62.32 11.39 62.78 11.48 63.29 11.48C 63.89 11.48 64.48 11.34 65.03 10.84C 65.3 10.6 65.48 10.33 65.63 10.08C 65.77 9.83 65.88 9.59 65.94 9.42L 65.94 10.86L 65.6 11.21C 65.57 11.24 65.59 11.32 65.65 11.32L 68.22 11.32C 68.28 11.32 68.31 11.25 68.27 11.21ZM 65.95 7.84C 65.95 8.18 65.85 8.51 65.65 8.82C 65.46 9.15 65.19 9.39 64.86 9.59C 64.52 9.78 64.16 9.87 63.77 9.87C 63.42 9.87 63.14 9.8 62.93 9.63C 62.73 9.48 62.62 9.25 62.62 8.96C 62.62 8.7 62.72 8.49 62.92 8.33C 63.11 8.16 63.39 8.06 63.74 8.01L 65.15 7.84C 65.45 7.8 65.67 7.77 65.81 7.7C 65.86 7.68 65.91 7.66 65.95 7.63ZM 65.95 7.84'],
    ['#000000', 'M 83.6 11.32L 81.15 11.32C 81.08 11.32 81.03 11.23 81.09 11.17L 81.55 10.71L 81.55 9.42C 81.34 9.74 80.94 10.16 80.47 10.53C 79.61 11.22 78.54 11.48 77.6 11.48C 76.52 11.48 75.54 11.23 74.66 10.73C 73.77 10.22 73.07 9.53 72.56 8.65C 72.05 7.77 71.8 6.8 71.8 5.74C 71.8 4.67 72.05 3.71 72.56 2.83C 73.07 1.95 73.77 1.26 74.66 0.75C 75.54 0.25 76.52 0 77.6 0C 78.41 0 79.16 0.15 79.85 0.45C 80.54 0.75 81.13 1.14 81.62 1.63C 82.11 2.12 82.48 2.65 82.75 3.24L 80.8 3.98C 80.52 3.4 80.09 2.91 79.52 2.52C 78.95 2.13 78.31 1.95 77.6 1.95C 76.92 1.95 76.31 2.12 75.75 2.45C 75.2 2.78 74.76 3.24 74.44 3.82C 74.12 4.4 73.96 5.04 73.96 5.74C 73.96 6.44 74.12 7.08 74.44 7.66C 74.77 8.24 75.2 8.69 75.75 9.04C 76.31 9.37 76.92 9.53 77.6 9.53C 78.12 9.53 78.72 9.4 79.27 9.15C 79.65 9 80.17 8.6 80.5 8.03C 80.64 7.78 80.78 7.56 80.79 7.24L 77.82 7.24L 77.82 5.68L 81.76 5.68C 82.56 5.68 83.21 6.34 83.21 7.14L 83.21 10.71L 83.66 11.16C 83.72 11.23 83.68 11.32 83.6 11.32ZM 83.6 11.32'],
    ['#000000', 'M 97.34 3.5C 96.67 3.12 95.95 2.94 95.13 2.94C 94.32 2.94 93.57 3.12 92.93 3.5C 92.27 3.86 91.74 4.38 91.36 5.02C 90.99 5.68 90.79 6.39 90.79 7.19C 90.79 7.98 90.99 8.71 91.36 9.37C 91.74 10.02 92.27 10.53 92.93 10.91C 93.57 11.28 94.32 11.46 95.13 11.46C 95.95 11.46 96.67 11.28 97.34 10.91C 98 10.53 98.51 10.02 98.89 9.37C 99.28 8.71 99.46 7.99 99.46 7.19C 99.46 6.39 99.28 5.68 98.89 5.02C 98.51 4.38 98 3.86 97.34 3.5ZM 97.11 8.43C 96.9 8.81 96.64 9.1 96.3 9.31C 95.95 9.52 95.56 9.63 95.13 9.63C 94.7 9.63 94.32 9.52 93.98 9.31C 93.63 9.1 93.34 8.81 93.14 8.43C 92.95 8.06 92.85 7.65 92.85 7.2C 92.85 6.75 92.95 6.34 93.14 5.97C 93.34 5.59 93.63 5.3 93.97 5.09C 94.3 4.88 94.7 4.78 95.13 4.78C 95.56 4.78 95.94 4.88 96.29 5.09C 96.64 5.3 96.9 5.59 97.11 5.97C 97.31 6.34 97.4 6.75 97.4 7.2C 97.4 7.65 97.31 8.06 97.11 8.43ZM 97.11 8.43'],
    ['#000000', 'M 90.25 3.06L 90.25 4.96C 89.69 4.78 89.17 4.74 88.71 4.83C 88.22 4.93 87.85 5.14 87.57 5.47C 87.3 5.81 87.16 6.21 87.16 6.71L 87.16 10.86L 87.5 11.21C 87.56 11.25 87.52 11.33 87.46 11.33L 84.88 11.33C 84.82 11.33 84.79 11.25 84.83 11.21L 85.18 10.86L 85.18 3.54L 84.83 3.19C 84.79 3.16 84.82 3.08 84.88 3.08L 87.16 3.08L 87.16 4.21C 87.32 4 87.48 3.82 87.68 3.64C 88.04 3.34 88.44 3.14 88.89 3.03C 89.33 2.91 89.78 2.93 90.25 3.06ZM 90.25 3.06'],
    ['#000000', 'M 118.34 5.04C 117.99 4.39 117.51 3.88 116.91 3.51C 116.3 3.14 115.64 2.95 114.91 2.95C 114.17 2.95 113.52 3.13 112.96 3.5C 112.67 3.68 112.43 3.9 112.2 4.16L 112.2 3.08L 109.93 3.08C 109.88 3.08 109.85 3.16 109.89 3.19L 110.23 3.54L 110.23 14.06L 109.89 14.4C 109.85 14.45 109.88 14.52 109.93 14.52L 112.51 14.52C 112.56 14.52 112.6 14.45 112.55 14.4L 112.2 14.06L 112.2 10.28C 112.43 10.53 112.67 10.75 112.96 10.93C 113.52 11.3 114.16 11.48 114.91 11.48C 115.65 11.48 116.3 11.3 116.91 10.92C 117.51 10.55 117.99 10.04 118.34 9.38C 118.68 8.72 118.85 8 118.85 7.2C 118.85 6.4 118.68 5.7 118.34 5.04ZM 116.48 8.45C 116.29 8.81 116.01 9.11 115.66 9.32C 115.31 9.54 114.93 9.64 114.49 9.64C 114.05 9.64 113.69 9.54 113.34 9.32C 112.99 9.11 112.72 8.81 112.51 8.45C 112.31 8.07 112.2 7.66 112.2 7.21C 112.2 6.76 112.31 6.36 112.51 5.98C 112.72 5.61 112.99 5.32 113.34 5.11C 113.69 4.89 114.07 4.78 114.5 4.78C 114.94 4.78 115.31 4.89 115.65 5.11C 116 5.32 116.29 5.61 116.48 5.98C 116.69 6.36 116.79 6.76 116.79 7.21C 116.79 7.66 116.69 8.07 116.48 8.45ZM 116.48 8.45'],
    ['#000000', 'M 108.12 3.61L 108.12 3.54L 108.47 3.19C 108.51 3.16 108.48 3.07 108.41 3.07L 105.82 3.07C 105.75 3.07 105.73 3.15 105.76 3.19L 106.11 3.54L 106.11 7.56C 106.11 9.23 105.27 9.71 104.4 9.71C 103.33 9.71 102.59 8.99 102.59 7.56L 102.59 3.54L 102.94 3.19C 102.98 3.16 102.95 3.07 102.88 3.07L 100.31 3.07C 100.24 3.07 100.22 3.15 100.25 3.19L 100.59 3.54L 100.59 7.95C 100.59 9.57 101.75 11.48 103.76 11.48C 104.82 11.48 105.78 10.86 106.1 9.8L 106.1 11.33L 108.4 11.33C 108.47 11.33 108.5 11.25 108.46 11.21L 108.12 10.86ZM 108.12 3.61'],
  ],
};

// Font Awesome glyphs as drawn in the Figma file: [width, height, path]
const AUTH_GLYPHS = {
  chart: [24.0, 20.95, 'M 3 1.5C 3 0.67 2.33 0 1.5 0C 0.67 0 0 0.67 0 1.5L 0 17.21C 0 19.28 1.67 20.95 3.74 20.95L 22.51 20.95C 23.33 20.95 24 20.29 24 19.46C 24 18.63 23.33 17.96 22.51 17.96L 3.74 17.96C 3.34 17.96 3 17.63 3 17.21ZM 22.06 5.55C 22.65 4.96 22.65 4.01 22.06 3.43C 21.47 2.84 20.52 2.84 19.94 3.43L 15 8.35L 12.31 5.68C 11.72 5.09 10.77 5.09 10.19 5.68L 4.94 10.91C 4.35 11.5 4.35 12.45 4.94 13.03C 5.52 13.62 6.47 13.62 7.06 13.03L 11.25 8.85L 13.94 11.54C 14.53 12.13 15.49 12.13 16.06 11.54ZM 22.06 5.55'],
  mail: [16.0, 11.97, 'M 1.5 0C 0.67 0 0 0.66 0 1.49C 0 1.96 0.22 2.41 0.6 2.69L 7.4 7.77C 7.76 8.04 8.24 8.04 8.6 7.77L 15.4 2.69C 15.78 2.41 16 1.96 16 1.49C 16 0.66 15.33 0 14.5 0ZM 0 3.49L 0 9.97C 0 11.08 0.89 11.97 2 11.97L 14 11.97C 15.11 11.97 16 11.08 16 9.97L 16 3.49L 9.2 8.58C 8.48 9.11 7.52 9.11 6.8 8.58ZM 0 3.49'],
  signin: [16.01, 13.98, 'M 6.82 2.31L 10.65 6.14C 10.88 6.37 11 6.67 11 6.99C 11 7.31 10.88 7.62 10.65 7.84L 6.82 11.67C 6.62 11.87 6.35 11.98 6.06 11.98C 5.47 11.98 5.01 11.5 5.01 10.92L 5.01 8.99L 1 8.99C 0.45 8.99 0 8.54 0 7.99L 0 5.99C 0 5.44 0.45 5 1 5L 5.01 5L 5.01 3.05C 5.01 2.48 5.47 2 6.06 2C 6.35 2 6.62 2.12 6.82 2.31ZM 11 11.98L 13.01 11.98C 13.55 11.98 14 11.53 14 10.98L 14 3C 14 2.45 13.55 2 13.01 2L 11 2C 10.45 2 10 1.55 10 1C 10 0.45 10.45 0 11 0L 13.01 0C 14.67 0 16.01 1.34 16.01 3L 16.01 10.98C 16.01 12.63 14.67 13.98 13.01 13.98L 11 13.98C 10.45 13.98 10 13.53 10 12.97C 10 12.42 10.45 11.98 11 11.98ZM 11 11.98'],
  shield: [15.01, 15.95, 'M 7.5 0C 7.65 0 7.78 0.04 7.92 0.09L 13.8 2.59C 14.49 2.87 15.01 3.55 15 4.37C 14.99 7.46 13.71 13.12 8.33 15.69C 7.8 15.95 7.2 15.95 6.67 15.69C 1.29 13.12 0.02 7.46 0 4.37C 0 3.55 0.51 2.87 1.2 2.59L 7.08 0.09C 7.21 0.04 7.36 0 7.5 0ZM 7.5 2.09L 7.5 13.87C 11.81 11.79 12.97 7.18 13 4.41ZM 7.5 2.09'],
  check: [16.0, 16.0, 'M 8 16C 10.13 16 12.16 15.15 13.66 13.65C 15.16 12.15 16 10.12 16 8C 16 5.88 15.16 3.84 13.66 2.34C 12.16 0.84 10.13 0 8 0C 5.88 0 3.85 0.84 2.35 2.34C 0.85 3.84 0 5.88 0 8C 0 10.12 0.85 12.15 2.35 13.65C 3.85 15.15 5.88 16 8 16ZM 11.54 6.53L 7.54 10.53C 7.24 10.82 6.76 10.82 6.48 10.53L 4.47 8.53C 4.18 8.23 4.18 7.76 4.47 7.47C 4.77 7.18 5.24 7.18 5.54 7.47L 7 8.94L 10.47 5.47C 10.76 5.17 11.24 5.17 11.53 5.47C 11.82 5.76 11.82 6.24 11.53 6.52ZM 11.54 6.53'],
};

// ── Demo rules ────────────────────────────────────────────────────────────────
const AUTH_DEMO = {
  codeLength: 6,
  validCode: '123456',
  expiredCode: '000000',
  disabledEmails: ['inactivo@nexity.co'],   // not enabled to sign in
  sendFailEmails: ['error@nexity.co'],      // the first send fails
  resendFailEmails: ['reenvio@nexity.co'],  // the first send works, resending fails
  userEmails: ['usuario@nexity.co'],        // signs in with the "user" role; everyone else is admin
  codeTtlMs: 5 * 60 * 1000,
  latencyMs: 1200,
  noticeMs: 5000,
};

// ── Copy ──────────────────────────────────────────────────────────────────────
const AUTH_COPY = {
  en: {
    welcome: 'Welcome to', subtitle: 'Access your management dashboard',
    emailLabel: 'Email Address', emailPlaceholder: 'Enter your email',
    requestCode: 'Request OTP', sending: 'Sending code...',
    secureTitle: 'Secure Access', secureBody: 'Your data is protected with enterprise-grade security protocols.',
    codeLabel: 'Enter verification code', codePlaceholder: 'Enter verification code',
    signIn: 'Sign In', verifying: 'Verifying...', granted: 'Access granted',
    noEmail: 'Did not receive the email?', checkSpam: 'Check your spam or', resend: 'Resend code.', resending: 'Resending code...',
    codeSent: 'Verification code sent', codeResent: 'Verification code resent',
    emailRequired: 'Email address is required', emailFormat: 'Enter a valid email address',
    emailNotEnabled: 'This email is not enabled to access Nexity',
    sendFailed: "We couldn't send the code. Please try again",
    resendFailed: "We couldn't resend the code. Please try again",
    codeRequired: 'The verification code is required', codeInvalid: 'Invalid verification code',
    codeIncorrect: 'Incorrect verification code', codeExpired: 'Verification code expired. Request a new one',
    poweredBy: 'Powered by',
    preparing: 'Preparing your experience', initializing: 'Initializing', loadingData: 'Loading Data',
  },
  es: {
    welcome: 'Bienvenido a', subtitle: 'Accede a tu tablero de gestión',
    emailLabel: 'Correo electrónico', emailPlaceholder: 'Ingresa tu correo',
    requestCode: 'Solicitar código', sending: 'Enviando código...',
    secureTitle: 'Acceso seguro', secureBody: 'Tus datos están protegidos con protocolos de seguridad de nivel empresarial.',
    codeLabel: 'Ingresa el código de verificación', codePlaceholder: 'Código de verificación',
    signIn: 'Iniciar sesión', verifying: 'Verificando...', granted: 'Acceso concedido',
    noEmail: '¿No recibiste el correo?', checkSpam: 'Revisa tu carpeta de spam o', resend: 'reenvía el código.', resending: 'reenviando código...',
    codeSent: 'Código de verificación enviado', codeResent: 'Código de verificación reenviado',
    emailRequired: 'El correo electrónico es obligatorio', emailFormat: 'Ingresa un correo electrónico válido',
    emailNotEnabled: 'Este correo no está habilitado para ingresar a Nexity',
    sendFailed: 'No pudimos enviar el código. Inténtalo de nuevo',
    resendFailed: 'No pudimos reenviar el código. Inténtalo de nuevo',
    codeRequired: 'El código de verificación es obligatorio', codeInvalid: 'Código de verificación inválido',
    codeIncorrect: 'Código de verificación incorrecto', codeExpired: 'El código de verificación expiró. Solicita uno nuevo',
    poweredBy: 'Desarrollado por',
    preparing: 'Preparando tu experiencia', initializing: 'Iniciando', loadingData: 'Cargando datos',
  },
};

// Language: ?lang=es|en, then the last choice, then English (the Figma language)
const getAuthLang = () => {
  try {
    const fromUrl = new URLSearchParams(window.location.search).get('lang');
    if (AUTH_COPY[fromUrl]) return fromUrl;
    const saved = window.localStorage.getItem('nexity.lang');
    if (AUTH_COPY[saved]) return saved;
  } catch (e) {}
  return 'en';
};
const saveAuthLang = (lang) => { try { window.localStorage.setItem('nexity.lang', lang); } catch (e) {} };

// ?pantalla=codigo|reenviado|invalido opens the card straight in that Figma state
const AUTH_PRESETS = {
  codigo:    { step: 'code' },
  reenviado: { step: 'code', notice: { tone: 'success', key: 'codeResent' } },
  invalido:  { step: 'code', code: 'A34B#&', error: 'codeInvalid' },
};
const getAuthPreset = () => {
  try { return AUTH_PRESETS[new URLSearchParams(window.location.search).get('pantalla')] || {}; }
  catch (e) { return {}; }
};

// ── Simulated backend ─────────────────────────────────────────────────────────
const authWait = () => new Promise((resolve) => setTimeout(resolve, AUTH_DEMO.latencyMs));
const authFail = (code) => { const err = new Error(code); err.code = code; throw err; };
const inList = (list, email) => list.includes(email.trim().toLowerCase());

const authService = {
  async requestCode(email) {
    await authWait();
    if (inList(AUTH_DEMO.disabledEmails, email)) authFail('emailNotEnabled');
    if (inList(AUTH_DEMO.sendFailEmails, email)) authFail('sendFailed');
    return { expiresAt: Date.now() + AUTH_DEMO.codeTtlMs };
  },
  async resendCode(email) {
    await authWait();
    if (inList(AUTH_DEMO.resendFailEmails, email)) authFail('resendFailed');
    return { expiresAt: Date.now() + AUTH_DEMO.codeTtlMs };
  },
  async verifyCode(code, expiresAt) {
    await authWait();
    if (code === AUTH_DEMO.expiredCode || Date.now() > expiresAt) authFail('codeExpired');
    if (code !== AUTH_DEMO.validCode) authFail('codeIncorrect');
    return { ok: true };
  },
};

// Simulated session profile: role from AUTH_DEMO, display name from the local part of the email
// (juan.perez@nexity.co → "Juan Perez", the name shown in the Figma file)
const authProfile = (email) => {
  const clean = email.trim().toLowerCase();
  const name = clean.split('@')[0].split(/[._-]+/).filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  return { email: clean, name: name || clean, role: inList(AUTH_DEMO.userEmails, clean) ? 'user' : 'admin' };
};

const validateEmail = (value) => {
  const v = value.trim();
  if (!v) return 'emailRequired';
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? null : 'emailFormat';
};
const validateCode = (value) => {
  const v = value.trim();
  if (!v) return 'codeRequired';
  return new RegExp(`^\\d{${AUTH_DEMO.codeLength}}$`).test(v) ? null : 'codeInvalid';
};

// ── Tokens and shared styles ──────────────────────────────────────────────────
const AC = {
  blue: '#0F91FF', check: '#0094FF', ink: '#141414', sub: '#4B5563', label: '#374151',
  border: '#D1D5DB', icon: '#9CA3AF', error: '#FF4D4F', link: '#1E41FF',
  infoBg: '#EFF6FF', infoBorder: '#BFDBFE', infoTitle: '#1E40AF', infoBody: '#2563EB',
  footer: '#8C8C8C', loadingSub: '#52504C', muted: '#828282', track: '#CCCCCC',
};
const authFont = (weight, size, lineHeight) => `${weight} ${size}px/${lineHeight}px Inter, sans-serif`;

const AUTH_CSS = `
.nx-auth{position:fixed;inset:0;overflow-x:hidden;overflow-y:auto;background:#fff;color:${AC.ink};font-family:Inter,sans-serif;-webkit-font-smoothing:antialiased}
.nx-auth *{box-sizing:border-box}
.nx-auth-art{position:absolute;left:0;top:0;height:100%;aspect-ratio:810/980;display:block}
.nx-auth-mark{position:absolute;left:min(57px,5.816vh);top:min(58.7px,5.99vh);display:block}
.nx-auth-col{position:absolute;top:0;right:0;min-height:100%;display:flex;flex-direction:column}
.nx-auth-center{margin:auto 0;display:flex;justify-content:center;padding:24px 16px}
.nx-auth-foot{position:absolute;left:0;right:4.2px;bottom:32.2px;display:flex;justify-content:center;align-items:flex-end;gap:5.8px}
.nx-auth-input{width:100%;height:50px;margin:0;padding:0 16px 0 47.5px;border:1px solid ${AC.border};border-radius:12px;background:#fff;color:${AC.ink};font:${authFont(400, 14, 20)};outline:none;transition:border-color .15s,box-shadow .15s}
.nx-auth-input::placeholder{color:var(--nx-ph);opacity:1}
.nx-auth-input:focus{border-color:${AC.blue};box-shadow:0 0 0 3px rgba(15,145,255,.15)}
.nx-auth-input[aria-invalid="true"]{border-color:${AC.error}}
.nx-auth-input[aria-invalid="true"]:focus{box-shadow:0 0 0 3px rgba(255,77,79,.15)}
.nx-auth-input:read-only{background:#F9FAFB}
.nx-auth-btn{width:100%;height:48px;margin:0;border:0;border-radius:12px;background:${AC.blue};color:#fff;font:${authFont(400, 16, 24)};display:flex;align-items:center;justify-content:center;cursor:pointer;transition:background .15s}
.nx-auth-btn:hover:not(:disabled){background:#0B84EC}
.nx-auth-btn:focus-visible,.nx-auth-link:focus-visible{outline:2px solid ${AC.blue};outline-offset:2px}
.nx-auth-btn:disabled{cursor:progress;background:#3DA5FF}
.nx-auth-link{margin:0;padding:0;border:0;background:none;color:${AC.link};font:inherit;text-decoration:underline;text-decoration-thickness:1px;text-underline-offset:2px;cursor:pointer}
.nx-auth-link:disabled{cursor:progress;text-decoration:none;color:${AC.muted}}
@keyframes nx-auth-spin{to{transform:rotate(360deg)}}
@keyframes nx-auth-dot{0%,80%,100%{opacity:.35}40%{opacity:1}}
@media (max-width:1023px){.nx-auth-art{display:none}.nx-auth-col{left:0!important}}
@media (max-height:640px){.nx-auth-foot{position:static;margin:0 0 24px}}
`;

// ── Pieces ────────────────────────────────────────────────────────────────────
const AuthGlyph = ({ name, color, style }) => {
  const [w, h, d] = AUTH_GLYPHS[name];
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} aria-hidden="true" style={{ display: 'block', flexShrink: 0, ...style }}>
      <path d={d} fill={color} />
    </svg>
  );
};

const AuthAlertGlyph = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" style={{ display: 'block', flexShrink: 0 }}>
    <circle cx="8" cy="8" r="8" fill={AC.error} />
    <rect x="7.1" y="3.6" width="1.8" height="5.6" rx="0.9" fill="#fff" />
    <circle cx="8" cy="11.6" r="1.05" fill="#fff" />
  </svg>
);

const AuthSpinner = () => (
  <span aria-hidden="true" style={{ width: '16px', height: '16px', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.35)', borderTopColor: '#fff', animation: 'nx-auth-spin 0.7s linear infinite', flexShrink: 0 }} />
);

const AuthAppIcon = () => (
  <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: AC.blue, flexShrink: 0, position: 'relative' }}>
    <AuthGlyph name="chart" color="#fff" style={{ position: 'absolute', left: '20px', top: '20.5px' }} />
  </div>
);

const AuthFrame = ({ columnLeft, footer, children }) => (
  <div className="nx-auth">
    <style>{AUTH_CSS}</style>
    <svg className="nx-auth-art" viewBox="0 0 810 980" aria-hidden="true">
      {AUTH_ART.shapes.map(([fill, d], i) => <path key={i} d={d} fill={fill} />)}
    </svg>
    <svg className="nx-auth-mark" width="70.42" height="41.07" viewBox="0 0 70.42 41.07" role="img" aria-label="Benká">
      {AUTH_ART.mark.map((d, i) => <path key={i} d={d} fill={AC.blue} />)}
    </svg>
    <div className="nx-auth-col" style={{ left: columnLeft }}>
      <div className="nx-auth-center">{children}</div>
      {footer}
    </div>
  </div>
);

const AuthFooter = ({ t }) => (
  <div className="nx-auth-foot">
    <span style={{ font: authFont(300, 12, 16), color: AC.footer }}>{t.poweredBy}</span>
    <svg width="118.85" height="14.52" viewBox="0 0 118.85 14.52" role="img" aria-label="Benká Group" style={{ display: 'block', marginBottom: '0.6px' }}>
      {AUTH_ART.lockup.map(([fill, d], i) => <path key={i} d={d} fill={fill} />)}
    </svg>
  </div>
);

// Label row: plain label, or a success / error notice in its place (Figma "code resent")
const AuthLabel = ({ htmlFor, notice, t, children }) => (
  <div role="status" aria-live="polite" style={{ height: '20px', display: 'flex', alignItems: 'center', gap: '6px' }}>
    {notice && (notice.tone === 'error' ? <AuthAlertGlyph /> : <AuthGlyph name="check" color={AC.check} style={{ marginLeft: '-0.5px' }} />)}
    <label htmlFor={htmlFor} style={{ font: authFont(400, 14, 20), color: notice && notice.tone === 'error' ? AC.error : AC.label, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
      {notice ? t[notice.key] : children}
    </label>
  </div>
);

const AuthField = ({ id, value, onChange, placeholder, placeholderColor, error, readOnly, t, ...rest }) => (
  <>
    <div style={{ position: 'relative', marginTop: '8px' }}>
      <span style={{ position: 'absolute', left: '16px', top: 0, bottom: 0, display: 'flex', alignItems: 'center', pointerEvents: 'none' }}>
        <AuthGlyph name="mail" color={error ? AC.error : AC.icon} />
      </span>
      <input id={id} className="nx-auth-input" value={value} placeholder={placeholder} readOnly={readOnly}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={error ? 'true' : 'false'} aria-describedby={error ? `${id}-error` : undefined}
        style={{ '--nx-ph': placeholderColor }} {...rest} />
    </div>
    {error && (
      <div id={`${id}-error`} role="alert" style={{ margin: '3.4px 0 -5.4px', paddingLeft: '3px', font: authFont(400, 12, 16), color: AC.error }}>
        {t[error]}
      </div>
    )}
  </>
);

const AuthButton = ({ busy, done, icon, gap, children }) => (
  <button type="submit" className="nx-auth-btn" disabled={busy || done} aria-busy={busy ? 'true' : 'false'} style={{ gap: `${gap}px` }}>
    {busy ? <AuthSpinner /> : done ? <AuthGlyph name="check" color="#fff" /> : icon}
    <span>{children}</span>
  </button>
);

// ── Login ─────────────────────────────────────────────────────────────────────
const AuthScreen = ({ onLogin, lang = 'en' }) => {
  const t = AUTH_COPY[lang] || AUTH_COPY.en;
  const preset = React.useMemo(getAuthPreset, []);
  const [step, setStep] = React.useState(preset.step || 'email');  // email | code
  const [email, setEmail] = React.useState('');
  const [code, setCode] = React.useState(preset.code || '');
  const [busy, setBusy] = React.useState(null);                    // send | resend | verify | done
  const [error, setError] = React.useState(preset.error || null);  // message under the field
  const [notice, setNotice] = React.useState(preset.notice || null);
  const [expiresAt, setExpiresAt] = React.useState(() => Date.now() + AUTH_DEMO.codeTtlMs);
  const noticeTimer = React.useRef(null);

  React.useEffect(() => () => clearTimeout(noticeTimer.current), []);

  const flash = (key) => {
    clearTimeout(noticeTimer.current);
    setNotice({ tone: 'success', key });
    noticeTimer.current = setTimeout(() => setNotice(null), AUTH_DEMO.noticeMs);
  };

  const requestCode = async (e) => {
    e.preventDefault();
    if (busy) return;
    const invalid = validateEmail(email);
    setError(invalid);
    if (invalid) return;
    setBusy('send');
    try {
      const res = await authService.requestCode(email);
      setExpiresAt(res.expiresAt);
      setCode('');
      setStep('code');
      flash('codeSent');
    } catch (err) {
      setError(err.code);
    } finally {
      setBusy(null);
    }
  };

  const resendCode = async () => {
    if (busy) return;
    clearTimeout(noticeTimer.current);
    setNotice(null);
    setError(null);
    setBusy('resend');
    try {
      const res = await authService.resendCode(email);
      setExpiresAt(res.expiresAt);
      setCode('');
      flash('codeResent');
    } catch (err) {
      setNotice({ tone: 'error', key: err.code });
    } finally {
      setBusy(null);
    }
  };

  const verifyCode = async (e) => {
    e.preventDefault();
    if (busy) return;
    const invalid = validateCode(code);
    setError(invalid);
    if (invalid) return;
    setBusy('verify');
    try {
      await authService.verifyCode(code.trim(), expiresAt);
      clearTimeout(noticeTimer.current);
      setNotice(null);
      setBusy('done');
      setTimeout(() => onLogin(authProfile(email)), 700);
    } catch (err) {
      setError(err.code);
      setBusy(null);
    }
  };

  const onType = (setter) => (value) => { setter(value); if (error) setError(null); };
  const locked = busy === 'send' || busy === 'verify' || busy === 'done';

  return (
    <AuthFrame columnLeft="max(47.765vw, 73.69vh)" footer={<AuthFooter t={t} />}>
      <div style={{ width: '448px', maxWidth: '100%', background: '#fff', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.2)', boxShadow: '0 59px 100px rgba(0,0,0,0.25)', padding: step === 'email' ? '29px 32px 31px' : '29px 32px 25.2px' }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}><AuthAppIcon /></div>
        <h1 style={{ margin: '11.3px 0 0', font: authFont(400, 24, 32), color: AC.ink, textAlign: 'center' }}>
          {t.welcome} <span style={{ fontWeight: 600 }}>Nexity</span>
        </h1>
        <p style={{ margin: '2.7px 0 0', font: authFont(300, 14, 20), color: AC.sub, textAlign: 'center' }}>{t.subtitle}</p>

        {step === 'email' ? (
          <form key="email" onSubmit={requestCode} noValidate style={{ marginTop: '40.5px' }}>
            <AuthLabel htmlFor="nx-auth-email" t={t}>{t.emailLabel}</AuthLabel>
            <AuthField id="nx-auth-email" t={t} type="email" autoComplete="email" inputMode="email"
              value={email} onChange={onType(setEmail)} readOnly={locked}
              placeholder={t.emailPlaceholder} placeholderColor="#ADAEBC" error={error} />
            <div style={{ marginTop: '24px' }}>
              <AuthButton busy={busy === 'send'} gap={10} icon={<AuthGlyph name="signin" color="#fff" />}>
                {busy === 'send' ? t.sending : t.requestCode}
              </AuthButton>
            </div>
            <div style={{ marginTop: '24px', display: 'flex', gap: '12px', padding: '16px 16px 15px', background: AC.infoBg, border: `1px solid ${AC.infoBorder}`, borderRadius: '12px' }}>
              <div style={{ width: '16px', flexShrink: 0, paddingTop: '6.9px', display: 'flex', justifyContent: 'center' }}>
                <AuthGlyph name="shield" color={AC.blue} />
              </div>
              <div>
                <div style={{ font: authFont(400, 14, 20), color: AC.infoTitle }}>{t.secureTitle}</div>
                <div style={{ marginTop: '5.7px', font: authFont(400, 12, 15.7), color: AC.infoBody }}>{t.secureBody}</div>
              </div>
            </div>
          </form>
        ) : (
          <form key="code" onSubmit={verifyCode} noValidate style={{ marginTop: '40.5px' }}>
            <AuthLabel htmlFor="nx-auth-code" notice={notice} t={t}>{t.codeLabel}</AuthLabel>
            <AuthField id="nx-auth-code" t={t} autoComplete="one-time-code" inputMode="numeric" maxLength={12}
              value={code} onChange={onType(setCode)} readOnly={locked}
              placeholder={t.codePlaceholder} placeholderColor="#929292" error={error} />
            <div style={{ marginTop: '20px' }}>
              <AuthButton busy={busy === 'verify'} done={busy === 'done'} gap={8} icon={<AuthGlyph name="signin" color="#fff" />}>
                {busy === 'verify' ? t.verifying : busy === 'done' ? t.granted : t.signIn}
              </AuthButton>
            </div>
            <div style={{ marginTop: '17.6px', paddingLeft: '3px', color: AC.ink }}>
              <p style={{ margin: 0, font: authFont(500, 12, 16) }}>{t.noEmail}</p>
              <p style={{ margin: '6.2px 0 0', font: authFont(300, 12, 16) }}>
                {t.checkSpam}{' '}
                <button type="button" className="nx-auth-link" onClick={resendCode} disabled={!!busy}>
                  {busy === 'resend' ? t.resending : t.resend}
                </button>
              </p>
            </div>
          </form>
        )}
      </div>
    </AuthFrame>
  );
};

// ── Loading screen (Figma "Loading Screen · Option 1") ────────────────────────
const LoadingScreen = ({ progress, lang = 'en' }) => {
  const t = AUTH_COPY[lang] || AUTH_COPY.en;
  return (
    <AuthFrame columnLeft="max(50.56vw, 77.84vh)">
      <div role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress} aria-label={t.preparing}
        style={{ width: '320px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <AuthAppIcon />
        {/* The Figma texts sit a few px right of the icon/bar axis; the offsets keep that */}
        <div style={{ marginTop: '14.2px', position: 'relative', left: '3.5px', font: authFont(500, 36, 40), color: AC.ink }}>Nexity</div>
        <div style={{ marginTop: '9.35px', position: 'relative', left: '3px', font: authFont(300, 18, 28), color: AC.loadingSub }}>{t.preparing}</div>
        <div style={{ marginTop: '28.4px', position: 'relative', left: '5px', display: 'flex', alignItems: 'baseline', font: authFont(400, 14, 20), color: AC.muted }}>
          {t.initializing}
          <span style={{ display: 'flex', gap: '4px', marginLeft: '4.3px', position: 'relative', top: '1px' }}>
            {[0, 1, 2, 3].map((i) => (
              <span key={i} style={{ width: '4px', height: '4px', borderRadius: '50%', background: AC.muted, animation: `nx-auth-dot 1.2s ${i * 0.15}s infinite` }} />
            ))}
          </span>
        </div>
        <div style={{ marginTop: '9px', width: '320px', height: '8px', borderRadius: '4px', background: AC.track, overflow: 'hidden' }}>
          <div style={{ width: `${progress}%`, height: '100%', borderRadius: '4px', background: AC.blue, transition: 'width 0.4s ease' }} />
        </div>
        <div style={{ marginTop: '8.7px', width: '320px', display: 'flex', justifyContent: 'space-between', font: authFont(400, 12, 16), color: AC.muted }}>
          <span>{t.loadingData}</span>
          <span style={{ fontWeight: 300, fontVariantNumeric: 'tabular-nums' }}>{progress}%</span>
        </div>
      </div>
    </AuthFrame>
  );
};

Object.assign(window, { AuthScreen, LoadingScreen, getAuthLang, saveAuthLang, authProfile, AUTH_COPY, AUTH_DEMO });
