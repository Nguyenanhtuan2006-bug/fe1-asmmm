/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {},
  },
  // THÊM ĐOẠN NÀY ĐỂ TRÁNH XUNG ĐỘT VỚI NG-ZORRO
  corePlugins: {
    preflight: false,
  },
  plugins: [],
};
