# 使用Express快速搭建留言板思路
- 先安装 Express 模块，然后引入
    ```js
    var express = require('express')
    ```
- 创建服务端
    ```js
    var app = express()
    ```

- 接下来就可以直接处理网页请求了
- 因为首页涉及到了art-template模板渲染，这个第三方包有个专门用于Express框架
- 安装 express-art-template 和 art-template（前一个依赖art-template）
- > npm i art-template -s
- > npm i express-art-template -s
- 然后需要配置 express-art-template 
    ```js
    app.engine('html',require('express-art-template'))
    ```
- 配置完成后，就可以使用模板来渲染首页，render是Express提供的
    ```js
    var comments = [
        {name:"阿萨德",message:'jasdhjsdfashjd',datetime: '12-12-12'},
        {name:"人防",message:'jassdfdhjsdfashjd',datetime: '12-12-12'},
        {name:"为",message:'jasdhjasdfshjd',datetime: '12-12-12'},
        {name:"大锅饭",message:'jasdhasdjashjd',datetime: '12-12-12'},
    ]
    app.get('/',function(req,res){
        res.render('index.html',{
            comments:coments
        })
    })
    ```
- 注意：使用Express框架，render时，它默认都放在 views 目录下，但也是可以修改的
    ```js
    app.set('views',render函数的默认路径)
    ```

- 首页渲染完成后，点击留言，跳转/post页面，然后处理请求
    ```js
    app.get('/post',function(req,res){
        res.render('post.html')
    })
    ```

- 在 /post 页面中完成留言，点击发表时，在/post路径以POST方法提交表单
    ```html
    <form action="/post" method="post">
    </form>
    ```
- 注意：Express中没有获取POST提交的数据，需要一个中间件
- 中间件 body-parser 
- 先安装  > npm i body-parser -s
- 再引入包
    ```js
    var bodyParser = require('body-parser')
    ```
- 配置中间件
    ```js
    // 配置 body-parser 中间件，专门来解析表单POST请求体
    app.use(bodyParser.urlencoded({ extended: false }))
    // parse application/json
    app.use(bodyParser.json())
    ```
- 然后提交表单后处理数据，重定向跳转到首页
    - 注意：Express中提供了重定向的方法： res.redirect('/')
    - 注意：Express中提供了获取GET的方法： res.query
    ```js
    app.post('/post',function(req,res){
        var commit = req.body
        commit.datetime = Date()
        comments.unshift(commit)
        res.redirect('/')
    })
    ```

- 最后
    ```js
    app.listen(3000,function(){
        console.log("running...请打开 http://127.0.0.1:3000/ 查看")
    })
    ```





# 在 Express 中配置使用 art-template 模板引擎

- 安装
> npm i art-template -s
> npm i express-art-template -s

- 配置
```js
// 配置使用 art-template 模板
// 第一个参数：表示当渲染以.art(或者其他后缀结尾)结尾文件的时候，使用 art-template 模板引擎
// express-art-template 专门用来在Express中把art-template整合到Express中
// 这里不需要art-template,但还是必须安装。原因在于 Express-art-template 依赖于 art-template
app.engine('html',require('express-art-template'))
```

- 使用
```js
var comments = [
    {name:"阿萨德",message:'jasdhjsdfashjd',datetime: '12-12-12'},
    {name:"人防",message:'jassdfdhjsdfashjd',datetime: '12-12-12'},
    {name:"为",message:'jasdhjasdfshjd',datetime: '12-12-12'},
    {name:"大锅饭",message:'jasdhasdjashjd',datetime: '12-12-12'},
]

app.get('/',function(req,res){
    res.render('index.html',{
        comments:comments
    })
})
```

- 修改默认的 views 目录
```js
app.set('views',目录路径)
```

## 在Express中获取表单GET请求数据
```js
req.query
```

## 在Express中获取表单POST请求数据
在Express中没有内置获取表单POST请求的API，这里我们需要使用一个第三方包
- body-parser 安装
    > npm i body-parser -s
- 配置
```js
// 引包
var bodyParser = require('body-parser')

// 配置 body-parser，只要加入这个配置，在req对象上会多出个属性，也就是可以通过 req.body 来获取表单POST请求体数据
```
