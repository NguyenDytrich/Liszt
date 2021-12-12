import React, {useState} from 'react';
import {
  TouchableHighlight,
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';

type Option = {
  displayText: string;
  isAnswer?: boolean;
  value: number;
};

type SelectionState = {
  selected: boolean;
  correct: boolean;
};

const options: React.FC<{
  options: Option[];
}> = ({options}) => {
  // Boolean to disable all options
  const [optionsDisabled, setOptionsDisabled] = useState(false);

  // Disable all options, then verify a selected option and return
  // it. Used as a callback for Option to set its state.
  const onOptionChoose = (value: Option): void => {
    setOptionsDisabled(true);
  };

  // Create a list of Option components from our list of given options
  const opts = options.map(d =>
    option({opt: d, onSelect: onOptionChoose, disabled: optionsDisabled}),
  );

  return (
    <View
      style={{
        marginHorizontal: 24,
      }}>
      {opts}
    </View>
  );
};

/**
 * Represents one Option button
 */
const option: React.FC<{
  opt: Option;
  selection?: SelectionState;
  onSelect: (value: Option) => void;
  disabled?: boolean;
}> = ({opt, onSelect, selection, disabled = false}) => {

  const [selected, setSelected] = useState(false);

  // The selection state of an option
  // If a button is selected, change border based on its correctness
  const borderColor = () => {
    // Change border color of a selected option if it's correct
    if (selected && !opt.isAnswer) {
      return '#E75A7C';
    // If the button gets disabled and this option is the answer, then change
    // its color to green to indicate which answer was correct.
    } else if (disabled && opt.isAnswer) {
      return '#62C370';
    } else {
      return '#6e7a87';
    }
  };

  return (
    <View
      style={{
        ...styles.answerOption,
        borderColor: borderColor(),
      }}
      key={opt.value}>
      <TouchableOpacity
        style={{
          height: '100%',
          borderRadius: 7,
        }}
        disabled={disabled}
        onPress={() => {
          const selectionState = onSelect(opt);
          setSelected(true);
        }}>
        <Text style={styles.answerText}>{opt.displayText}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  answerOption: {
    borderWidth: 1,
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
});

export default options;
