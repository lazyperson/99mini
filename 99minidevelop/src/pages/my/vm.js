import { action, observable } from 'mobx';
import Taro from '@tarojs/taro';
import config, { setOpenId, setAvatarUrl, setNickName } from '@common/config';

class HomeModel {
  @observable openId = null;
  @observable avatarUrl = '';
  @observable nickName = '';

  @action
  init = () => {
    const nickName = Taro.getStorageSync('nickName');
    if (nickName) {
      this.nickName = nickName;
      setNickName(nickName);
    }

    const openId = Taro.getStorageSync('openId');
    if (openId) {
      this.openId = openId;
      setOpenId(openId);
    }

    const avatarUrl = Taro.getStorageSync('avatarUrl');
    if (avatarUrl) {
      this.avatarUrl = avatarUrl;
      setAvatarUrl(avatarUrl);
    }

  }

  @action
  getOpenId = () => {
    // 通过云函数层获取openid
    return wx.cloud.callFunction({
      name: 'quickstartFunctions',
      config: {
        env: config.envId
      },
      data: {
        type: 'getOpenId'
      }
    }).then((resp) => {
      const { openid } = resp.result || {};
      this.openId = openid;
    })
  }
}
export default HomeModel;
