const getOpenId = require('./getOpenId/index');
const selectResource = require('./selectResource/index');
const selectLinks = require('./selectLinks/index');


// 云函数入口函数
exports.main = async (event, context) => {
  switch (event.type) {
    case 'getOpenId':
      return await getOpenId.main(event, context);
    case 'selectResource':
      return await selectResource.main(event, context);
    case 'selectLinks':
      return await selectLinks.main(event, context);
  }
};