# pandora-visualization-app-scaffold

> 可视化应用脚手架

## 目录结构

- src 目录为自定义可视化图表源码，直接在 index 文件中进行开发即可

- platform 目录为模拟 pandora 应用平台渲染图表相关逻辑，方便进行代码调试

## 使用姿势

### 开发

- 在主目录执行 `yarn install && yarn run start`
- 修改 platform 目录 package.json 文件
  - proxy 字段为当前 pandora 服务 URL
  - account 字段中填写对应服务的用户名和密码
- 在主目录执行 `yarn run platform`

### 打包

- 开发完成后，执行 `yarn run package`', 编译最终代码并打包
- 上传可视化应用`liquidFill.tar.gz`至 Pandora 平台
