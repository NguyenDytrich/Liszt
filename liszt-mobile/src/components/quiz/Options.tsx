import React from 'react';
import {TouchableHighlight, View, Text, StyleSheet} from 'react-native';

type Option = {
  displayText: string;
  value: number;
};

const options: React.FC<{
  options: Option[];
}> = ({options}) => {
  const opts = options.map(d => option({opt: d}));
  return (
    <View
      style={{
        marginHorizontal: 24,
      }}>
      {opts}
    </View>
  );
};

const option: React.FC<{
  opt: Option;
}> = ({opt}) => {
  return (
    <View style={styles.answerOption} key={opt.value}>
      <TouchableHighlight
        underlayColor="#6e7a87"
        style={{
          height: '100%',
          borderRadius: 7,
        }}
        onPress={() => {
          alert('Tapped');
        }}>
        <Text style={styles.answerText}>{opt.displayText}</Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  answerOption: {
    borderColor: '#6e7a87',
    borderWidth: 1,
    marginVertical: 8,
    height: 50,
    borderRadius: 8,
    // shadowColor: '#000',
    // shadowOffset: {height: 5, width: 0},
    // shadowOpacity: 0.1,
    // shadowRadius: 2,
  },
  answerText: {
    textAlign: 'center',
    fontSize: 40,
  },
});

export default options;
