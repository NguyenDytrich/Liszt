import React, {useState} from 'react';
import {
  Button,
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import Modal from 'react-native-modal';

import {Login} from '../styles/BaseStyles';
import Colors from '../styles/Colors';

const login: React.FC<{}> = ({}) => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [resetPassword, toggleResetModal] = useState(false);
  const [linkSent, setLinkSent] = useState(false);

  const doLogin = () => {
    if (email == '') {
      setEmailError("Email can't be empty!");
    }

    if (email != '' && password != '') {
      auth()
        .signInWithEmailAndPassword(email, password)
        .catch(e => {
          if (e.message.includes('[auth/invalid-email]')) {
            setEmailError('Invalid email address!');
          } else if (e.message.includes('[auth/user-not-found]')) {
            setEmailError('Invalid email address!');
          } else if (e.message.includes('[auth/wrong-password]')) {
            setPasswordError('Invalid email/password combination.');
          }
        });
    }
  };

  return (
    <SafeAreaView>
      <View style={{paddingTop: 24}}>
        <View
          style={{
            padding: 36,
          }}>
          <Text style={Login.header}>Welcome to Liszt!</Text>
          <Text style={Login.header}>Login or sign up to continue</Text>
          <View style={Login.labelContainer}>
            <Text style={Login.label}>Email</Text>
            <TextInput
              textContentType="emailAddress"
              placeholder="your.name@email.com"
              style={{
                ...Login.input,
                borderBottomColor: emailError ? Colors.red : Colors.black,
              }}
              onChangeText={value => setEmail(value)}
              onBlur={() => setEmailError(null)}
              defaultValue={email}
            />
            <Text style={Login.error}>{emailError ? emailError : ''}</Text>
          </View>
          <View style={Login.labelContainer}>
            <Text style={Login.label}>Password</Text>
            <TextInput
              textContentType="password"
              placeholder="password"
              secureTextEntry={true}
              style={{
                ...Login.input,
                borderBottomColor: passwordError ? Colors.red : Colors.black,
              }}
              onChangeText={value => setPassword(value)}
              onBlur={() => setPasswordError(null)}
              defaultValue={password}
            />
            {passwordError ? (
              <View>
                <Text style={Login.error}>{passwordError}</Text>
                <TouchableOpacity onPress={() => toggleResetModal(true)}>
                  <Text
                    style={{
                      textAlign: 'right',
                      marginTop: 16,
                      color: Colors.blue,
                    }}>
                    Forgot password?
                  </Text>
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
        </View>
      </View>
      <View>
        <Button title="Login" onPress={doLogin} />
        <Button title="Sign up" onPress={() => navigation.navigate('Signup')} />
      </View>
      <Modal
        isVisible={resetPassword}
        onModalShow={() => setEmail('')}
        onModalHide={() => {
          setEmail('');
          setLinkSent(false);
        }}>
        <View
          style={{
            backgroundColor: Colors.white,
            padding: 24,
            borderRadius: 16,
          }}>
          {!linkSent ? (
            <>
              <Text style={{fontSize: 20, marginBottom: 16}}>
                Reset password?
              </Text>
              <Text style={{marginBottom: 16}}>
                Enter your email address to reset your password.
              </Text>
              <TextInput
                placeholder="your.name@gmail.com"
                onChangeText={value => setEmail(value)}
                onBlur={() => setEmailError(null)}
                style={{
                  ...Login.input,
                  fontSize: 16,
                  marginBottom: 4,
                }}></TextInput>
              <Text style={{...Login.error, marginBottom: 16}}>
                {emailError ? emailError : ''}
              </Text>
              <Button
                title="Confirm Password Reset"
                onPress={() => {
                  auth()
                    .sendPasswordResetEmail(email)
                    .then(() => {
                      setLinkSent(true);
                    })
                    .catch(e => {
                      if (e.message.includes('[auth/invalid-email]')) {
                        setEmailError('Invalid email address!');
                      }
                      alert(e);
                    });
                }}
              />
              <Button title="Cancel" onPress={() => toggleResetModal(false)} />
            </>
          ) : (
            <>
              <Text>A password reset link has been sent to {email}.</Text>
              <Button
                title="Close"
                onPress={() => {
                  toggleResetModal(false);
                }}
              />
            </>
          )}
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default login;
