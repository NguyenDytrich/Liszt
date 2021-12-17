/**
 * Component to display categories as buttons to start a new quiz. Currently not needed.
 */


import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const categories: React.FC<{
  names: string[];
}> = ({names}) => {
  const categories = names.map(n => category({name: n}));
  return (
    <View style={{
        marginHorizontal: 8,
        marginTop: 16,
    }}>
      <View>
        <Text>Categories</Text>
      </View>
      <View>{categories}</View>
    </View>
  );
};

const category: React.FC<{
  name: string;
}> = ({name}) => {
  return (
    <View key={name} style={styles.categoryContainer}>
      <Text>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  categoryContainer: {
    backgroundColor: '#A1C0CE',
    marginHorizontal: 8,
    marginVertical: 8,
    padding: 16,
    borderRadius: 16,
  },
});

export default categories;
