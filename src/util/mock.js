import Mock from 'mockjs';

Mock.mock('/api/default', {
  name: 128,
  sex: 5,
  text: '这是一个前端模拟接口数据'
});
Mock.mock('/api/moni/betting', {
  lottery: '123',//这是上一期数据
  lottery_new:'456',//这是新一期数据
});
