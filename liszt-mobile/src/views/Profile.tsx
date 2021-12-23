import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState, useRef} from 'react';
import TextFormField from '../components/form/TextFormField';
import {useNavigation} from '@react-navigation/native';
import Colors from '../styles/Colors';
import WarningModal from '../components/lib/WarningModal';
import {store, useAppDispatch, useAppSelector} from '../store';
import {UserActions, syncProfile} from '../store/UserSlice';

export interface UserProfile {
  displayName?: string;
  name?: string;
  pronouns?: string;
  instruments?: string;
  email?: string;
}

const Profile: React.FC<{}> = () => {
  const [isUnsaved, setUnsaved] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useAppDispatch();
  const profile = useAppSelector(state => state.user);
  const initialProfile = useRef({...store.getState().user}).current;

  const navigation = useNavigation();

  const updateProfile = (property: UserProfile) => {
    setUnsaved(true);
    dispatch({
      type: UserActions.UPDATE_PROFILE,
      payload: property,
    });
  };

  const returnHome = () => {
    if (isUnsaved) {
      setShowModal(true);
    } else {
      navigation.navigate('Home');
    }
  };

  return (
    <SafeAreaView>
      <WarningModal
        visible={showModal}
        confirmButtonText="Keep editing"
        cancelButtonText="Go back"
        onCancel={() => {
          navigation.navigate('Home');
          // Reset the profile
          dispatch({
            type: UserActions.UPDATE_PROFILE,
            payload: initialProfile,
          });
        }}
        onConfirm={() => setShowModal(false)}>
        <Text style={{textAlign: 'center'}}>You have unsaved changes!</Text>
        <Text style={{textAlign: 'center'}}>
          Are you sure you want to leave?
        </Text>
      </WarningModal>
      <View style={styles.container}>
        <View style={{justifyContent: 'flex-end', flexDirection: 'row'}}>
          <TouchableOpacity style={{width: 40}} onPress={returnHome}>
            <Text
              style={{
                textAlign: 'center',
                color: Colors.blue,
                fontWeight: '500',
              }}>
              Done
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.header}>Profile</Text>
        <TextFormField
          labelText="Display Name"
          value={profile.displayName}
          onChangeText={value => updateProfile({displayName: value})}
        />
        <TextFormField
          labelText="Name"
          value={profile.name}
          onChangeText={value => updateProfile({name: value})}
        />
        <TextFormField
          labelText="Pronouns"
          value={profile.pronouns}
          onChangeText={value => updateProfile({pronouns: value})}
        />
        {/*
        <TextFormField
          labelText="Email"
          value={profile.email}
          onChangeText={value => updateProfile({email: value})}
        />
        */}
        <TextFormField
          labelText="Instruments"
          value={profile.instruments}
          onChangeText={value => updateProfile({instruments: value})}
        />
      </View>
      {isUnsaved ? (
        <Button
          title="Save"
          onPress={() => {
            dispatch(
              syncProfile(
                () => setUnsaved(false),
                () => Alert.alert('Error saving profile'),
              ),
            );
          }}
        />
      ) : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  container: {
    padding: 24,
  },
});

export default Profile;
