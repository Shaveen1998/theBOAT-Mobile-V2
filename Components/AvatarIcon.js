import * as React from 'react';
import { Avatar  } from 'react-native-paper';
import AvatarImage from '../assets/profileAvatar.jpg'
import { View , StyleSheet} from 'react-native';

const AvatarIcon = () => (
    <View style={styles.container}>
        <Avatar.Image  size={180} source={AvatarImage} />
    </View>
  
);
export default AvatarIcon

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
  