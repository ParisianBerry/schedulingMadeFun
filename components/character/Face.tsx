import type { Task } from "@/types/task";
import { StyleSheet, View } from "react-native";

export type FaceExpression = "happy" | "neutral" | "angry";

type FaceProps = {
  expression?: FaceExpression;
  task?: Task | null;
  size?: number;
};

export default function Face({
  expression = "neutral",
  task = null,
  size = 90,
}: FaceProps) {
  // Task overrides expression
  const mood: FaceExpression =
    task?.status === "done" ? "happy" : expression;

  const eyeSize = size * 0.08;
  const mouthWidth = size * 0.4;
  const mouthHeight = size * 0.07;

  return (
    <View
      style={[
        styles.face,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
        },
      ]}
    >
      {/* Eyes */}
      <View
        style={[
          styles.eye,
          {
            width: eyeSize,
            height: eyeSize,
            borderRadius: eyeSize / 2,
            left: size * 0.28,
            top: size * 0.32,
          },
        ]}
      />
      <View
        style={[
          styles.eye,
          {
            width: eyeSize,
            height: eyeSize,
            borderRadius: eyeSize / 2,
            right: size * 0.28,
            top: size * 0.32,
          },
        ]}
      />

      {/* Mouth */}
      <View
        style={[
          styles.mouth,
          {
            width: mouthWidth,
            height:
              mood === "happy" ? mouthHeight * 2 : mouthHeight,
            left: (size - mouthWidth) / 2,
            bottom: size * 0.25,
            borderRadius:
              mood === "happy" ? mouthHeight * 2 : mouthHeight,
          },
          mood === "angry" && styles.mouthAngry,
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  face: {
    backgroundColor: "#F7C7A3",
    borderWidth: 2,
    borderColor: "#222",
  },

  eye: {
    position: "absolute",
    backgroundColor: "#111",
  },

  mouth: {
    position: "absolute",
    backgroundColor: "#111",
  },

  mouthAngry: {
    transform: [{ rotate: "-10deg" }],
  },
});
