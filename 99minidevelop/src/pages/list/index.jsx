import Taro from '@tarojs/taro';
import { Component } from 'react';
import { View, Image } from '@tarojs/components';
import { observer } from 'mobx-react';
import { getAvatarUrl, getNickName } from '@common/config';
import Model from './vm';
import styles from './index.less';

// 暂时先用本地资源，原则上除tabbar的图片外最好都放在CDN上，可以减少小程序体积并且加速图片展示
import fe from '../../assets/images/fe.png';
import ts from '../../assets/images/ts.png';
import python from '../../assets/images/python.png';
import node from '../../assets/images/node_js.png';
import nginx from '../../assets/images/nginx_.png';
import ps from '../../assets/images/ps.png';
import docker from '../../assets/images/docker.png';
import other from '../../assets/images/other.png';


@observer
class Index extends Component {
  componentWillMount() {
    this.vm = new Model();
  }

  init = () => {
    const type = Taro.getStorageSync('TYPE_CLICK');
    if (typeof type === 'string') {
      Taro.removeStorageSync('TYPE_CLICK');
      this.vm.getList(type);
      return;
    }
    this.vm.getList();
  }

  componentDidShow() {
    this.init();
  }

  onClassGo = type => {
    this.vm.getList(type);
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
    const { list = [] } = this.vm;
    return (
      <View className={styles.container}>
        <View className={styles.classes}>
          <Image src={fe} onClick={this.onClassGo.bind(this, '1')} className={styles.class} />
          <Image src={node} onClick={this.onClassGo.bind(this, '2')} className={styles.class} />
          <Image src={ts} onClick={this.onClassGo.bind(this, '3')} className={styles.class} />
          <Image src={python} onClick={this.onClassGo.bind(this, '4')} className={styles.class} />
          <Image src={ps} onClick={this.onClassGo.bind(this, '5')} className={styles.class} />
          <Image src={docker} onClick={this.onClassGo.bind(this, '6')} className={styles.class} />
          <Image src={nginx} onClick={this.onClassGo.bind(this, '7')} className={styles.class} />
          <Image src={other} onClick={this.onClassGo.bind(this, '8')} className={styles.class} />
        </View>
        <View className={styles.list}>
          {
            list.map(item => <View onClick={() => this.onDetail(item['_id'])} className={styles.content}>
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

export default Index
