import React, {useState, useEffect} from 'react';
import {Button, SafeAreaView, View, Text, ScrollView} from 'react-native';
import auth from '@react-native-firebase/auth';

import WeekSummary from '../components/home/WeekSummary';
import Greeting from '../components/home/Greeting';
import StartButton from '../components/home/StartButton';
import {isSearchBarAvailableForCurrentPlatform} from 'react-native-screens';

type User = {
  displayName: string;
};

const home: React.FC<{
  user: User;
}> = ({user}) => {
  // const [name, setName] = useState('');
  const name = auth().currentUser?.displayName;

  return (
    <SafeAreaView style={{backgroundColor: '#fff'}}>
      <Greeting name={name == null || name == undefined ? '' : name} />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <WeekSummary accuracy={20} />
        <StartButton text="Quiz me!" />
        <Button title="Logout" onPress={() => auth().signOut()} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default home;
