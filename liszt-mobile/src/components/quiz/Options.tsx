import React, {useEffect, useRef, useState} from 'react';
import {Animated, View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import Colors from '../../styles/Colors';
import {OptionsAnim} from '../../styles/AnimationConfig';

export type Option = {
  displayText: string;
  isAnswer?: boolean;
  value: number;
};

const options: React.FC<{
  options: Option[];
  onAnswerSubmit: (value: Option) => void;
}> = ({options, onAnswerSubmit}) => {
  // Boolean to disable all options
  const [optionsDisabled, setOptionsDisabled] = useState(false);

  
  // Disable all options, then verify a selected option and return
  // it. Used as a callback for Option to set its state.
  const onOptionChoose = (value: Option): void => {
    setOptionsDisabled(true);
    onAnswerSubmit(value);
  };

  // Create a list of Option components from our list of given options
  const opts = options.map(d =>
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
  const animation = useRef(new Animated.Value(0)).current;

  const blink = Animated.sequence([
    Animated.timing(animation, {
      delay: OptionsAnim.blinkDelay,
      toValue: 0.5,
      duration: OptionsAnim.blinkTime,
      useNativeDriver: false,
    }),
    Animated.timing(animation, {
      toValue: 1,
      duration: OptionsAnim.blinkDelay,
      delay: OptionsAnim.blinkTime,
      useNativeDriver: false,
    }),
  ]);

  // The selection state of an option
  // If a button is selected, change border based on its correctness
  const getColor = (borderBackground: string = 'border') => {
    // Change border color of a selected option if it's correct
    if (selected) {
      return opt.isAnswer ? Colors.green : Colors.red;

      // If the button gets disabled and this option is the answer, then change
      // its color to green to indicate which answer was correct.
    } else if (disabled && opt.isAnswer) {
      // return Colors.green;

      Animated.loop(blink, {
        iterations: OptionsAnim.blinkIterations,
      }).start();

      return animation.interpolate({
        inputRange: [0, 1],
        outputRange: [backgroundColor, Colors.green],
      });
    } else {
      return borderBackground == 'border'
        ? Colors.nord.snowStorm[0]
        : backgroundColor;
    }
  };

  return (
    <Animated.View
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
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  answerOption: {
    borderWidth: 2,
    marginVertical: 8,
    height: 50,
    borderRadius: 8,
  },
  answerText: {
    textAlign: 'center',
    fontSize: 40,
  },
});

export default options;
