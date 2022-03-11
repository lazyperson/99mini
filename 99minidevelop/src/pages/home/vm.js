import { action, observable } from 'mobx';
import config from '@common/config';

class HomeModel {

  @observable haveGetOpenId = false;
  @observable openid = null;
  @observable list = [];

  @action
  getList = () => {
    wx.cloud.callFunction({
      name: 'quickstartFunctions',
      config: {
        env: config.envId
      },
      data: {
        type: 'selectResource'
      }
    }).then((resp) => {
      const { data = [] } = resp.result || {};
      this.list = data;
    })
  }

  @action
  init = () => {
    wx.cloud.callFunction({
      name: 'quickstartFunctions',
      config: {
        env: config.envId
      },
      data: {
        type: 'getOpenId'
      }
    }).then((resp) => {
      const { openid } = resp.result || {};
      this.haveGetOpenId = true;
      this.openid = openid;
    })
  }
}
export default HomeModel;
