import { action, observable } from 'mobx';
import config from '@common/config';

class ListModel {

  @observable list = [];

  @action
  getList = key => {
    wx.cloud.callFunction({
      name: 'quickstartFunctions',
      config: {
        env: config.envId
      },
      data: {
        type: 'selectResource',
        tag_id: key
      }
    }).then((resp) => {
      const { data = [] } = resp.result || {};
      this.list = data.slice();
    })
  }
}
export default ListModel;
