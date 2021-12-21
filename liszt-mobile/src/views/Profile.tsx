import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {
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

const Profile: React.FC<{
  userId: string;
}> = ({userId}) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [profile, setProfile] = useState({});
  const [isUnsaved, setUnsaved] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    setUser(auth().currentUser);
    setProfile({
      displayName: user?.displayName,
      name: user?.name,
      pronouns: 'they/them',
      email: user?.email,
      instruments: 'piano, cello, guitar',
    });
    if (user) {
      setLoading(false);
    }
  }, [user]);

  const updateProfile = (property: {}) => {
    setUnsaved(true);
    setProfile({...profile, ...property});
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
        confirmButtonText='Keep editing'
        cancelButtonText='Go back'
        onCancel={() => navigation.navigate('Home')}
        onConfirm={() => setShowModal(false)}>
        <Text style={{textAlign: 'center'}}>You have unsaved changes!</Text>
        <Text style={{textAlign: 'center'}}>Are you sure you want to leave?</Text>
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
