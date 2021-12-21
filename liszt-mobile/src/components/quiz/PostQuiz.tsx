import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {QuizMetadata} from './types';

const postQuiz: React.FC<{
  metadata: QuizMetadata;
  onReset: () => void;
}> = ({metadata, onReset}) => {
  const navigation = useNavigation();

  return (
      <View style={{padding: 24}}>
        <Text style={{fontWeight: 'bold', fontSize: 24}}>Finished</Text>
        <Text>Correct Questions: {metadata.totalCorrect}</Text>
        <Text>Total Questions: {metadata.totalQuestions}</Text>
        <Text>Accuracy: {metadata.accuracy * 100}%</Text>
        <Text>Average response time: {metadata.averageDwellTime}s</Text>
        <Button title="Go again" onPress={() => onReset()} />
        <Button title="Home" onPress={() => navigation.navigate('Home')} />
      </View>
  );
};

export default postQuiz;
