import React, {useRef, useEffect} from 'react';
import {Animated, View, Text} from 'react-native';

import Colors from '../../styles/Colors';
import {QuestionAnim} from '../../styles/AnimationConfig';
import Options, {Option} from './Options';
import Prompt from './Prompt';

type Question = {
  prompt: {
    displayText: string;
    pitch: string;
  };
  options: Option[];
};

type SubmissionData = {
  recievedAt: Date | undefined;
  submittedAt: Date | undefined;
  submittedAnswer: string | undefined;
};

const question: React.FC<{
  question: Question;
  onComplete: () => void;
}> = ({question, onComplete}) => {
  const fade = useRef(new Animated.Value(0)).current;
  const submissionData: SubmissionData = {
    recievedAt: new Date(),
    submittedAt: undefined,
    submittedAnswer: undefined,
  };

  const parsePrompt = json => {
    return {
      displayText: json.prompt.displayText,
      pitch: json.prompt.abcString.substring(0, 1).toLowerCase() + '/4',
    };
  };
  const prompt = parsePrompt(question);

  // Parse the optionPool and answer into an array
  const parseOptions = json => {
    const v = [
      ...json.optionPool.map((o, i) => {
        return {displayText: o.letterClass, value: i};
      }),
      {
        isAnswer: true,
        displayText: json.answer.letterClass,
        value: 4,
      },
    ];

    return v;
  };

  /* Randomize array in-place using Durstenfeld shuffle algorithm */
  const shuffleArray = (array: any[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

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

  // When an answer is submitted, fade out
  const answerSubmitted = (value: Option) => {
    submissionData.submittedAt = new Date();
    submissionData.submittedAnswer =
      value.value == 4 ? question.answer : question.optionPool[value.value];

    console.log(JSON.stringify(submissionData));

    let delay = value.isAnswer
      ? QuestionAnim.correctDelay
      : QuestionAnim.incorrectDelay;
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
        <Prompt displayText={prompt.displayText} pitch={prompt.pitch} />
      </View>

      <Options options={options} onAnswerSubmit={answerSubmitted} />
    </Animated.View>
  );
};

export default question;
