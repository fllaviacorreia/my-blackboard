import { TouchableOpacity, View } from "react-native";
import Entypo from '@expo/vector-icons/Entypo';
import { useContext } from "react";
import { colorBaseIcons, sizeIcons } from "./defaultValues";
import { DrawingContext } from "./Context";
import styles from "./styles";

export default function Toobar(){
    const {
        penColor,
        backgroundColor,
        colorEraser,
        undoLastStroke,
        setShowModalPencilSettings,
        setShowModalBackgroundSettings,
        clearCanvas,
        toggleEraser,
    } = useContext(DrawingContext);

    return(
        <View style={styles.toolbar} >
        <TouchableOpacity onPress={undoLastStroke} style={styles.toolbarButton}>
          <Entypo
            name="back-in-time"
            size={sizeIcons}
            color={colorBaseIcons}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setShowModalPencilSettings(true)} style={styles.toolbarButton}>
          <Entypo
            name="pencil"
            size={sizeIcons}
            color={penColor}
          />

        </TouchableOpacity>
        <TouchableOpacity onPress={() => setShowModalBackgroundSettings(true)} style={styles.toolbarButton}>
          <Entypo
            name="blackboard"
            size={sizeIcons}
            color={backgroundColor}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={toggleEraser} style={styles.toolbarButton}>
          <Entypo
            name="eraser"
            size={sizeIcons}
            color={colorEraser}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={clearCanvas} style={styles.toolbarButton}>
          <Entypo
            name="trash"
            size={sizeIcons}
            color={colorBaseIcons}
          />
        </TouchableOpacity>
      </View>
    )
}