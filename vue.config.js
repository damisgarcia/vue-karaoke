module.exports = {
  chainWebpack: config => {
    config.module.rule('raw')
      .test(/\.str$/)
      .use('raw-loader')
      .loader('raw-loader')
      .end()            
  }
}