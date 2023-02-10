
## 脚手架的基本原理
我们先来看一个问题：

为什么你安装 的是 @vue/cli 但是使用起来的指令是 vue 呢？

```powershell
👉 npm install -g @vue/cli
```

全局安装这个过程是这样的：`npm`会将`@vue/cli`安装到全局`node_modules`中，并且`npm`会解析`@vue/cli`的`package.json`中的`bin`字段
```json
"bin": {
  "vue": "bin/vue.js"
}
```
就会将对应的文件，也就是`bin/vue.js`的文件软链接到全局的一个统一目录下，而文件名就是这里指定的`vue`。这样当我们执行`vue`命令时，其实就是执行全局`node_modules/@vue/cli/bin/vue.js`。

可以通过`npm bin -g`查找到这个全局统一的目录位置。也可以使用 `which vue` 可以看到 vue 指令的位置，再通过`ll vue指令的位置` 就可以得到 vue 真正的执行文件，我们发现这与我们上面描述的一致

```powershell
👉 which vue
# /usr/local/bin/vue


👉 ll /usr/local/bin/vue                                                              
# lrwxr-xr-x  1 jerry  admin    39B  2 10 15:11 /usr/local/bin/vue -> ../lib/node_modules/@vue/cli/bin/vue.js
```


# 开发调试

## 单包调试
本地实时调试，运行`npm link`后，就可以使用脚手架的命令了

tips: 使用`npm unlink` 可以取消

## 多包调试
1. 在lib的目录下执行`npm link`
2. 在主包目录下执行`npm link libName`，就会发现目录下多处`node_modules`文件，里面是lib目录结构，你会发现lib这个文件夹是一个软链，它指向真实的lib文件夹
3. 在主包目录的`package.json`中添加  "dependencies": {
    "jerry-first-cli-lib": "^1.0.0"
  }
4. 通过`require`使用即可


tips: 1. 在写库的时候需要指定库的`package.json`中的`main`属性的输出路径; 2. 通过在主包目的下执行`npm unlink libName`就可以取消 link 了

# 总结 link 与 unlink
1. `npm link`: 将当前项目链接到`node`全局`node_modules`中作为一个库文件，并解析`bin`配置创建可执行文件
2. `npm link libName`: 将当前项目中的`node_modules`下指定的库文件链接到`node`全局`node_modules`下的库文件
3. `npm unlink`: 将当前项目从`node`全局`node_modules`中移除
4. `npm unlink libName`: 将当前项目中的库文件依赖移除


# 命令注册和参数解析

通过 node 内置库`process`获取到命令行输入的参数
```js
const process = require('node:process')

console.log(process.argv)
```

执行 cli 命令
打印的结果如下
```js
  [
    node,
    cli,
    ...params
  ]
```

第一个是可执行命令node，第二个就是我们写的脚手架，后续的就是命令行传入的参数



# 发布

```bash
npm publish
```

## 更新版本
`npm`更新版本指令说明表
| 选项 | 描述 | 例子 | 说明 | 
| ---- | ---- | ---- | ---- | 
| major | 重大更新版本 | npm version major | 0.2.0 =》1.0.0 | 
| minor | 主要更新版本 | npm version minor | 0.2.0 =》0.3.0 |
| patch | 补丁更新版本 | npm version patch | 0.2.0 =》0.2.1 |
| premajor | 重大更新预发布版本 | npm version premajor | 0.2.0 =》1.0.0-0 |
| preminor | 主要更新预发布版本 | npm version preminor | 0.2.0 =》0.3.0-0 |
| prepatch | 补丁更新预发布版本 | npm version prepatch | 0.2.0 =》0.2.1-0 |
| prerelease | 预发布版本 | npm version prerelease | 当前版本不是预发布版本的会出错 |
| from-git | 拿取git的tag作为版本号设置至package.json内 | npm version from-git | git的tag标签没有设置的情况下，会抛出错误 |