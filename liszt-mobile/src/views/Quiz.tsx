import React, {useEffect, useState} from 'react';
import {SafeAreaView, View, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {Question, TopBar} from '../components/quiz';

const quiz: React.FC<{}> = () => {
  const [isLoading, setLoading] = useState(true);
  const [question, setQuestion] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [progress, setProgressMeter] = useState(0);
  const navigation = useNavigation();
  const totalQuestions = 5;

  const fetchNew = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/question/pitch?count=${totalQuestions}`,
      );
      const json = await res.json();
      const data = json.map(j => {
        const v = {
          prompt: {
            displayText: j.prompt.displayText,
            pitch: j.prompt.abcString.substring(0, 1).toLowerCase() + '/4',
          },
          options: [
            ...j.optionPool.map((o, i) => {
              return {displayText: o.letterClass, value: i};
            }),
            {
              isAnswer: true,
              displayText: j.answer.letterClass,
              value: 4,
            },
          ],
        };
        /* Randomize array in-place using Durstenfeld shuffle algorithm */
        const shuffleArray = array => {
          for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
          }
        };

        shuffleArray(v.options);
        return v;
      });
      console.log(data.toString());
      setQuestion(data);
    } catch (e) {
      // TODO: show some kind of error page
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNew();
  }, []);

  return (
    <SafeAreaView>
      {!isLoading ? (
        <TopBar currentQuestion={progress} totalQuestions={totalQuestions} />
      ) : null}
      {!isLoading ? (
        <Question
          key={questionIndex}
          question={question[questionIndex]}
          onComplete={() => {
            // Move to next question
            if (questionIndex < question.length - 1)
              setQuestionIndex(questionIndex + 1);

            // Animate the progress bar
            setProgressMeter(progress + 1);

            // End the quiz if we reach the end
            if (questionIndex == question.length - 1)
              navigation.navigate('Home');
          }}
        />
      ) : (
        <View>
          {/* TODO: replace with a spinner :) */}
          <Text>Loading...</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default quiz;
