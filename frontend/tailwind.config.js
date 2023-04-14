/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      height:{
        '600':"600px",
        '500':"500px",
        "95%":"92%",
        "94%":"94%"

      },
      width:{
        "26%":"26%"
      },
      colors:{
        "bg-chat":"#F7F7F7",
        "chat-bottom" : "#F5F1EE"
      }
    },
  },
  plugins: [],
}
