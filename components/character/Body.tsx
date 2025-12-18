import React from 'react';
import { StyleSheet, View } from "react-native";

interface BodyProps {
  isHappy: boolean;
}

const Body: React.FC<BodyProps> = ({ isHappy }) => {
  return (
     <View style={styles.container}>
      <View style={styles.stomach} />

      <View
        style={[
          styles.hand,
          isHappy && styles.handOnStomach, // 👈 conditional style
        ]}
      />
    </View>
  );
};


export default Body;


const styles = StyleSheet.create({
  container: {
    width: 120,
    height: 160,
    alignItems: "center",
    justifyContent: "center",
  },

  stomach: {
    width: 80,
    height: 60,
    backgroundColor: "#ffd6a5",
    borderRadius: 30,
  },

  hand: {
    width: 20,
    height: 50,
    backgroundColor: "#ffccaa",
    position: "absolute",
    right: 10,
    top: 50,
  },

  handOnStomach: {
    right: 40,
    top: 65,
    transform: [{ rotate: "-30deg" }],
  },
});