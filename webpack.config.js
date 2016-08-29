const path = require('path')
const debug = process.env.NODE_ENV !== 'production'

module.exports = {
	context: path.resolve(__dirname,'src'),
	entry: './index',
	output: {
		filename: './public/bundle.js'
	},
	devtool:  debug ? 'source-map' : null ,
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
				loader : 'style!css!postcss?browsers=last 2 versions'
			},
			{
				test: /\.(svg|png|jpg)$/,
				loader: 'file?name=[name].[ext]'
			}
		]
	},
	devServer: {
		proxy: [
			
        	{path: '/', target: 'http://localhost:3000/', secure: false }
        ]

	},
	externals: {
	       // 'react': 'React',
	        //'react-dom': 'ReactDOM',
	        //'socket.io-client': 'io'
	}
}