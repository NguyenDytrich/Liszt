import React, {useRef, useEffect} from 'react';
import {Animated, View, Text} from 'react-native';

import Colors from '../../styles/Colors';
import {QuestionAnim} from '../../styles/AnimationConfig';
import Options from './Options';
import Prompt from './Prompt';
import {Question, SubmissionData, Option} from './types';
import {parsePrompt, parseOptions, shuffleArray} from './utils';

const question: React.FC<{
  question: Question;
  // TODO: don't set this to any
  onComplete: (response: any) => void;
}> = ({question, onComplete}) => {
  const fade = useRef(new Animated.Value(0)).current;
  const submissionData: SubmissionData = {
    recievedAt: new Date(),
    submittedAt: undefined,
    submittedAnswer: undefined,
  };

  const prompt = parsePrompt(question);

  // Parse out the options from the API response and shuffle it.
  const options = parseOptions(question);
  shuffleArray(options);

  // Fade in on load
  useEffect(() => {
    Animated.timing(fade, {
      toValue: 1,
      duration: QuestionAnim.fadeTime,
      useNativeDriver: false,
    }).start();
  }, [fade]);

  const answerSubmitted = (value: Option) => {
    submissionData.submittedAt = new Date();

    // 4 is the value always given to the answer... for some reason.
    submissionData.submittedAnswer =
      value.value == 4 ? question.answer : question.optionPool[value.value];

    // TODO: a better way to do this may be to pass this as a prop to chain after the blink?
    // When an answer is submitted, fade out
    let delay = value.isAnswer
      ? QuestionAnim.correctDelay // Move on faster than when incorrect
      : QuestionAnim.incorrectDelay; // Take longer so the correct answer can be blinked
    Animated.timing(fade, {
      delay,
      toValue: 0,
      duration: QuestionAnim.fadeTime,
      useNativeDriver: false,
    }).start(() => {
      onComplete({
        recievedAt: submissionData.recievedAt,
        submittedAt: submissionData.submittedAt,
        submittedAnswer: submissionData.submittedAnswer,
        question,
      });
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
        <Prompt displayText={prompt.displayText} pitch={prompt.pitch} />
      </View>

      <Options options={options} onAnswerSubmit={answerSubmitted} />
    </Animated.View>
  );
};

export default question;
