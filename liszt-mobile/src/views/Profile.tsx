import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import TextFormField from '../components/form/TextFormField';
import {useNavigation} from '@react-navigation/native';
import Colors from '../styles/Colors';
import WarningModal from '../components/lib/WarningModal';

export interface UserProfile {
  displayName?: string,
  name?: string,
  pronouns?: string,
  instruments?: string,
  email?: string
}

const Profile: React.FC<{
  userId: string;
}> = ({userId}) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [profile, setProfile] = useState<UserProfile>({});
  const [isUnsaved, setUnsaved] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    setUser(auth().currentUser);
    if (user) {
      fetchProfile()
        .then(() => {
          setLoading(false);
        })
        .catch(() => {
          alert('Error loading profile');
          navigation.navigate('Home');
        });
    }
  }, [user]);

  const updateProfile = (property: UserProfile) => {
    setUnsaved(true);
    setProfile({...profile, ...property});
  };

  const fetchProfile = async () => {
    const jwt = await auth().currentUser?.getIdToken();
    const res = await fetch('http://localhost:5000/profile', {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    if (res.ok) {
      const json = await res.json();
      setProfile({
        displayName: json.displayName,
        name: json.name,
        pronouns: json.pronouns,
        instruments: json.instruments,
      });
    } else {
      throw new Error(res.statusText);
    }
  };

  const saveProfile = async () => {
    const jwt = await auth().currentUser?.getIdToken();
    const res = await fetch('http://localhost:5000/profile', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: auth().currentUser?.uid,
        displayName: profile.displayName,
        name: profile.name,
        pronouns: profile.pronouns,
        instruments: profile.instruments,
      }),
    });
    if (res.ok) {
      setUnsaved(false);
    } else {
      alert('Error saving profile');
    }
  };

  const returnHome = () => {
    if (isUnsaved) {
      setShowModal(true);
    } else {
      navigation.navigate('Home');
    }
  };

  if (loading) return null;

  return user != null ? (
    <SafeAreaView>
      <WarningModal
        visible={showModal}
        confirmButtonText="Keep editing"
        cancelButtonText="Go back"
        onCancel={() => navigation.navigate('Home')}
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
        <TextFormField
          labelText="Email"
          value={profile.email}
          onChangeText={value => updateProfile({email: value})}
        />
        <TextFormField
          labelText="Instruments"
          value={profile.instruments}
          onChangeText={value => updateProfile({instruments: value})}
        />
      </View>
      {isUnsaved ? <Button title="Save" onPress={() => saveProfile()} /> : null}
    </SafeAreaView>
  ) : null;
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
