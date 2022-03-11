import {Component} from 'react';
import Taro from '@tarojs/taro';
import {View, Image, Button, Text} from '@tarojs/components';
import {observer} from 'mobx-react';
import { setOpenId, setAvatarUrl, setNickName } from '@common/config';
import Model from './vm';
import styles from './index.less';

@observer
class Index extends Component {

  canIUse = wx.canIUse('button.open-type.getUserInfo')

  componentWillMount() {
    this.vm = new Model();
    this.vm.init();
  }

  onGetUserInfo = () => {
    // 微信授权
    wx.getUserProfile({
      desc: '获取您的昵称、头像信息',
      success: (res) => {
        const { avatarUrl, nickName } = res.userInfo || {};
        Taro.setStorageSync('avatarUrl', avatarUrl);
        Taro.setStorageSync('nickName', nickName);
        this.vm.avatarUrl = avatarUrl;
        this.vm.nickName = nickName;
        setAvatarUrl(avatarUrl);
        setNickName(nickName);
        this.vm.getOpenId().then(() => {
          const openId = this.vm.openId;
          Taro.setStorageSync('openId', openId);
          setOpenId(openId);
        });
      }
    });
  }

  onAbout = () => {
    Taro.redirectTo({
      url: '/pages/about/index'
    })
  }

  render() {
    const { avatarUrl, nickName } = this.vm;
    return (
      <View className={styles.container}>
        <View className={styles.banner}>
          <View className={styles.photoView}>
            {
              avatarUrl ? <Image src={avatarUrl} className={styles.ava} /> : 
              <Button openType="getUserProfile" onClick={this.onGetUserInfo} className={styles.authBtnImg} plain={true}>
                <Text className={`icon iconfont icon-morentouxiang ${styles.defaultPhoto}`} />
              </Button>
            }
          </View>
          {
            nickName ? <View className={styles.nick}>{nickName}</View> : <Button openType="getUserProfile" onClick={this.onGetUserInfo} className={styles.authBtn} plain={true}>登录</Button>
          }
        </View>
        <View className={styles.list}>
          <View className={styles.row} onClick={this.onAbout}>
            <Text
              className={`icon iconfont icon-jifenshuoming ${styles.customerIcon}`}
            />
            <View className={styles.text}>使用说明</View>
          </View>

        </View>
      </View>
    )
  }
}

export default Index
