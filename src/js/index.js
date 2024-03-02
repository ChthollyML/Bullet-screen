export default function(){
$(function () {
  for (var i = 0; i < 10; i++) {
    //评论产生的随机高度
    var pageH = parseInt(Math.random() * 600);
    //创建span元素（弹幕条）
    var newSpan = $("<span></span>");
    //获取用户输入的字符串
    var str = "666666666666666";
    //为新元素赋值
    newSpan.text(str);
    //每次发表后清空输入框
    $("#text").val("");
    //设置弹幕出现位置
    newSpan.css("left", "1400px");
    newSpan.css("top", pageH);
    //设置弹幕颜色
    newSpan.css("color", randomColor());
    //弹幕动画
    newSpan.animate({ left: -500 }, 10000, "linear", function () {
      $(this).remove();
    });
    //弹幕添加
    newSpan.appendTo("#bulletmu");
  }

  $("#btn").click(function () {
    //评论产生的随机高度
    var pageH = parseInt(Math.random() * 300);
    //创建span元素（弹幕条）
    var newSpan = $("<span></span>");
    //获取用户输入的字符串
    var str = $("#text").val();
    //为新元素赋值
    newSpan.text(str);
    //每次发表后清空输入框
    $("#text").val("");
    //设置弹幕出现位置
    newSpan.css("left", "1400px");
    newSpan.css("top", pageH);
    //设置弹幕颜色
    newSpan.css("color", randomColor());
    //弹幕动画
    newSpan.animate({ left: -500 }, 10000, "linear", function () {
      $(this).remove();
    });
    //弹幕添加
    newSpan.appendTo("#bulletmu");
  });

  //定义一个随机生成颜色的方法
  function randomColor() {
    var colorArr = [
      "pink",
      "red",
      "blue",
      "puper",
      "orange",
      "black",
      "DarkMagenta",
      "DoderBlue",
      "DeepSkyBlue",
      "CadetBlue",
      "DarkSlateGray",
      "Yellow",
      "Tomato",
      "	RosyBrown",
    ];
    var color = parseInt(Math.random() * colorArr.length);
    return colorArr[color];
  }
});
}