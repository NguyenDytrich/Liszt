import React, {useEffect, useState} from 'react';
import {SafeAreaView, Button, View, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {Question, TopBar} from '../components/quiz';
import auth from '@react-native-firebase/auth';

const quiz: React.FC<{}> = () => {
  const [isLoading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  // TODO: don't set this to any...
  const [responses, setResponses] = useState<any>([]);
  const [isComplete, setCompleted] = useState(false);
  const [metadata, setMetadata] = useState({});
  const [questionIndex, setQuestionIndex] = useState(0);
  const [progress, setProgressMeter] = useState(0);
  const navigation = useNavigation();
  const totalQuestions = 3;

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

  const submitQuiz = async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/quiz`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: auth().currentUser?.uid,
          responses,
        }),
      });
      const json = await res.json();
      setMetadata(json.metadata);
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

  let page;
  if (!isLoading && !isComplete) {
    page = (
      <>
        <TopBar currentQuestion={progress} totalQuestions={totalQuestions} />
        <Question
          key={questionIndex}
          question={questions[questionIndex]}
          onComplete={response => {
            // Add the completed question to the responses
            setResponses([...responses, response]);

            // Move to next question
            if (questionIndex < questions.length - 1)
              setQuestionIndex(questionIndex + 1);

            // Animate the progress bar
            setProgressMeter(progress + 1);

            // End the quiz if we reach the end
            if (questionIndex == questions.length - 1) {
              setCompleted(true);
              submitQuiz();
            }
          }}
        />
      </>
    );
  } else if (!isLoading && isComplete) {
    page = (
      <>
        <View>
          <Text>You answered {metadata.totalQuestions}</Text>
          <Text>and got {metadata.totalCorrect} correct!</Text>
          <Text>That's {metadata.accuracy * 100}% correct!</Text>
          <Text>Average response time: {metadata.averageDwellTime}s</Text>
          <Button title="Home" onPress={() => navigation.navigate('Home')} />
        </View>
      </>
    );
  } else {
    page = (
      <>
        <View>
          {/* TODO: replace with a spinner :) */}
          <Text>Loading...</Text>
        </View>
      </>
    );
  }

  return <SafeAreaView>{page}</SafeAreaView>;
};

export default quiz;
