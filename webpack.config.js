const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const AutoPrefixer = require('autoprefixer');
const MODE = 'development';
const enableSourceMap = (MODE === 'development');

module.exports = {
  // モード値を production に設定すると最適化された状態で、
  // development に設定するとソースマップ有効でJSファイルが出力される
  mode: MODE,
  devtool: 'inline-source-map',
  entry: {
    index: './src/index.js',
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: 'js/[name].bundle.js'
  },

  devServer: {
    port: 8000,
    open: true,
    contentBase: path.resolve(__dirname, 'dist'),
    watchContentBase: true,
    publicPath: '/dist/',
  },

  module: {
    rules: [
      {
        // 対象となる拡張子
        test: /\.js?$/,
        // ローダー名
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
              ]
            }
          }
        ]
      },
      {
        // 対象となる拡張子
        test: /\.scss/,
        // ローダー名
        use: [
          // linkタグに出力する機能
          'style-loader',
          /*
          {
            loader: MiniCssExtractPlugin.loader,
          },
          */
          // CSSをバンドルするための機能
          {
            loader: 'css-loader',
            options: {
              url: false,
              sourceMap: enableSourceMap,

              // 0 => no loaders (default);
              // 1 => postcss-loader,
              // 2 => postcss-loader, sass-loader
              importLoaders: 2,
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: enableSourceMap,
              plugins: [
                AutoPrefixer(
                  {
                    browsers: ['last 2 versions', 'Android >= 4'],
                  }
                ),
              ]
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: enableSourceMap,
            }
          },
        ],
      },
    ]
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/style.css',
    }),
  ]
}