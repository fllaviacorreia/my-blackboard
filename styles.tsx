import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
      canvas: {
        flex: 1,
      },
    toolbar: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
      padding: 5,
      backgroundColor: "#cfcfcf",
    },
    toolbarButton: {
      width: 60,
      height: 40,
      borderRadius: 5,
      backgroundColor: "#bdbdbd",
      justifyContent: "center",
      alignItems: "center",
    },
    color: {
      width: 40,
      height: 40,
      borderRadius: 20,
      borderColor: "black",
      borderWidth: 2,
    },
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
      width: 350,
      padding: 20,
      backgroundColor: "white",
      borderRadius: 10,
      alignItems: "center",
    },
    modalTitle: {
      fontSize: 18,
      width: "100%",
      textAlign: "center",
      fontWeight: "bold",
      marginBottom: 20,
    },
    modalText: {
      fontSize: 16,
      marginTop: 10,
      width: 300,
      textAlign: "center",
    },
    colorPicker: {
      flexDirection: "row",
      width: "100%",
      justifyContent: "center",
      marginTop: 10,
    },
    colorOption: {
      width: 30,
      height: 30,
      borderRadius: 10,
      borderWidth: 1,
      marginHorizontal: 5,
    },
    slider: {
      width: 300,
      height: 60,
    },
    closeButton: {
      marginTop: 30,
      padding: 10,
      backgroundColor: "#ccc",
      borderRadius: 10,
      width: 120,
    },
    closeButtonText: {
      width: "100%", 
      textAlign: "center"
    }
  });

  export default styles;