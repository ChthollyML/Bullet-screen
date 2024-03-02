var express = require('express'); 
var path = require('path');
var fs = require('fs');
var bp = require('body-parser');
const { data } = require('jquery');
var app = express();
app.use(bp.urlencoded({ extended: false }));
app.use(bp.json())
//跨域
app.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); 
    res.header('Access-Control-Allow-Origin', '*'); 
    res.header('Access-Control-Allow-Metheds', 'PUT, POST, GET, DELETE, OPTIONS'); 
    res.header('X-Powered-By', 'nodejs'); 
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
});
app.get('',(req,res)=>{
    var filepath = 'C:\\Download\\前端\\Bullet-screen\\src\\msg\\danmu.json'; //路径
    fs.readFile(filepath, 'utf-8', function(err,jsondata) {
        if (err) {
            res.send('文件读取失败');
        } else { 
            res.send(jsondata)
            console.log(jsondata)
         }
    
})
})
//创建post接口
app.post('', (req, res) => {
    var filepath = 'C:\\Download\\前端\\Bullet-screen\\src\\msg\\danmu.json'; //路径
    fs.readFile(filepath, 'utf-8', function(err,jsondata) {
        if (err) {
            res.send('文件读取失败');
        } else {  
                console.log("保存");
                const data =req.body;
                console.log(data)
                let array = JSON.parse(jsondata)
                array.push(data)
                const newdata = JSON.stringify(array)
                fs.writeFile('C:\\Download\\前端\\Bullet-screen\\src\\msg\\danmu.json',newdata,function(err){
                    if(err){
                        console.error(err);
                    }
                    console.log('存档成功');
                })
        }
    });     
});
var host = 'localhost'; //ip
var port = 8888; //端口
app.listen(port, host, () => {
    console.log(`http://localhost:8888`);
});
 