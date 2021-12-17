import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const greeting: React.FC<{
  name: string;
}> = ({name}) => {
  return (
    <View style={{
      backgroundColor: '#58A2DA',
      height: 200,
      width: '100%',
      borderBottomLeftRadius: 24,
      borderBottomRightRadius: 24,
    }}>
      <View style={{
        height: 100,
        width: 100,
        backgroundColor: '#fff',
        borderRadius: 50,
        alignSelf: 'center',
        marginVertical: 16
      }} />
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
    fontWeight: '600'
  },
});

export default greeting;
