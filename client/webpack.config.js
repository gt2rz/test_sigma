const HtmlWebpackPlugin = require('html-webpack-plugin')

const javascriptRules = {
    test: /\.js$/,
    exclude: /node_modules/,
    use: {
        loader: 'babel-loader',
        options: {
            presets: [
                '@babel/preset-env'
            ]
        }
    }
}

const stylesRules = {
    rules: [
        {
            test: /\.s[ac]ss$/i,
            use: [
                'style-loader',  // Creates `style` nodes from JS strings
                'css-loader', // Translates CSS into CommonJS
                {
                    loader: 'postcss-loader', // Run post css actions
                    options: {
                        plugins: function () { // post css plugins, can be exported to postcss.config.js
                            return [
                                require('precss'),
                                require('autoprefixer')
                            ];s
                        }
                    }
                },
                'sass-loader', // Compiles Sass to CSS
            ],
        },
    ]
}

module.exports = {
    output: {
        filename: 'app.[contentHash].js'
    },
    module: {
        rules: [
            javascriptRules,
            stylesRules
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        })
    ]
}

