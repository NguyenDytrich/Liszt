import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Button, Dimensions, StyleSheet, Text, View} from 'react-native';
import {ProgressChart} from 'react-native-chart-kit';
import {QuizMetadata} from './types';

const postQuiz: React.FC<{
  metadata: QuizMetadata;
  onReset: () => void;
}> = ({metadata, onReset}) => {
  const navigation = useNavigation();

  return (
    <View style={{padding: 24}}>
      <Text style={{fontWeight: 'bold', fontSize: 24, textAlign: 'center'}}>Finished</Text>
      <View style={{}}>
        <ProgressChart
          data={{labels: ['Accuracy'], data: [metadata.accuracy]}}
          width={Dimensions.get('window').width - 24 * 2}
          height={200}
          strokeWidth={16}
          radius={52}
          hideLegend={true}
          chartConfig={{
            backgroundGradientFromOpacity: 0,
            backgroundGradientToOpacity: 0,
            color: (opacity = 0) => `rgba(98, 195, 112, ${opacity})`,
            strokeWidth: 2, // optional, default 3
          }}
        />
        <Text
          style={{
            top: -123,
            left: 0,
            fontSize: 24,
            textAlign: 'center',
          }}>
          {metadata.accuracy * 100}
        </Text>
        <Text style={{top: -120, left: 2, textAlign: 'center'}}>Accuracy</Text>
      </View>

      <View style={{top: -50}}>
        <Text>Correct Questions: {metadata.totalCorrect}</Text>
        <Text>Total Questions: {metadata.totalQuestions}</Text>
        <Text>Average response time: {metadata.averageDwellTime.toFixed(3)}s</Text>
      </View>
      <Button title="Go again" onPress={() => onReset()} />
      <Button title="Home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
};

export default postQuiz;
