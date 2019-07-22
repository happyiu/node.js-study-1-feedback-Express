var express = require('express')
var bodyParser = require('body-parser')
var app = express()

var comments = [
    {name:"阿萨德",message:'jasdhjsdfashjd',datetime: '12-12-12'},
    {name:"人防",message:'jassdfdhjsdfashjd',datetime: '12-12-12'},
    {name:"为",message:'jasdhjasdfshjd',datetime: '12-12-12'},
    {name:"大锅饭",message:'jasdhasdjashjd',datetime: '12-12-12'},
]

// 配置使用 art-template 模板
// 第一个参数：表示当渲染以.art结尾文件的时候，使用 art-template 模板引擎
// express-art-template 专门用来在Express中把art-template整合到Express中
// 这里不需要art-template,但还是必须安装。原因在于 Express-art-template 依赖于 art-template
app.engine('html',require('express-art-template'))


// 配置 body-parser 中间件，专门来解析表单POST请求体
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


app.use('/public/',express.static('./public/'))

// Express 为 response 相应对象提供了一个方法：render
// render 默认不可使用，但配置了模板引擎就可以使用了
// res.render('html模板名',{模板数据})
//     第一个参数不能写路径，默认会去项目中的 view 目录中查找该模板
//     也就是说，Express 有一个约定，开发人员把所有的视图文件都放在view目录中
// 如果想要修改默认的 views 目录，则可以
// app.set('views',render函数的默认路径)
app.get('/',function(req,res){
    res.render('index.html',{
        comments:comments
    })
})

// 当以 GET 请求 /post 的时候，执行指定的处理函数
app.get('/post',function(req,res){
    res.render('post.html')
})

// 当以 POST 请求 /post 的时候，执行指定的处理函数
app.post('/post',function(req,res){
    // 获取 post 请求体参数
    var commit = req.body
    commit.datetime = Date()
    comments.unshift(commit)
    res.redirect('/')
})


// req.query 只能拿GET参数
// app.get('/pinglun',function(req,res){
//     var commit = req.query
//     commit.datetime = Date()
//     comments.unshift(commit)
//     // 重定向
//     res.redirect('/')
// })



app.listen(3000,function(){
    console.log("running...请打开 http://127.0.0.1:3000/ 查看")
})