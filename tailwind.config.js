/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      palette: {
        grandmaster: '#AE0000',
        master: '#A580BB',
        diamond: '#C7E5EB',
        platinum: '#488C8E',
        gold: '#FFC900',
        silver: '#DEDEDE',
        bronze: '#B87B23',
        iron: '#6C6357',
        peak: '#FFE400',
        positive: '#51FF1E',
        negative: '#FF1E1E',
        white: '#FFFFFF',
        dark: '#202020',
        lessdark: '#464646',
        hyperlink: '#00C9FF',
      },
    },
  },
  plugins: [],
}
