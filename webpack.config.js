const path = require('path');
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
// const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './assets/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'demo.js'
    },
    module: {
        rules: [
            {
                test: /\.vue/,
                use: "vue-loader"
            },
            {
                test: /\.css|sass|scss$/,
                use: ['vue-style-loader', 'css-loader', 'sass-loader'],
            },
        ]
    },
    resolve: {
        extensions: ['.js', '.vue']
    },
    plugins: [
        new VueLoaderPlugin(),
        new VuetifyLoaderPlugin({
            match (originalTag, { kebabTag, camelTag }) {
                if (kebabTag.startsWith('core-')) {
                    return [camelTag, `import ${camelTag} from '@/components/core/${camelTag.substring(4)}.vue'`]
                }
            }
        }),
        // new CopyPlugin({
        //     patterns: [
        //         { from: 'node_modules/vuetify/dist/vuetify.min.css', to: 'css/vuetify.min.css' },
        //     ]
        // }),
    ]
};