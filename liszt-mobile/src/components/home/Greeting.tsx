import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import Colors from '../../styles/Colors';

const greeting: React.FC<{
  name: string;
}> = ({name}) => {
  const navigation = useNavigation();
  return (
    <View style={{height: 80}}>
      <View style={styles.topBar}>
        <View style={{}}>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <FAIcon name="user-circle-o" size={24} color={Colors.black} />
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.greeting}>Hi, {name}!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  greeting: {
    paddingHorizontal: 24,
    fontSize: 24,
    color: Colors.black,
    fontWeight: '600',
  },
  topBar: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    paddingTop: 16,
    paddingHorizontal: 24,
  },
});

export default greeting;
