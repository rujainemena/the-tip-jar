/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/layouts/main.handlebars", "./views/layouts/homepage.handlebars", "./views/layouts/profile.handlebars"],
  theme: {
    extend: {}
  },
  plugins: []
};

module.exports = {
  content: ["./views/login.handlebars", "./views/signup.handlebars", "./views/jars.handlebars"],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
