// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const path = require('path');

// Diretório default
const PUBLIC_DIR = 'public';

module.exports = {
   // Ambiente de desenvolvimento
   devServer: {
      contentBase: path.resolve(__dirname, PUBLIC_DIR),
      port: 3000,
      historyApiFallback: true,
      hot: true,
   },

   // Lugar do arquivo main do projeto
   entry: path.join(__dirname, 'src', 'index.js'),

   // Lugar que vai gerar a build do projeto
   // O Filename[hash] auxilia para limpar o cache do browser pois a cada build ele gera um novo valor
   output: {
      path: path.join(__dirname, 'build'),
      filename: '[name]-[hash].js',
   },

   // Algumas configurações para não travar durante o build do projeto
   performance: {
      hints: false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000,
   },

   // Reduzir o arquivo de build
   // optimization: {
   // minimizer: [new UglifyJsPlugin()],
   // },

   // Minimizar custo de execução e trazer o código empacotado
   devtool: false,

   // Tratamentos de compilação e compactação
   module: {
      rules: [
         {
            test: /\.js$/,
            enforce: 'pre',
            exclude: /node_modules/,
            use: ['babel-loader', 'eslint-loader'],
         },
         {
            test: /\.css$/,
            loaders: ['style-loader', 'css-loader'],
         },
         {
            test: /\.(png|jpe?g|gif|ico)$/i,
            use: [
               {
                  loader: 'file-loader',
               },
            ],
         },
      ],
   },

   // Utilizados para gerar a pasta build do projeto
   // Sempre limpa a pasta e depois recria
   // Responsável pelas variaveis ambientes
   plugins: [
      new CleanWebpackPlugin(),
      new HTMLWebpackPlugin({
         template: path.resolve(__dirname, PUBLIC_DIR, 'index.html'),
         favicon: path.resolve(__dirname, PUBLIC_DIR, 'favicon.ico'),
         meta: path.resolve(__dirname, PUBLIC_DIR, 'meta.json'),
      }),
      new Dotenv(),
   ],

   // Tipo do projeto
   target: 'web',
};
