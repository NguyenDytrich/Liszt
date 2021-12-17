import React, {useEffect, useState} from 'react';
import {SafeAreaView, View, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {Question, TopBar} from '../components/quiz';

const quiz: React.FC<{}> = () => {
  const [isLoading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
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
      setQuestions(json);
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
          question={questions[questionIndex]}
          onComplete={() => {
            // Move to next question
            if (questionIndex < questions.length - 1)
              setQuestionIndex(questionIndex + 1);

            // Animate the progress bar
            setProgressMeter(progress + 1);

            // End the quiz if we reach the end
            if (questionIndex == questions.length - 1)
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
