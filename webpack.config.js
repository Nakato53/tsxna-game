const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    devtool: 'source-map', 
	entry: './src/Main.ts',
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "index.js"
	},
	resolve: {
		extensions: ['.ts', ".js"],
    }, 
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
    },
	module: {
		rules: [
			{
				test: /\.ts?$/,				
				use: [
					{ 	loader: "ts-loader",
						options: { 
							allowTsInNodeModules: true 
						} 
					}
				],
				
			},
		]
	},
	plugins: [
		new CopyPlugin({
		  patterns: [
			{ from: 'src/Content', to: "Content" }
		  ],
		}),
	  ],
}