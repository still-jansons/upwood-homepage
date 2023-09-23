/** @type {import('tailwindcss').Config}*/
const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		container: {
			center: true,
		},
		extend: {
			fontFamily: {
				header: ['Lexend Deca', 'sans-serif'],
				sans  : ['Roboto'     , 'sans-serif']
			},
			colors: {
				black: '#484848',
			}
		}
	},

	plugins: [require("@tailwindcss/forms")]
};

module.exports = config;
