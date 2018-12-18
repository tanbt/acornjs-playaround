module.exports = {
    entry: {
        app: './index.js',
    },
    output: {
        filename: "[name].min.js"
    },
    devtool: "source-map",
    mode: 'development',
    devServer: {
        port: 3000,
        contentBase: '.',
        inline: true
    }
}