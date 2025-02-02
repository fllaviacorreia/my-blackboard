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
      padding: 10,
      backgroundColor: "#ccc",
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
      fontWeight: "bold",
      marginBottom: 10,
    },
    modalText: {
      fontSize: 16,
      marginTop: 10,
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
      borderRadius: 20,
      marginHorizontal: 5,
    },
    slider: {
      width: 300,
      height: 40,
    },
    closeButton: {
      marginTop: 15,
      padding: 10,
      backgroundColor: "grey",
      borderRadius: 10,
    },
  });

  export default styles;