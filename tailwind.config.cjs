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
			},
			typography: {
				DEFAULT: {
					css: {
						'a, h1': {
							"background"             : "linear-gradient(100deg, #00AA81 0%, #0EB400 100%)",
							"color"                  : "transparent",
							"-webkit-background-clip": "text",
							"-webkit-text-fill-color": "transparent",
						},
						'blockquote p:first-of-type::before': false,
						'blockquote p:last-of-type::after'  : false,
						'blockquote p' 				        : {
							'margin-top'   : 0,
							'margin-bottom': 0,
							'font-size'    : '1rem',
						}
					}
				}
			}
		}
	},

	plugins: [
		require("@tailwindcss/forms"),
		require("@tailwindcss/typography"),
	]
};

module.exports = config;
