import { Modal, Text, TouchableOpacity, View } from "react-native";
import { colorsPencil } from "./defaultValues";
import styles from "./styles";
import Slider from "@react-native-community/slider";
import { DrawingContext } from "./Context";
import { useContext } from "react";


export default function ModalPencilColors() {
  const {
    setPenColor,
    strokeWidth,
    setStrokeWidth,
    showModalPencilSettings,
    setShowModalPencilSettings
  } = useContext(DrawingContext);
  
    return (
        <Modal visible={showModalPencilSettings} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Configurações do Lápis</Text>
            <View style={styles.colorPicker}>
              {colorsPencil.map((color) => (
                <TouchableOpacity
                  key={color}
                  onPress={() => { setPenColor(color); setShowModalPencilSettings(false); }}
                  style={[styles.colorOption, { backgroundColor: color }]}
                />
              ))}
            </View>
            <Text style={styles.modalText}>Largura do Traço: {strokeWidth}px</Text>
            <Slider
              style={styles.slider}
              minimumValue={3}
              maximumValue={15}
              step={1}
              value={strokeWidth}
              onValueChange={(value: number) => setStrokeWidth(value)}
            />

            <TouchableOpacity onPress={() => setShowModalPencilSettings(false)} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
};  