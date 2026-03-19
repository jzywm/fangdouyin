说明：使用 `babel-plugin-component` 为 `element-ui` 配置按需引入

1. 已添加配置文件 `babel.config.js`：

- 位于项目根目录，配置如下：

```
module.exports = {
  plugins: [
    [
      'component',
      {
        libraryName: 'element-ui',
        styleLibraryName: 'theme-chalk'
      }
    ]
  ]
}
```

2. 在代码中按需引入示例（替换原来的整库引入）：

- 原来（整库引入，会打包全部）：

```
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
app.use(ElementUI)
```

- 按需引入（示例，仅引入 Button 和 Select）：

```
import { Button, Select } from 'element-ui'
// 不需要手动引入样式，babel-plugin-component 会自动按组件引入对应样式（已在 babel.config.js 配置）
app.component(Button.name, Button)
app.component(Select.name, Select)
```

注意：
- `babel-plugin-component` 会把 `import { Button } from 'element-ui'` 转换为单文件引入并自动引入样式（依赖于 `styleLibraryName` 配置）。
- 如果你的项目使用的是 Vue 3，请确认使用的 Element 版本（`element-ui` 是 Vue 2 的库，Vue 3 推荐使用 `element-plus`）。按需方案、插件与 API 在两者之间不完全相同。

如果你希望我直接把 `src/main.ts` 改为按需引入并替换为需要的组件，我可以帮你自动修改并运行一次构建/启动检查。
