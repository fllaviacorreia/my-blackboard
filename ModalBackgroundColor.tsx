import { Modal, Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import { colorsBackground } from "./defaultValues";

type ModalProps = {
    setBackgroundColor: (color: string) => void;
    visibleModal: boolean;
    setVisibleModal: (show: boolean) => void;
}
export default function ModalBackgroundColor({ setBackgroundColor, visibleModal, setVisibleModal }: ModalProps) {
   return (
      <Modal visible={visibleModal} transparent animationType="slide">
         <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
               <Text style={styles.modalTitle}>Selecione a Cor de Fundo</Text>
               <View style={styles.colorPicker}>
                  {colorsBackground.map((color) => (
                     <TouchableOpacity
                        key={color}
                        onPress={() => {
                           setBackgroundColor(color);
                           setVisibleModal(false);
                        }}
                        style={[styles.colorOption, { backgroundColor: color }]}
                     />
                  ))}
               </View>
            </View>
            <TouchableOpacity onPress={() => setVisibleModal(false)} style={styles.closeButton}>
              <Text>Fechar</Text>
            </TouchableOpacity>
         </View>
      </Modal>
   );
}