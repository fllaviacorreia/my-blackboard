import React, { createContext, useState, ReactNode, useEffect } from "react";
import { GestureResponderEvent } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { colorBaseIcons } from "./defaultValues";

interface DrawPath {
    path: string;
    color: string;
    width: number;
    colorFrom: "eraser" | "pencil";
}

interface DrawingContextType {
    paths: DrawPath[];
    currentPath: string;
    penColor: string;
    strokeWidth: number;
    backgroundColor: string;
    colorEraser: string;
    isEraserActive: boolean;
    showModalPencilSettings: boolean;
    showModalBackgroundSettings: boolean;
    setShowModalPencilSettings: (show: boolean) => void;
    setShowModalBackgroundSettings: (show: boolean) => void;
    setPenColor: (color: string) => void;
    setStrokeWidth: (width: number) => void;
    setBackgroundColor: (color: string) => void;
    toggleEraser: () => void;
    handleTouchStart: (e: GestureResponderEvent) => void;
    handleTouchMove: (e: GestureResponderEvent) => void;
    handleTouchEnd: () => void;
    clearCanvas: () => void;
    undoLastStroke: () => void;
}

export const DrawingContext = createContext<DrawingContextType>({
    paths: [],
    currentPath: "",
    backgroundColor: "black",
    penColor: "white",
    colorEraser: colorBaseIcons,
    strokeWidth: 6,
    isEraserActive: false,
    showModalPencilSettings: false,
    showModalBackgroundSettings: false,
    setShowModalPencilSettings: () => { },
    setShowModalBackgroundSettings: () => { },
    setPenColor: () => { },
    setStrokeWidth: () => { },
    setBackgroundColor: () => { },
    toggleEraser: () => { },
    handleTouchStart: () => { },
    handleTouchMove: () => { },
    handleTouchEnd: () => { },
    clearCanvas: () => { },
    undoLastStroke: () => { },
});

export const DrawingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [paths, setPaths] = useState<DrawPath[]>([]);
    const [currentPath, setCurrentPath] = useState<string>("");

    const [penColor, setPenColor] = useState<string>("white");
    const [strokeWidth, setStrokeWidth] = useState<number>(6);
    const [backgroundColor, setBackgroundColor] = useState<string>("black");

    const [isEraserActive, setIsEraserActive] = useState<boolean>(false);
    const [colorEraser, setColorEraser] = useState<string>(colorBaseIcons);

    const [showModalPencilSettings, setShowModalPencilSettings] = useState<boolean>(false);
    const [showModalBackgroundSettings, setShowModalBackgroundSettings] = useState<boolean>(false);

    
    const saveDrawing = async () => {
        try {
            const drawingData = JSON.stringify(paths);

            const settingsData = JSON.stringify({
                penColor,
                strokeWidth,
                backgroundColor,
                isEraserActive,
                colorEraser,
            });

            await AsyncStorage.setItem("@my-blackboard-savedDrawing", drawingData);
            await AsyncStorage.setItem("@my-blackboard-saveSettings", settingsData);

            console.log("Desenho salvo com sucesso!");
        } catch (error) {
            console.error("Erro ao salvar o desenho:", error);
        }
    };

   
    const loadDrawing = async () => {
        try {
            const savedData = await AsyncStorage.getItem("@my-blackboard-savedDrawing");
            const savedSettings = await AsyncStorage.getItem("@my-blackboard-saveSettings");
            if (savedData) {
                setPaths(JSON.parse(savedData));
                console.log("Desenho carregado com sucesso!");
            }

            if (savedSettings) {
                const settings = JSON.parse(savedSettings);
                setPenColor(settings.penColor);
                setStrokeWidth(settings.strokeWidth);
                setBackgroundColor(settings.backgroundColor);
                setIsEraserActive(settings.isEraserActive);
                setColorEraser(settings.colorEraser);
                console.log("Configurações carregadas com sucesso!");
            }
        } catch (error) {
            console.error("Erro ao carregar o desenho:", error);
        }
    };

    
    useEffect(() => {
        loadDrawing();
    }, []);

    
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
                colorFrom: isEraserActive ? "eraser" : "pencil",
            },
        ]);
        saveDrawing();
        setCurrentPath("");
    };

    const clearCanvas = () => {
        setPaths([]);
        AsyncStorage.removeItem("@my-blackboard-savedDrawing"); // Remove o desenho salvo ao limpar
    };

    const undoLastStroke = () => {
        setPaths((prev) => prev.slice(0, -1));
    };

    const toggleEraser = () => {
        setColorEraser((prev) => (prev === colorBaseIcons ? "green" : colorBaseIcons));
        setIsEraserActive((prev) => !prev);
    };

    return (
        <DrawingContext.Provider
            value={{
                paths,
                currentPath,
                penColor,
                strokeWidth,
                backgroundColor,
                colorEraser,
                isEraserActive,
                showModalPencilSettings,
                showModalBackgroundSettings,
                setShowModalPencilSettings,
                setShowModalBackgroundSettings,
                setPenColor,
                setStrokeWidth,
                setBackgroundColor,
                toggleEraser,
                handleTouchStart,
                handleTouchMove,
                handleTouchEnd,
                clearCanvas,
                undoLastStroke,
            }}
        >
            {children}
        </DrawingContext.Provider>
    );
};
