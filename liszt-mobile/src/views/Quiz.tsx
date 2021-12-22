import React, {useEffect, useState, useRef} from 'react';
import {SafeAreaView, Button, View, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {PostQuiz, Question, TopBar} from '../components/quiz';
import auth from '@react-native-firebase/auth';
import {
  Question as QuestionType,
  QuizMetadata,
  SubmissionData,
} from '../components/quiz/types';

const quiz: React.FC<{}> = () => {
  const [isLoading, setLoading] = useState(true);
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  let responses = useRef<SubmissionData[]>([]).current;
  const [isComplete, setCompleted] = useState(false);
  const [metadata, setMetadata] = useState<QuizMetadata>();
  const [questionIndex, setQuestionIndex] = useState(0);
  const [progress, setProgressMeter] = useState(0);
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

  const reset = async() => {
    setLoading(true);
    setCompleted(false);
    setMetadata(undefined);
    setQuestions([]);
    setQuestionIndex(0);
    setProgressMeter(0);

    // Reset the responses
    while(responses.length > 0) {
      responses.pop();
    }

    fetchNew();
  }

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
            responses.push(response);

            // Move to next question
            if (questionIndex < questions.length - 1)
              setQuestionIndex(questionIndex + 1);

            // TODO: Animate the progress bar to 100% before moving on
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
  } else if (!isLoading && isComplete && metadata) {
    page = (
      <PostQuiz metadata={metadata} onReset={reset}/>
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
