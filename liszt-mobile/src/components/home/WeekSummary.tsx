import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const weekSummary: React.FC<{
  accuracy: number;
}> = ({accuracy}) => {
  return (
    <View
      style={{
        backgroundColor: '#FFF',
        padding: 8,
      }}>
      <View style={{marginTop: 16}}>
        <Text>This week...</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          paddingTop: 10,
        }}>
        <View style={layout.statBox}>
          <Text
            style={{
              color: '#66A182',
              textAlign: 'right',
            }}>
            +{accuracy}%
          </Text>
          <Text>18/30</Text>
          <Text>Correct questions!</Text>
        </View>
        <View style={layout.statBox}>
          <Text>RIGHT</Text>
        </View>
      </View>
    </View>
  );
};

const layout = StyleSheet.create({
  statBox: {
    width: '45%',
    padding: 8,
    borderRadius: 9,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowRadius: 4,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.2,
  },
});

export default weekSummary;
