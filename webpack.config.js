const path = require('path')
const debug = process.env.NODE_ENV !== 'production'

module.exports = {
	context: path.resolve(__dirname,'src'),
	entry: {
		bundle: './client/index'
	},
	output: {
		path: path.resolve(__dirname,'public'),
		filename: '[name].js'
	},
	devtool:  debug ? 'source-map' : null ,
	resolve: {
	        extensions: ['','.js','.jsx','.ts','.tsx']
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				include: [ path.resolve(__dirname, 'src') ],
				loader: 'babel',
				query: {
					presets: ['es2015','react','stage-0'],
					plugins: ['transform-class-properties']
				}
			},
			{
				test: /\.tsx?$/,
				include: [path.resolve(__dirname,'src')],
				loader: 'ts'
			},
			{
				test: /\.css$/,
				loader : 'style!css!postcss?browsers=last 2 versions'
			},
			{
				test: /\.(svg|png|jpg)$/,
				loader: 'file?name=[name].[ext]'
			}
		],
		 preLoaders: [
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { test: /\.js$/, loader: "source-map-loader" }
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