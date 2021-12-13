import {NavigationContainer, useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Button, StyleSheet} from 'react-native';

const startButton: React.FC<{
  text: string;
  quiz?: any;
}> = ({text, quiz}) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        backgroundColor: '#58a2da',
        marginHorizontal: 16,
        borderRadius: 16,
        marginVertical: 8,
      }}>
      <Button
        title={text}
        color="#fff"
        onPress={() => navigation.navigate('Quiz', quiz)}
      />
    </View>
  );
};

export default startButton;
