import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import FAIcon from 'react-native-vector-icons/FontAwesome';

import Colors from '../../styles/Colors';

const exitModal: React.FC<{
  visible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}> = ({visible, onCancel, onConfirm}) => {
  return (
    <View>
      <Modal animationIn="slideInUp" isVisible={visible} backdropOpacity={0.1}>
        <View
          style={{
            backgroundColor: Colors.white,
            paddingVertical: 26,
            paddingHorizontal: 24,
            borderRadius: 16,
            shadowColor: Colors.black,
            shadowOffset: {height: 1, width: 0},
            shadowOpacity: 0.15,
            shadowRadius: 5,
          }}>
          <View style={{alignItems: 'center', marginBottom: 16}}>
            <FAIcon name="warning" size={50} color={Colors.orange} />
          </View>
          <Text style={styles.modalText}>
            Your progress won't be saved!
          </Text>
          <Text style={styles.modalText}>
            Are you sure you want to quit?
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: 16,
            }}>
            <View
              style={{
                width: '40%',
                backgroundColor: Colors.green,
                borderRadius: 8,
              }}>
              <Button title="Keep Going" color={Colors.white} onPress={onCancel} />
            </View>
            <View
              style={{
                width: '40%',
                backgroundColor: Colors.red,
                borderRadius: 8,
              }}>
              <Button title="Quit" color={Colors.white} onPress={onConfirm} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
    modalText: {
        textAlign: 'center',
        color: Colors.black
    }
});

export default exitModal;