import {Component} from 'react';
import {View, Image} from '@tarojs/components';
import styles from './index.less';

import about from '../../assets/images/about.jpg';

class About extends Component {

  render() {

    return (
      <View className={styles.container}>
        <View className={styles.txt}>本站资源仅用于学习交流，内容来源与互联网，如若相关资源侵犯了您的版权，请联系我们及时删除。</View>
        <Image src={about} className={styles.img} />
      </View>
    )
  }
}

export default About
