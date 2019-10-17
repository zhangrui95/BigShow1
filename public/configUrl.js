/*!
* configUrl.js
* author:ghn
* date: 2019/8/20
*/

const ip = '192.168.41.249';

window.warnInfo = {
  EV_HELP: '人身自救告警',
  EV_ESCAPE: '逃离告警',
  EV_OUT_OF_PROCESS: '违反流程告警',
  EV_EMERGENCY_BUTTON: '应急按钮告警',
  EV_UnsupervisedInWaitingRoomRemind: '无人看管预警',
  EV_UnsupervisedInInquiryRoom: '无人看管',
  EV_SingleInquiryRemind: '单人询讯问预警',
  EV_SingleInquiryAlert: '单人询讯问告警',
  EV_FallDown: '倒地告警',
  EV_Climbing: '攀爬超高告警',
  EV_GATHER: '人员聚集告警',
  EV_UNISEX: '男女混关告警',
  EV_AuxiliaryPoliceInvolveInquiry: '辅警参与询讯问',
  EV_WaitingRoomOverloadRemind: '超负荷关押预警',
  EV_WaitingRoomOverloadAlert: '超负荷关押告警',
  EV_NotIsolated: '未安全隔离',
  EV_Collusion: '串供告警',
  EV_CheckTimeTooShort: '人身安全检查时间过短',
  EV_HeartRateException: '心率异常告警',
  EV_RetentionRemind: '滞留预警',
  EV_RetentionAlert: '滞留告警',
  EV_ExitWithBracelet: '携带手环离区告警',
  EV_UnsupervisedInWaitingRoomAlert: '无人看管告警',
  ET_ViolentMotion: '剧烈运动告警',
  EV_HAND_BROADCAST: '请将双手放在手部感应器上',
  EV_UnsupervisedInWaitingRoomReset: '打卡成功',
};
// 控制背景色透明度
window.opacity = 0.6;

window.configUrl = {
  socket_server: 'http://192.168.3.245:8720',
  serverUrl: `http://${ip}:7500`, // 接口请求地址
  // serverUrl: `http://192.168.3.89:7500`, // 接口请求地址
  // 安全中心地址
  securityCenterUrl: `http://${ip}:8100`,
  // 运维中心
  maintainCenterUrl: `http://${ip}:7400`,
  mqttUrl: `ws://${ip}:8083/mqtt`, // MQTT地址
  localhostMqttUrl: 'ws://localhost:9001/mqtt',
  collectionRoom: '518011004', // 集中间房间id
  singleRoom: '518011008', // 侯问室4单间房间id
  timeStr: 60000,
  token:
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI4ZDYwZDM3Yy0xMTRlLTQ0NGMtYTA3NS1iYjE2MDRlMDYyYjUiLCJpYXQiOjE1NjY1MjkzMjYsInN1YiI6IjYwMiIsImlzcyI6IlNlY3VyaXR5IENlbnRlciIsImRlcGFydG1lbnQiOnsiaWQiOjEwMTEsInBhcmVudElkIjoxNSwiZGVwdGgiOjIsIm5hbWUiOiLniaHkuLnmsZ_luILlhazlronlsYAiLCJjb2RlIjoiMjMxMDAwMDAwMDAwIn0sImdvdmVybm1lbnQiOlt7ImlkIjoxMDExLCJwYXJlbnRJZCI6MTUsImRlcHRoIjoyLCJuYW1lIjoi54mh5Li55rGf5biC5YWs5a6J5bGAIiwiY29kZSI6IjIzMTAwMDAwMDAwMCJ9XSwiaWQiOjYwMiwiaWRDYXJkIjoiMTIzNTY1MTk5ODEyMjUyMjEwIiwicGNhcmQiOiI1MjA1MjAiLCJuYW1lIjoi5Li5fueuoeeQhuWRmCIsImpvYiI6W3siY29kZSI6IjIwMDAwMiIsIm5hbWUiOiLnrqHnkIblkZgifV0sImNvbnRhY3QiOiIxNTIyMjIzMzMzMCIsImlzQWRtaW4iOjAsImV4cCI6MTU2ODYwMjkyNn0.tmMrz1G1rQsUzt3pWgkRxzjTzBcB-CgFg8EtRczhYws',
};
