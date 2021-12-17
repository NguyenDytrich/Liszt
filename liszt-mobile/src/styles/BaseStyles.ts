import {StyleSheet} from 'react-native';
import Colors from './Colors';

export const Base = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {height: 0, width: 0},
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
});

export const Login = StyleSheet.create({
  header: {
    fontSize: 30,
    marginVertical: 16,
    color: Colors.black,
  },
  input: {
    marginTop: 4,
    fontSize: 20,
    borderBottomColor: Colors.black,
    borderBottomWidth: 1,
    paddingVertical: 4,
    color: Colors.black,
  },
  labelContainer: {
    marginVertical: 8,
  },
  label: {
    fontSize: 25,
    color: Colors.black,
  },
  error: {
    marginTop: 4,
    color: Colors.red,
  }
});
