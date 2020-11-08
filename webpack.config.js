const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CopyPlugin = require('copy-webpack-plugin');


module.exports = {
    entry: './assets/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'demo.js'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'sass-loader',
                ]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new CopyPlugin({
            patterns: [
                { from: 'node_modules/vue-material/dist/vue-material.min.css', to: 'css/vue-material.css' },
                { from: 'node_modules/vue-material/dist/theme/default.css', to: 'css/theme.css' },
                { from: 'node_modules/codemirror/lib/codemirror.css', to: 'css/codemirror.css' },
                { from: 'node_modules/codemirror/theme/material.css', to: 'css/codemirror-theme.css' },
            ],
        }),
    ]
};