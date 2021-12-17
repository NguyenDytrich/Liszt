import React, {useState} from 'react';
import {
  Button,
  SafeAreaView,
  View,
  Text,
  TextInput,
  Alert,
  StyleSheet,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';

import Colors from '../styles/Colors';
import { Login } from '../styles/BaseStyles';

const signup: React.FC<{}> = ({}) => {
  const navigation = useNavigation();
  if (auth().currentUser != null) navigation.navigate('Home');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConf, setPasswordConf] = useState('');
  const [name, setName] = useState('');
  const [pwdErrs, setPwdErrs] = useState<string | null>();

  const validatePasswords = () => {
    if (password == passwordConf) {
      setPwdErrs(null);
    } else {
      setPwdErrs('Passwords do not match!');
    }
  };

  const doSignup = () => {
    if (password != passwordConf && password != '') {
      setPwdErrs('Passwords do not match!');
    }

    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(credentials => {
        credentials.user.updateProfile({displayName: name});
      })
      .catch(e => {
        alert(e);
      });
  };

  return (
    <SafeAreaView>
      <View>
        <View
          style={{
            paddingTop: 24,
            paddingHorizontal: 36,
          }}>
          <Text style={Login.header}>Sign-up</Text>
          <View style={Login.labelContainer}>
            <Text style={Login.label}>Name</Text>
            <TextInput
              textContentType="name"
              placeholder="Your Name"
              style={Login.input}
              onChangeText={value => setName(value)}
              defaultValue={name}
            />
          </View>
          <View style={Login.labelContainer}>
            <Text style={Login.label}>Email</Text>
            <TextInput
              textContentType="emailAddress"
              placeholder="your.name@email.com"
              style={Login.input}
              onChangeText={value => setEmail(value)}
              defaultValue={email}
            />
          </View>
          <View style={Login.labelContainer}>
            <Text style={Login.label}>Password</Text>
            <TextInput
              textContentType="password"
              placeholder="password"
              secureTextEntry={true}
              style={Login.input}
              onChangeText={value => {
                setPassword(value);
              }}
              onBlur={validatePasswords}
              defaultValue={password}
            />
            <Text style={{color: Colors.red}}>{pwdErrs}</Text>
          </View>
          <View style={Login.labelContainer}>
            <Text style={Login.label}>Password (again)</Text>
            <TextInput
              textContentType="password"
              placeholder="password"
              secureTextEntry={true}
              style={Login.input}
              onChangeText={value => {
                setPasswordConf(value);
              }}
              onBlur={validatePasswords}
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
