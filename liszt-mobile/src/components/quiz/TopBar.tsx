import React, {useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import ProgressBar from './ProgressBar';
import ExitModal from './ExitModal';

const topBar: React.FC<{
  currentQuestion: number;
  totalQuestions: number;
}> = ({currentQuestion, totalQuestions}) => {
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
        <ProgressBar currentQuestion={currentQuestion} totalQuestions={totalQuestions} />
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

export default topBar;
