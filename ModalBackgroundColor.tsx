import { Modal, Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import { colorsBackground } from "./defaultValues";
import { DrawingContext } from "./Context";
import { useContext } from "react";


export default function ModalBackgroundColor() {
   const { 
      showModalBackgroundSettings, 
      setShowModalBackgroundSettings, 
      setBackgroundColor 
   } = useContext(DrawingContext);
   
   return (
      <Modal visible={showModalBackgroundSettings} transparent animationType="slide">
         <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
               <Text style={styles.modalTitle}>Selecione a Cor de Fundo</Text>
               <View style={styles.colorPicker}>
                  {colorsBackground.map((color) => (
                     <TouchableOpacity
                        key={color}
                        onPress={() => {
                           setBackgroundColor(color);
                           setShowModalBackgroundSettings(false);
                        }}
                        style={[styles.colorOption, { backgroundColor: color }]}
                     />
                  ))}
               </View>

            <TouchableOpacity onPress={() => setShowModalBackgroundSettings(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Fechar</Text>
            </TouchableOpacity>
            </View>
         </View>
      </Modal>
   );
}