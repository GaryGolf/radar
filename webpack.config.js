const path = require('path')
module.exports = {
	entry: './src/index.js',
	output: {
		filename: './public/bundle.js'
	},
	resolve: {
	        extensions: ['','.js','.jsx']
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				include: [ path.resolve(__dirname, "src") ],
				loader: 'babel',
				query: {
					presets: ['es2015','react','stage-0'],
					plugins: ['transform-class-properties']	
				}
			},
			{
				test: /\.css$/,
				loader : 'style!css!autoprefixer?browsers=last 2 versions'
			},
			{
				test: /\.(svg|png|jpg)$/,
				loader: 'file?name=[name].[ext]'
			}
		]
	},
	externals: {
	       // 'react': 'React',
	        //'react-dom': 'ReactDOM',
	        'socket.io-client': 'io'
	}
}