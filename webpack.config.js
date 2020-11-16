const path = require('path');
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin');
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
                test: /\.s([ca])ss$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'sass-loader'
                ],
            },
            {
                test: /\.vue/,
                use: "vue-loader"
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.css', '.vue', '.scss', '.sass']
    },
    plugins: [
        new VueLoaderPlugin(),
        new VuetifyLoaderPlugin({
            /**
             * This function will be called for every tag used in each vue component
             * It should return an array, the first element will be inserted into the
             * components array, the second should be a corresponding import
             *
             * originalTag - the tag as it was originally used in the template
             * kebabTag    - the tag normalised to kebab-case
             * camelTag    - the tag normalised to PascalCase
             * path        - a relative path to the current .vue file
             * component   - a parsed representation of the current component
             */
            match (originalTag, { kebabTag, camelTag, path, component }) {
                if (kebabTag.startsWith('core-')) {
                    return [camelTag, `import ${camelTag} from '@/components/core/${camelTag.substring(4)}.vue'`]
                }
            }
        }),
        new CopyPlugin({
            patterns: [
                { from: 'node_modules/vuetify/dist/vuetify.min.css', to: 'css/vuetify.min.css' },
            ]
        }),
    ]
};