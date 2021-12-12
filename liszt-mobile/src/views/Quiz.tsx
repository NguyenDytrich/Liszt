import React, {useState} from 'react';
import {SafeAreaView, View, Text, TouchableOpacity, Button} from 'react-native';
import Modal from 'react-native-modal';

import ProgressBar from '../components/quiz/ProgressBar';
import Prompt from '../components/quiz/Prompt';
import Options from '../components/quiz/Options';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FAIcon from 'react-native-vector-icons/FontAwesome';

const confirmExitModal: React.FC<{
  visible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}> = ({visible, onCancel, onConfirm}) => {
  return (
    <View>
      <Modal animationIn="slideInUp" isVisible={visible} backdropOpacity={0.1}>
        <View
          style={{
            backgroundColor: '#fff',
            paddingVertical: 26,
            paddingHorizontal: 24,
            borderRadius: 16,
            shadowColor: '#000',
            shadowOffset: {height: 1, width: 0},
            shadowOpacity: 0.15,
            shadowRadius: 5,
          }}>
          <View style={{alignItems: 'center', marginBottom: 16}}>
            <FAIcon name="warning" size={50} color="#F58851" />
          </View>
          <Text style={{textAlign: 'center'}}>
            Your progress won't be saved!
          </Text>
          <Text style={{textAlign: 'center'}}>
            Are you sure you want to quit?
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: 16,
            }}>
            <View
              style={{
                width: '40%',
                backgroundColor: '#62C370',
                borderRadius: 8,
              }}>
              <Button title="Continue" color="#fff" onPress={onConfirm} />
            </View>
            <View
              style={{
                width: '40%',
                backgroundColor: '#E75A7C',
                borderRadius: 8,
              }}>
              <Button title="Quit" color="#fff" onPress={onCancel} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

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
      {confirmExitModal({
        visible: modalState,
        onCancel: () => {
          setModalState(!modalState);
        },
        onConfirm: () => {
          navigation.navigate('Home');
        },
      })}
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
