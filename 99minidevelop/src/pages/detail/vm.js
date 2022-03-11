import { action, observable } from 'mobx';
import config from '@common/config';

class HomeModel {

  @observable result = {};

  @action
  getDetail = id => {
    if (id) {
      wx.cloud.callFunction({
        name: 'quickstartFunctions',
        config: {
          env: config.envId
        },
        data: {
          id: id,
          type: 'selectLinks'
        }
      }).then((resp) => {
        const {data = []} = resp.result || {};
        if (data.length) {
          this.result = data[0];
        }

      })
    }
  }
}
export default HomeModel;
