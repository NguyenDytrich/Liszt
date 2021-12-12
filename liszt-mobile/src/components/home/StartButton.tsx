import {NavigationContainer, useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Button, StyleSheet} from 'react-native';

const startButton: React.FC<{}> = ({}) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        backgroundColor: '#58a2da',
        marginHorizontal: 16,
        borderRadius: 16,
      }}>
      <Button
        title="Quiz Me!"
        color="#fff"
        onPress={() => navigation.navigate('Quiz')}></Button>
    </View>
  );
};

export default startButton;
