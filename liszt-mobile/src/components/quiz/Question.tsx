import React, {useRef, useEffect} from 'react';
import {Animated, View, Text} from 'react-native';

import Colors from '../../styles/Colors';
import { QuestionAnim } from '../../styles/AnimationConfig';
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

  // Fade in on load
  useEffect(() => {
    Animated.timing(fade, {
      toValue: 1,
      duration: QuestionAnim.fadeTime,
      useNativeDriver: false,
    }).start();
  }, [fade]);

  // When an answer is submitted, fade out
  const answerSubmitted = (correct: boolean) => {
    let delay = correct ? QuestionAnim.correctDelay : QuestionAnim.incorrectDelay;
    Animated.timing(fade, {
      delay,
      toValue: 0,
      duration: QuestionAnim.fadeTime,
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
