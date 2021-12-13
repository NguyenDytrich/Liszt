import React, {useState} from 'react';
import {SafeAreaView, View, TouchableOpacity, Animated} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {Question, ProgressBar, ExitModal} from '../components/quiz';

const topBar: React.FC<{}> = ({}) => {
  const navigation = useNavigation();
  const [modalState, setModalState] = useState(false);

  return (
    <View
      style={{
        flexDirection: 'row-reverse',
      }}>
      <View
        style={{
          width: '88%',
        }}>
        <ProgressBar currentQuestion={6} totalQuestions={10} />
      </View>
      <View
        style={{
          width: '12%',
          marginTop: 13,
          paddingLeft: 16,
        }}>
        <View>
          <TouchableOpacity onPress={() => setModalState(true)}>
            <Icon name="close" size={30} />
          </TouchableOpacity>
        </View>
      </View>
      <ExitModal
        visible={modalState}
        onCancel={() => {
          setModalState(!modalState);
        }}
        onConfirm={() => {
          navigation.navigate('Home');
        }}
      />
    </View>
  );
};
const quiz: React.FC<{}> = () => {
  const questions = [
    {
      prompt: {
        displayText: 'Identify the following pitch',
        pitch: 'c/4',
      },
      options: [
        {
          isAnswer: true,
          displayText: 'C',
          value: 0,
        },
        {
          displayText: 'D',
          value: 1,
        },
        {
          displayText: 'E',
          value: 2,
        },
        {
          displayText: 'F',
          value: 3,
        },
      ],
    },
    {
      prompt: {
        displayText: 'Identify the following pitch',
        pitch: 'e/4',
      },
      options: [
        {
          displayText: 'C',
          value: 0,
        },
        {
          displayText: 'D',
          value: 1,
        },
        {
          displayText: 'E',
          isAnswer: true,
          value: 2,
        },
        {
          displayText: 'F',
          value: 3,
        },
      ],
    },
  ];

  const [questionIndex, setQuestionIndex] = useState(0);

  return (
    <SafeAreaView>
      {topBar({})}
      <Question
        key={questionIndex}
        question={questions[questionIndex]}
        onComplete={() => {
          setTimeout(
            () =>
              questionIndex < questions.length - 1
                ? setQuestionIndex(questionIndex + 1)
                : setQuestionIndex(0),
          );
        }}
      />
    </SafeAreaView>
  );
};

export default quiz;
