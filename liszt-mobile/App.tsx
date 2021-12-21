import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';

import Home from './src/views/Home';
import Login from './src/views/Login';
import Quiz from './src/views/Quiz';
import Signup from './src/views/Signup';
import Profile from './src/views/Profile';

type RootStackParams = {
  Home: undefined;
  Quiz: undefined;
  Login: undefined;
  Signup: undefined;
  Profile: {userId: string};
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParams {}
  }
}

const Stack = createNativeStackNavigator<RootStackParams>();

const App = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const updateAuth = (user: FirebaseAuthTypes.User | null) => {
    if (user && user.displayName) {
      if (loading) setLoading(false);
    }
    setUser(user);
  };

  useEffect(() => {
    const subscriber = auth().onUserChanged(updateAuth);
    return subscriber;
  }, []);

  // if (loading) return null;

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
        {user != null && user.displayName != null ? (
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
            <Stack.Screen
              name="Profile"
              component={Profile}
              initialParams={{userId: user.uid}}
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
