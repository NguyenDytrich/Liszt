import React, {useState} from 'react';
import {
  TouchableHighlight,
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  SliderComponent,
} from 'react-native';
import {withSafeAreaInsets} from 'react-native-safe-area-context';

import Colors from '../../styles/Colors';

export type Option = {
  displayText: string;
  isAnswer?: boolean;
  value: number;
};

const options: React.FC<{
  options: Option[];
  onAnswerSubmit: () => void;
}> = ({options, onAnswerSubmit}) => {
  // Boolean to disable all options
  const [optionsDisabled, setOptionsDisabled] = useState(false);

  // Disable all options, then verify a selected option and return
  // it. Used as a callback for Option to set its state.
  const onOptionChoose = (value: Option): void => {
    setOptionsDisabled(true);
    onAnswerSubmit();
  };

  const nextBgColor = function* () {
    let i = 0;
    while (true) {
      if (i > Colors.mauves.length) i = 0;
      yield Colors.mauves[i];
      i++;
    }
  };

  // Create a list of Option components from our list of given options
  const opts = options.map((d, i) =>
    option({
      opt: d,
      onSelect: onOptionChoose,
      disabled: optionsDisabled,
      color: Colors.black,
      backgroundColor: Colors.nord.snowStorm[2],
    }),
  );

  return (
    <View
      style={{
        marginHorizontal: 24,
        marginTop: 88,
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
  backgroundColor: string;
  color: string;
  onSelect: (value: Option) => void;
  disabled?: boolean;
}> = ({opt, onSelect, backgroundColor, color, disabled = false}) => {
  const [selected, setSelected] = useState(false);

  // The selection state of an option
  // If a button is selected, change border based on its correctness
  const getColor = (borderBackground: string = 'border') => {
    // Change border color of a selected option if it's correct
    if (selected && !opt.isAnswer) {
      return Colors.red;
      // If the button gets disabled and this option is the answer, then change
      // its color to green to indicate which answer was correct.
    } else if (disabled && opt.isAnswer) {
      return Colors.green;
    } else {
      return borderBackground == 'border'
        ? Colors.nord.snowStorm[0]
        : backgroundColor;
    }
  };

  return (
    <View
      style={{
        ...styles.answerOption,
        borderColor: getColor(),
        backgroundColor: getColor('background'),
      }}
      key={opt.value}>
      <TouchableOpacity
        style={{
          height: '100%',
        }}
        disabled={disabled}
        onPress={() => {
          const selectionState = onSelect(opt);
          setSelected(true);
        }}>
        <Text
          style={{
            ...styles.answerText,
            color: selected && !opt.isAnswer ? Colors.white : color,
          }}>
          {opt.displayText}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  answerOption: {
    borderWidth: 2,
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
