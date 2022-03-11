import Taro from '@tarojs/taro';
import { Component } from 'react';
import { View, Image } from '@tarojs/components';
import { observer } from 'mobx-react';
import { getAvatarUrl, getNickName } from '@common/config';
import Model from './vm';
import styles from './index.less';

// 暂时先用本地资源，原则上除tabbar的图片外最好都放在CDN上，可以减少小程序体积并且加速图片展示
import bannerImg from '../../assets/images/banner.jpg';
import fe from '../../assets/images/fe.png';
import all from '../../assets/images/all.png';
import ts from '../../assets/images/ts.png';
import python from '../../assets/images/python.png';
import node from '../../assets/images/node_js.png';

@observer
class Home extends Component {

  componentWillMount () {
    this.vm = new Model();
    this.vm.getList();
  }

  onClassGo = type => {
    if (type) {
      Taro.setStorageSync('TYPE_CLICK', type);
    }
    Taro.switchTab({
      url: '/pages/list/index',
    })
  }

  onDetail = id => {
    if (getAvatarUrl() && getNickName()) {
      Taro.redirectTo({
        url: '/pages/detail/index?id=' + id
      })
    } else {
      wx.showToast({
        title: '请您登录！',
        icon: 'error',
        duration: 1000
      });

      setTimeout(() => {
        wx.hideToast();
        Taro.switchTab({
          url: '/pages/my/index',
        })
      }, 1000);
    }
  }

  render () {
    const { list } = this.vm;
    return (
      <View className={styles.container}>
        <Image className={styles.banner} src={bannerImg} />
        <View className={styles.classes}>
          <Image src={fe} onClick={this.onClassGo.bind(this, '1')} className={styles.class} />
          <Image src={node} onClick={this.onClassGo.bind(this, '2')} className={styles.class} />
          <Image src={ts} onClick={this.onClassGo.bind(this, '3')} className={styles.class} />
          <Image src={python} onClick={this.onClassGo.bind(this, '4')} className={styles.class} />
          <Image src={all} onClick={this.onClassGo.bind(this, null)} className={styles.class} />
        </View>
        <View className={styles.hot}>
          推荐
        </View>
        <View className={styles.list}>
          {
            list.map(item => <View onClick={this.onDetail.bind(this,item._id)} className={styles.content}>
              <Image className={styles.img} src={item.image} />
              <View className={styles.desc}>
                <View className={styles.title}>{item.name}</View>
                <View className={styles.power}>{item.level === '0' ? '免费' : ''}</View>
                <View className={styles.date}>{item.create}</View>
              </View>
            </View>)
          }
        </View>
      </View>
    )
  }
}

export default Home
