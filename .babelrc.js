module.exports = {
  presets: [
    '@babel/preset-env',
    '@babel/preset-react',
    '@babel/preset-typescript'
  ],
  plugins: [
    [
      // 运行时注入代码，减少体积
      '@babel/plugin-transform-runtime',
      {
        corejs: {
          version: 3,
          proposals: true
        }
      }
    ]
  ]
};
