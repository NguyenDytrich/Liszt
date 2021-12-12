import React, {useState} from 'react';
import {SafeAreaView, View, Text, TouchableOpacity, Button} from 'react-native';
import Modal from 'react-native-modal';

import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FAIcon from 'react-native-vector-icons/FontAwesome';

import ProgressBar from '../components/quiz/ProgressBar';
import Prompt from '../components/quiz/Prompt';
import Options from '../components/quiz/Options';
import ExitModal from '../components/quiz/ExitModal';
import Colors from '../styles/Colors';

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

const quiz: React.FC<{}> = props => {
  return (
    <SafeAreaView>
      {topBar({...props})}
      <View style={{backgroundColor: '#fff'}}>
        <View
          style={{
            paddingHorizontal: 24,
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: 24,
              color: Colors.black
            }}>
            Question
          </Text>
          <Prompt displayText="Identify the following pitch..." />
        </View>

        <Options
          options={[
            {
              displayText: 'C',
              value: 0,
              isAnswer: true,
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
          ]}
        />
      </View>
    </SafeAreaView>
  );
};

export default quiz;
