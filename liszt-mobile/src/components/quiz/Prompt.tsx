import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import Vex from 'vexflow';
import {ReactNativeSVGContext, NotoFontPack} from 'standalone-vexflow-context';

import Colors from '../../styles/Colors';

const prompt: React.FC<{
  displayText: string;
  abcNotation?: string;
}> = ({displayText, abcNotation}) => {
  return (
    <View
      style={{
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: {height: 0, width: 0},
        shadowOpacity: 0.1,
        shadowRadius: 5,
        paddingHorizontal: 24,
        marginTop: 24,
        borderRadius: 8,
      }}>
      <Text
        style={{
          paddingTop: 20,
          color: Colors.black,
        }}>
        {displayText}
      </Text>
      <SingleNote note="c/4" />
      <Text></Text>
    </View>
  );
};

const SingleNote: React.FC<{
  note: string;
}> = ({note}) => {
  const vctx = new ReactNativeSVGContext(NotoFontPack, {
    width: 100,
    height: 100,
  });
  const VF = Vex.Flow;
  const stave = new VF.Stave(0, 0, 99, {fill_style: Colors.nord.polarNight[2]});
  const voice = new VF.Voice({num_beats: 1, beat_value: 4});

  const n = new VF.StaveNote({
    clef: 'treble',
    keys: ['c/4'],
    duration: 'q',
  }).setKeyStyle(0, {
    strokeStyle: Colors.black,
    fillStyle: Colors.black,
  });

  voice.addTickables([n]);
  const formatter = new VF.Formatter().joinVoices([voice]).format([voice], 0);

  stave.setContext(vctx);
  stave.addClef('treble');
  stave.getContext().setFillStyle(Colors.black);

  stave.draw();
  voice.draw(vctx, stave);

  return <View style={{alignItems: 'center'}}>{vctx.render()}</View>;
};

export default prompt;
