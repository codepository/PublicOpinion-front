# publicopinion-front

public_opinion {
  <!-- 作者 -->
  author string
  <!-- 作者id -->
  uid int
  <!-- 创建时间 -->
  createtime string
  <!-- 舆情发生时间 -->
  date string
  <!-- 标题 -->
  title string
  <!-- 标签 -->
  tag string
  <!-- 报道篇数 -->
  num int
  <!-- 关键字，逗号隔开 -->
  keywords string
  <!-- 上报内容 -->
  content string
}

作者和生成时间的字段， 先用系统的信息（登录用户，系统时间）填入  可以进行修改
