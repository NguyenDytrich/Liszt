import React, {useRef, useEffect} from 'react';
import {Animated, View, Text} from 'react-native';

import Colors from '../../styles/Colors';
import {QuestionAnim} from '../../styles/AnimationConfig';
import Options, {Option} from './Options';
import Prompt from './Prompt';
import auth from '@react-native-firebase/auth';

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
  // TODO: don't set this to any
  onComplete: (response: any) => void;
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
      pitch: json.prompt.midiNotation,
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

  const answerSubmitted = (value: Option) => {
    submissionData.submittedAt = new Date();
    submissionData.submittedAnswer =
      value.value == 4 ? question.answer : question.optionPool[value.value];

    // TODO: batch this request at the end of the quiz. Currently the API doesn't support this.
    if (auth().currentUser) {
      fetch('http://localhost:5000/question/answer', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: auth().currentUser?.uid,
          recievedAt: submissionData.recievedAt,
          submittedAt: submissionData.submittedAt,
          submittedAnswer: submissionData.submittedAnswer,
          question,
        }),
      });
    }

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
