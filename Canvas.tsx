import { StyleSheet, View } from "react-native";
import styles from "./styles";
import { DrawingContext } from "./Context";
import { useContext } from "react";
import Svg, { Path } from "react-native-svg";

export default function Canvas() {
    const {
        backgroundColor,
        paths,
        penColor,
        strokeWidth,
        isEraserActive,
        currentPath,
        handleTouchStart,
        handleTouchMove,
        handleTouchEnd,
    } = useContext(DrawingContext);

    return (
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
    );
}