import React, { useState } from "react";
import { View, StyleSheet, GestureResponderEvent } from "react-native";
import Svg, { Path } from "react-native-svg";
import Entypo from '@expo/vector-icons/Entypo';
import { StatusBar } from "expo-status-bar";
import { DrawPath, sizeIcons } from "./defaultValues";

import ModalPencilColors  from "./ModalPencilColors";
import ModalBackgroundColor from "./ModalBackgroundColor";

import styles from "./styles";

const App: React.FC = () => {
  // paths 
  const [paths, setPaths] = useState<DrawPath[]>([]);
  const [currentPath, setCurrentPath] = useState<string>("");
  // pecnil
  const [penColor, setPenColor] = useState<string>("white");
  const [strokeWidth, setStrokeWidth] = useState<number>(6);
  const [showSettingsPencil, setShowSettingsPencil] = useState<boolean>(false);
  // background 
  const [backgroundColor, setBackgroundColor] = useState<string>("black");
  const [showSettingsBackground, setShowSettingsBackground] = useState<boolean>(false);
  // eraser
  const [isEraserActive, setIsEraserActive] = useState<boolean>(false);
  const [colorEraser, setColorEraser] = useState<string>("black");

  const handleTouchStart = (e: GestureResponderEvent) => {
    const { locationX, locationY } = e.nativeEvent;
    setCurrentPath(`M ${locationX} ${locationY}`);
  };

  const handleTouchMove = (e: GestureResponderEvent) => {
    const { locationX, locationY } = e.nativeEvent;
    setCurrentPath((prev) => `${prev} L ${locationX} ${locationY}`);
  };

  const handleTouchEnd = () => {
    setPaths((prev) => [
      ...prev,
      { 
        path: currentPath, 
        color: isEraserActive ? backgroundColor : penColor, 
        width: isEraserActive ? 20 : strokeWidth, 
        colorFrom: isEraserActive ? "eraser" : "pencil"
      }
    ]);
    setCurrentPath("");
  };
  

  const clearCanvas = () => {
    setPaths([]);
  }

  const undoLastStroke = () => {
    setPaths((prev) => prev.slice(0, -1)); // Remove o último item do array
  };

  const toggleEraser = () => {
    if (isEraserActive) {
      setColorEraser("black");
    } else {
      setColorEraser("green");
    }
    setIsEraserActive(!isEraserActive);
  };  

  return (
    <View style={styles.container}>
      <View style={[styles.canvas, { backgroundColor: backgroundColor }]}>
        <View
          style={styles.canvas}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <Svg style={StyleSheet.absoluteFill}>
            {paths.map((p, index) => (
              <Path 
                key={index} 
                d={p.path} 
                stroke={p.colorFrom === "eraser" ? backgroundColor : p.color} 
                strokeWidth={p.width} 
                fill="none" 
              />
            ))}
            <Path 
              d={currentPath} 
              stroke={isEraserActive ? backgroundColor : penColor} 
              strokeWidth={strokeWidth} 
              fill="none" 
            />
          </Svg>
        </View>
      </View>
      <View style={styles.toolbar} >
        <Entypo 
          name="back-in-time" 
          size={sizeIcons} 
          color="black" 
          onPress={undoLastStroke} 
        />
        <Entypo 
          name="pencil" 
          size={sizeIcons} 
          color={penColor} 
          onPress={() => setShowSettingsPencil(true)} 
        />
        <Entypo 
          name="blackboard" 
          size={sizeIcons} 
          color={backgroundColor} 
          onPress={() => setShowSettingsBackground(true)} 
        />
        <Entypo 
          name="eraser" 
          size={sizeIcons} 
          color={colorEraser} 
          onPress={toggleEraser} 
        />
        <Entypo 
          name="trash" 
          size={sizeIcons} 
          color="black" 
          onPress={clearCanvas} 
        />
      </View>
      <ModalPencilColors 
        setPenColor={setPenColor} 
        showSettingsPencil={showSettingsPencil} 
        setShowSettingsPencil={setShowSettingsPencil} 
        strokeWidth={strokeWidth} 
        setStrokeWidth={setStrokeWidth} 
      />
      <ModalBackgroundColor 
        setBackgroundColor={setBackgroundColor} 
        visibleModal={showSettingsBackground} 
        setVisibleModal={setShowSettingsBackground} 
      />
      <StatusBar style={backgroundColor === "black" ? "light" : "dark"} />
    </View>
  );
};


export default App;
