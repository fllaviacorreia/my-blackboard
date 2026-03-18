import React, { useEffect } from "react";
import { Platform, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import * as NavigationBar from 'expo-navigation-bar';
import ModalPencilColors from "./ModalPencilColors";
import ModalBackgroundColor from "./ModalBackgroundColor";

import styles from "./styles";
import Toobar from "./Toobar";
import Canvas from "./Canvas";
import { DrawingProvider } from "./Context";

const App: React.FC = () => {
   useEffect(() => {
    if (Platform.OS === 'android') {
      NavigationBar.setVisibilityAsync('hidden');
      NavigationBar.setBehaviorAsync('inset-swipe');
    }
  }, []);

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
