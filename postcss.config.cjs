const config = {
	plugins: [
		//Some plugins, like tailwindcss/nesting, need to run before Tailwind,
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        require('tailwindcss/nesting')(require('postcss-nesting')),
        require('tailwindcss'),
		//But others, like autoprefixer, need to run after,
        require('autoprefixer')
	]
};

module.exports = config;
