import React, { useContext, useState } from "react";
import { View, StyleSheet, GestureResponderEvent, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import { DrawPath } from "./defaultValues";

import ModalPencilColors from "./ModalPencilColors";
import ModalBackgroundColor from "./ModalBackgroundColor";

import styles from "./styles";
import Toobar from "./Toobar";
import Canvas from "./Canvas";
import { DrawingContext, DrawingProvider } from "./Context";

const App: React.FC = () => {

  return (
    <DrawingProvider>
      <View 
        style={styles.container} 
        onStartShouldSetResponder={() => true}
        onMoveShouldSetResponder={() => true} 
      >
        <Canvas />
        <Toobar />
        <ModalPencilColors />
        <ModalBackgroundColor />
        <StatusBar style="auto" />
      </View>
    </DrawingProvider>

  );
};


export default App;
