/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/layouts/main.handlebars"],
  theme: {
    extend: {},
  },
  plugins: []
};

module.exports = {
  content: ["./views/login.handlebars"],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};