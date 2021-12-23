import React, {useState, useEffect} from 'react';
import {Button, SafeAreaView, View, Text, ScrollView} from 'react-native';
import auth from '@react-native-firebase/auth';

import WeekSummary from '../components/home/WeekSummary';
import Greeting from '../components/home/Greeting';
import StartButton from '../components/home/StartButton';
import {store, useAppDispatch, useAppSelector} from '../store';
import { fetchProfile } from '../store/UserSlice';

const home: React.FC<{}> = () => {
  const displayName = useAppSelector(state => state.user.displayName);

  return (
    <SafeAreaView style={{backgroundColor: '#fff'}}>
      <Greeting name={displayName} />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <WeekSummary accuracy={20} />
        <StartButton text="Quiz me!" />
        <Button title="Logout" onPress={() => auth().signOut()} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default home;
