import React from 'react';
import {Button, View, Text, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import FAIcon from 'react-native-vector-icons/FontAwesome';

import Colors from '../../styles/Colors';

const warningModal: React.FC<{
  visible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  confirmButtonText: string;
  cancelButtonText: string;
}> = ({
  visible,
  onCancel,
  onConfirm,
  children,
  confirmButtonText,
  cancelButtonText,
}) => {
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
          {children}
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
              <Button
                title={confirmButtonText}
                color={Colors.white}
                onPress={onConfirm}
              />
            </View>
            <View
              style={{
                width: '40%',
                backgroundColor: Colors.red,
                borderRadius: 8,
              }}>
              <Button
                title={cancelButtonText}
                color={Colors.white}
                onPress={onCancel}
              />
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
    color: Colors.black,
  },
});

export default warningModal;
