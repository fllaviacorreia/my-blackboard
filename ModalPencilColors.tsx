import { Modal, Text, TouchableOpacity, View } from "react-native";
import { colorsPencil } from "./defaultValues";
import styles from "./styles";
import Slider from "@react-native-community/slider";

type ModalProps = {
    setPenColor: (color: string) => void;
    showSettingsPencil: boolean;
    setShowSettingsPencil: (show: boolean) => void;
    strokeWidth: number;
    setStrokeWidth: (width: number) => void;
}
export default function ModalPencilColors({ setPenColor, showSettingsPencil, setShowSettingsPencil, strokeWidth, setStrokeWidth }: ModalProps) {
    return (
        <Modal visible={showSettingsPencil} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Configurações do Lápis</Text>
            <View style={styles.colorPicker}>
              {colorsPencil.map((color) => (
                <TouchableOpacity
                  key={color}
                  onPress={() => { setPenColor(color); setShowSettingsPencil(false); }}
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

            {/* Botão para Fechar o Modal */}
            <TouchableOpacity onPress={() => setShowSettingsPencil(false)} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
};  