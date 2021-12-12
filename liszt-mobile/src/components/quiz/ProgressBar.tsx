import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Colors from '../../styles/Colors';

const progressBar: React.FC<{
  currentQuestion: number;
  totalQuestions: number;
}> = ({currentQuestion, totalQuestions}) => {
  return (
    <View
      style={{
        ...styles.container,
      }}>
      <View style={styles.barContainer}>
        <View
          style={{
            ...styles.progressBar,
            width: `${(currentQuestion / totalQuestions) * 100}%`,
          }}
        />
      </View>
      <Text style={styles.barLabel}>
        {currentQuestion}/{totalQuestions}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 10,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 50,
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 24,

    shadowColor: '#000',
    shadowOffset: {height: 1, width: 0},
    shadowOpacity: 0.15,
    shadowRadius: 5,
  },
  barContainer: {
    backgroundColor: '#E9EBED',
    height: '80%',
    borderRadius: 50,
    marginTop: 2,
    width: '85%',
  },
  barLabel: {
    textAlign: 'right',
    width: '15%',
    fontWeight: '600',
    color: Colors.black
  },
  progressBar: {
    height: 12,
    marginTop: 1,
    marginLeft: 1,
    borderRadius: 50,
    backgroundColor: Colors.blue
  },
});

export default progressBar;
