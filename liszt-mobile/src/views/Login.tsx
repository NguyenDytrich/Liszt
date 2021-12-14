import React, {useState} from 'react';
import {Button, SafeAreaView, View, Text, TextInput} from 'react-native';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';

const login: React.FC<{}> = ({}) => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const doLogin = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        // navigation.navigate('Home');
      })
      .catch(e => alert(e));
  };

  return (
    <SafeAreaView>
      <View>
        <Text>Welcome to Liszt!</Text>
        <Text>Login or sign up to continue</Text>
        <View
          style={{
            padding: 24,
          }}>
          <Text style={{fontSize: 25}}>Email:</Text>
          <TextInput
            textContentType="emailAddress"
            placeholder="your.name@email.com"
            style={{
              fontSize: 25,
            }}
            onChangeText={value => setEmail(value)}
            defaultValue={email}
          />
          <Text style={{fontSize: 25}}>Password</Text>
          <TextInput
            textContentType="password"
            placeholder="password"
            secureTextEntry={true}
            style={{
              fontSize: 25,
            }}
            onChangeText={value => setPassword(value)}
            defaultValue={password}
          />
        </View>
      </View>
      <View>
        <Button title="Login" onPress={doLogin} />
        <Button title="Sign up" onPress={() => navigation.navigate('Signup')} />
      </View>
    </SafeAreaView>
  );
};

export default login;
