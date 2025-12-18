import type { Task } from "@/types/task";
import { StyleSheet, View } from "react-native";

export type FaceExpression = "happy" | "neutral" | "angry";

interface FaceProps {
  expression?: FaceExpression; // optional now
  task?: Task | null;          // 👈 new
  size?: number;
}

export default function Face({ expression = "neutral", task = null, size = 60 }: FaceProps) {
  // If you "give" a done task to the face -> happy
  const derived: FaceExpression = task?.status === "done" ? "happy" : expression;

  return (
    <View style={[styles.face, { width: size, height: size }]}>
      <View style={[styles.eye, styles.leftEye]} />
      <View style={[styles.eye, styles.rightEye]} />
      <View style={[styles.mouth, mouthStyles[derived]]} />
    </View>
  );
}

const styles = StyleSheet.create({
  face: {
    backgroundColor: "#ffccaa",
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
  },
  eye: {
    position: "absolute",
    top: "30%",
    width: 6,
    height: 6,
    backgroundColor: "black",
    borderRadius: 3,
  },
  leftEye: { left: "30%" },
  rightEye: { right: "30%" },
  mouth: {
    position: "absolute",
    bottom: "25%",
    width: 20,
    height: 4,
    backgroundColor: "black",
    borderRadius: 4,
  },
});

const mouthStyles = StyleSheet.create({
  happy: {
    height: 8,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  neutral: { height: 4 },
  angry: { width: 14 },
});
