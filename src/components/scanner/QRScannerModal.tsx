import React from 'react';
import { Modal, View, StyleSheet, TouchableOpacity } from 'react-native';
import { CameraView } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import { ScannerOverlay } from './ScannerOverlay';
import { Animated } from 'react-native';
import {
  SCANNER_BACKGROUND_COLOR,
  SCANNER_CLOSE_BUTTON_BG,
  SCANNER_CLOSE_BUTTON_ICON,
} from '../../utils/constants';

interface QRScannerModalProps {
  visible: boolean;
  scaleAnim: Animated.Value;
  onClose: () => void;
  onBarcodeScanned: (data: string) => void;
}

export const QRScannerModal: React.FC<QRScannerModalProps> = ({
  visible,
  scaleAnim,
  onClose,
  onBarcodeScanned,
}) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <CameraView
          style={styles.camera}
          facing="back"
          barcodeScannerSettings={{
            barcodeTypes: ['qr'],
          }}
          onBarcodeScanned={({ data }) => onBarcodeScanned(data)}
        />
        <ScannerOverlay scaleAnim={scaleAnim} />
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Ionicons name="close" size={24} color={SCANNER_CLOSE_BUTTON_ICON} />
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: SCANNER_BACKGROUND_COLOR,
  },
  camera: {
    flex: 1,
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    backgroundColor: SCANNER_CLOSE_BUTTON_BG,
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
