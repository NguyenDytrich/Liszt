import React from 'react';
import {SafeAreaView, View, Text, ScrollView} from 'react-native';

import WeekSummary from '../components/home/WeekSummary';
import Greeting from '../components/home/Greeting';
import Categories from '../components/home/Categories';
import StartButton from '../components/home/StartButton';

type User = {
  displayName: string;
};

const home: React.FC<{
  user: User;
}> = ({user}) => {
  return (
    <SafeAreaView style={{backgroundColor: '#fff'}}>
      <Greeting name="Vivian" />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <WeekSummary accuracy={20} />
        <StartButton text="Quiz me!"/>
      </ScrollView>
    </SafeAreaView>
  );
};

export default home;
