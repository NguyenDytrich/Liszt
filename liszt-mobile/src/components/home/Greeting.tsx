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
    <View
      style={{
        backgroundColor: '#58A2DA',
        height: 200,
        width: '100%',
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
      }}>
      <View
        style={{
          height: 100,
          width: 100,
          backgroundColor: '#fff',
          borderRadius: 50,
          alignSelf: 'center',
          marginVertical: 16,
        }}
      />
      <View style={{position: 'absolute', top: 8, right: 8}}>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <FAIcon name="user-circle-o" size={30} color={Colors.white} />
        </TouchableOpacity>
      </View>
      <View style={{position: 'absolute', top: 8, left: 8}}>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <FAIcon name="cog" size={30} color={Colors.white} />
        </TouchableOpacity>
      </View>

      <Text style={styles.greeting}>Hi, {name}!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  greeting: {
    paddingHorizontal: 24,
    fontSize: 24,
    textAlign: 'center',
    color: '#fff',
    fontWeight: '600',
  },
});

export default greeting;
