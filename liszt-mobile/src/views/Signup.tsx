import React, {useState} from 'react';
import {Button, SafeAreaView, View, Text, TextInput, Alert} from 'react-native';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';

const signup: React.FC<{}> = ({}) => {
  const navigation = useNavigation();
  if (auth().currentUser != null) navigation.navigate('Home');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConf, setPasswordConf] = useState('');
  const [name, setName] = useState('');

  const doSignup = () => {
    if (password != passwordConf && password != '')
      return alert('Passwords do not match');

    // TODO
    // this works but you need to refresh the application for the changes to
    // happen.
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        auth().currentUser?.updateProfile({displayName: name});
      })
      .catch(e => alert(e));
  };

  return (
    <SafeAreaView>
      <View>
        <Text style={{fontSize: 30}}>Signup</Text>
        <View
          style={{
            padding: 24,
          }}>
          <View style={{marginVertical: 16}}>
            <Text style={{fontSize: 25}}>Email:</Text>
            <TextInput
              textContentType="name"
              placeholder="Your Name"
              style={{
                fontSize: 25,
              }}
              onChangeText={value => setName(value)}
              defaultValue={name}
            />
          </View>
          <View style={{marginVertical: 16}}>
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
          </View>
          <View style={{marginVertical: 16}}>
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
          <View style={{marginVertical: 16}}>
            <Text style={{fontSize: 25}}>Password (again)</Text>
            <TextInput
              textContentType="password"
              placeholder="password"
              secureTextEntry={true}
              style={{
                fontSize: 25,
              }}
              onChangeText={value => setPasswordConf(value)}
              defaultValue={passwordConf}
            />
          </View>
        </View>
      </View>
      <View>
        <Button title="Signup" onPress={doSignup} />
        <Button title="Cancel" onPress={() => navigation.navigate('Login')} />
      </View>
    </SafeAreaView>
  );
};

export default signup;
