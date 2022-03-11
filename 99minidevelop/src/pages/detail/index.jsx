import Taro from '@tarojs/taro'
import {Component} from 'react';
import {View, Input, Button, Textarea} from '@tarojs/components';
import {observer} from 'mobx-react';
import Model from './vm';
import styles from './index.less';


@observer
class Detail extends Component {

  componentWillMount() {
    const {id} = Taro.getCurrentInstance().router.params || {};
    this.vm = new Model();
    this.vm.getDetail(id);
  }

  onCopy = str => {
    Taro.setClipboardData({
      data: str,
      success: function (res) {
        Taro.getClipboardData({
          success: function (res) {
            console.log(res.data)
          }
        })
      }
    })
  }

  render() {
    const {result} = this.vm;
    const {link_url = '', code = ''} = result;
    return (
      <View className={styles.container}>
        <View className={styles.content}>
          <View className={styles.row}>
            <Textarea className={`${styles.txt} ${styles.t2}`} value={link_url} />
            <Button className={styles.btn}  onClick={this.onCopy.bind(this, link_url)}>复制</Button>
          </View>
          <View className={styles.row}>
            <View className={`${styles.txt} ${styles.t3}`} >提取码：{code}</View>
            <Button className={styles.btn} type="primary" onClick={this.onCopy.bind(this, code)}>复制</Button>
          </View>
        </View>
      </View>
    )
  }
}

export default Detail
