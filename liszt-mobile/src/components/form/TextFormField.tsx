import React from 'react';
import {View, Text, TextInput, TextInputProps, StyleSheet} from 'react-native';
import Colors from '../../styles/Colors';

interface TextFormFieldProps extends TextInputProps {
  labelText: string;
}

const TextFormField: React.FC<TextFormFieldProps> = ({
  labelText,
  ...props
}) => {
  return (
    <View style={styles.formFieldContainer}>
      <Text style={styles.formFieldLabel}>{labelText}</Text>
      <TextInput style={styles.formFieldTextInput} {...props} />
    </View>
  );
};

const styles = StyleSheet.create({
  formFieldContainer: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    marginTop: 16
  },
  formFieldLabel: {
    fontWeight: '500',
    flexBasis: 100,
  },
  formFieldTextInput: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.nord.polarNight[2],
    flexGrow: 1,
  },
});

export default TextFormField;
