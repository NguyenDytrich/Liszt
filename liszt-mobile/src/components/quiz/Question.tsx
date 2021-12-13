import React, {useRef, useEffect} from 'react';
import {Animated, View, Text} from 'react-native';

import Colors from '../../styles/Colors';
import Options, {Option} from './Options';
import Prompt from './Prompt';

type Question = {
  prompt: {
    displayText: string;
    pitch: string;
  };
  options: Option[];
};

const question: React.FC<{
  question: Question;
  onComplete: () => void;
}> = ({question, onComplete}) => {
  const fade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fade, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [fade]);

  const answerSubmitted = (correct: boolean) => {
    let delay = correct ? 600 : 2000;
    Animated.timing(fade, {
      delay,
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start(() => {
      onComplete();
    });
  };

  return (
    <Animated.View style={{backgroundColor: '#fff', opacity: fade}}>
      <View
        style={{
          paddingHorizontal: 24,
        }}>
        <Text
          style={{
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 24,
            color: Colors.black,
          }}>
          Question
        </Text>
        <Prompt
          displayText={question.prompt.displayText}
          pitch={question.prompt.pitch}
        />
      </View>

      <Options options={question.options} onAnswerSubmit={answerSubmitted} />
    </Animated.View>
  );
};

export default question;
