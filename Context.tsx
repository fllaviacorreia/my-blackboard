import React, { createContext, useState, ReactNode, useEffect, useRef } from "react";
import { GestureResponderEvent, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { colorBaseIcons } from "./defaultValues";
import { captureRef } from "react-native-view-shot";
import * as MediaLibrary from "expo-media-library";

interface DrawPath {
    path: string;
    color: string;
    width: number;
    colorFrom: "eraser" | "pencil";
    isDot: boolean;
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
      saveToGallery: () => Promise<void>;
  canvasRef: React.RefObject<View | null>;
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
    saveToGallery: async () => { },
    canvasRef: React.createRef<View>(),
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

    const canvasRef = useRef<View | null>(null);

  const saveToGallery = async () => {
    try {
      // 1) Permissão
      const  status  = await MediaLibrary.requestPermissionsAsync();
      if (!status.granted) {
        console.warn("Permissão para acessar a biblioteca de mídia não concedida.");
        return;
      }

      // 2) Capturar a view do canvas
      if (!canvasRef.current) {
        console.warn("Canvas ref não está pronto.");
        return;
      }

      const uri = await captureRef(canvasRef, {
        format: "png",
        quality: 1,
      });

      // 3) Salvar na galeria (opcional: criar álbum “Blackboard”)
      const asset = await MediaLibrary.createAssetAsync(uri);
      try {
        await MediaLibrary.createAlbumAsync("MyBlackboard", asset, false);
      } catch {
        // Se o álbum já existir, apenas segue
      }

      console.log("Imagem salva:", uri);
    } catch (error) {
      console.error("Erro ao salvar a imagem:", error);
    }
  };


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
            }

            if (savedSettings) {
                const settings = JSON.parse(savedSettings);
                setPenColor(settings.penColor);
                setStrokeWidth(settings.strokeWidth);
                setBackgroundColor(settings.backgroundColor);
                setIsEraserActive(settings.isEraserActive);
                setColorEraser(settings.colorEraser);
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
                width: strokeWidth,
                colorFrom: isEraserActive ? "eraser" : "pencil",
                isDot: !currentPath.includes("L"), // Indica que é um traço normal
            }
        ]);

        setCurrentPath("");
        saveDrawing();
    };

    const clearCanvas = () => {
        setPaths([]);
        AsyncStorage.removeItem("@my-blackboard-savedDrawing"); // Remove o desenho salvo ao limpar
    };

    const undoLastStroke = () => {
        setPaths((prev) => prev.slice(0, -1));
        saveDrawing();
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
        saveToGallery,
        canvasRef
            }}
        >
            {children}
        </DrawingContext.Provider>
    );
};
