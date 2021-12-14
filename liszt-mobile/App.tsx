import auth from '@react-native-firebase/auth';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  ShadowPropTypesIOS,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import Home from './src/views/Home';
import Login from './src/views/Login';
import Quiz from './src/views/Quiz';
import Signup from './src/views/Signup';

type RootStackParams = {
  Home: undefined;
  Quiz: undefined;
  Login: undefined;
  Signup: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParams {}
  }
}

const Stack = createNativeStackNavigator<RootStackParams>();

const App = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();
  const updateAuth = user => {
    setUser(user);
    if (loading) setLoading(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(updateAuth);
    return subscriber;
  }, []);

  if (loading) return null;

  return (
    <NavigationContainer
      theme={{
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          background: '#fff',
        },
      }}>
      <Stack.Navigator>
        {auth().currentUser != null ? (
          <>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Quiz"
              component={Quiz}
              options={{headerShown: false}}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Signup"
              component={Signup}
              options={{headerShown: false}}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  answerOption: {
    borderColor: '#F49CBB',
    borderWidth: 2,
    marginVertical: 8,
    height: 50,
    borderRadius: 8,
    // shadowColor: '#000',
    // shadowOffset: {height: 5, width: 0},
    // shadowOpacity: 0.1,
    // shadowRadius: 2,
  },
  answerText: {
    textAlign: 'center',
    fontSize: 40,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {height: 1, width: 0},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
});

export default App;
