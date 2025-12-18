import type { Task } from "@/types/task";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useMemo, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";

type BodyProps = {
  task?: Task | null;
  size?: number; // overall scale
};

export default function Body({ task = null, size = 220 }: BodyProps) {
  const ate = task?.status === "done";

  // Animation value: 0 = idle, 1 = "hand on stomach/chest"
  const armPose = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(armPose, {
      toValue: ate ? 1 : 0,
      friction: 7,
      tension: 80,
      useNativeDriver: true,
    }).start();
  }, [ate, armPose]);

  const d = useMemo(() => {
    const torsoW = size * 0.62;
    const torsoH = size * 0.78;
    const neckW = torsoW * 0.22;
    const neckH = torsoH * 0.10;

    const armW = torsoW * 0.16;
    const armH = torsoH * 0.52;

    const handW = armW * 1.05;
    const handH = armW * 0.95;

    return {
      torsoW,
      torsoH,
      neckW,
      neckH,
      armW,
      armH,
      handW,
      handH,
      radius: torsoW * 0.18,
      stroke: Math.max(2, Math.round(size * 0.012)),
    };
  }, [size]);

  // Right arm moves/rotates into “hand on stomach/chest”
  const rightArmTranslateX = armPose.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -d.torsoW * 0.18],
  });
  const rightArmTranslateY = armPose.interpolate({
    inputRange: [0, 1],
    outputRange: [0, d.torsoH * 0.12],
  });
  const rightArmRotate = armPose.interpolate({
    inputRange: [0, 1],
    outputRange: ["14deg", "-55deg"],
  });

  // Optional little “squeeze” on the belly when ate
  const bellyScaleY = armPose.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.03],
  });

  return (
    <View style={[styles.stage, { width: size, height: size }]}>
      {/* Torso + polo */}
      <Animated.View style={{ transform: [{ scaleY: bellyScaleY }] }}>
        <LinearGradient
          colors={["#1E63D6", "#0B3E9F", "#062D7D"]}
          start={{ x: 0.15, y: 0.1 }}
          end={{ x: 0.85, y: 0.95 }}
          style={[
            styles.torso,
            {
              width: d.torsoW,
              height: d.torsoH,
              borderRadius: d.radius,
              borderWidth: d.stroke,
            },
          ]}
        >
          {/* Subtle fabric highlight */}
          <View
            style={[
              styles.highlight,
              {
                width: d.torsoW * 0.32,
                height: d.torsoH * 0.75,
                borderRadius: d.torsoW * 0.2,
                left: d.torsoW * 0.10,
                top: d.torsoH * 0.10,
              },
            ]}
          />

          {/* Polo collar */}
          <View
            style={[
              styles.collarWrap,
              {
                width: d.torsoW * 0.56,
                height: d.torsoH * 0.22,
                top: d.torsoH * 0.03,
              },
            ]}
          >
            <LinearGradient
              colors={["#0A3B96", "#072F78"]}
              start={{ x: 0.0, y: 0.2 }}
              end={{ x: 1.0, y: 1.0 }}
              style={[styles.collar, { borderWidth: d.stroke }]}
            />
            <View
              style={[
                styles.placket,
                {
                  width: d.torsoW * 0.13,
                  height: d.torsoH * 0.28,
                  top: d.torsoH * 0.07,
                  borderRadius: d.torsoW * 0.06,
                },
              ]}
            />
            {/* Buttons */}
            <View
              style={[
                styles.button,
                {
                  top: d.torsoH * 0.14,
                  width: d.torsoW * 0.03,
                  height: d.torsoW * 0.03,
                  borderRadius: d.torsoW * 0.015,
                },
              ]}
            />
            <View
              style={[
                styles.button,
                {
                  top: d.torsoH * 0.19,
                  width: d.torsoW * 0.03,
                  height: d.torsoW * 0.03,
                  borderRadius: d.torsoW * 0.015,
                },
              ]}
            />
          </View>

          {/* Belly shading (gives volume) */}
          <LinearGradient
            colors={["rgba(0,0,0,0.0)", "rgba(0,0,0,0.22)"]}
            start={{ x: 0.5, y: 0.2 }}
            end={{ x: 0.5, y: 1 }}
            style={[
              styles.bellyShade,
              {
                width: d.torsoW * 0.86,
                height: d.torsoH * 0.62,
                bottom: d.torsoH * 0.05,
                borderRadius: d.radius * 0.9,
              },
            ]}
          />
        </LinearGradient>

        {/* Neck */}
        <LinearGradient
          colors={["#F6C2A0", "#E9A983"]}
          start={{ x: 0.2, y: 0.2 }}
          end={{ x: 0.8, y: 1 }}
          style={[
            styles.neck,
            {
              width: d.neckW,
              height: d.neckH,
              top: -d.neckH * 0.65,
              borderRadius: d.neckW * 0.45,
              borderWidth: d.stroke,
            },
          ]}
        />
      </Animated.View>

      {/* Left arm (idle) */}
      <View
        style={[
          styles.armAnchor,
          {
            left: (size - d.torsoW) / 2 - d.armW * 0.55,
            top: (size - d.torsoH) / 2 + d.torsoH * 0.22,
          },
        ]}
      >
        <LinearGradient
          colors={["#F7C7A3", "#EAAE86"]}
          start={{ x: 0.2, y: 0.1 }}
          end={{ x: 0.8, y: 1 }}
          style={[
            styles.arm,
            {
              width: d.armW,
              height: d.armH,
              borderRadius: d.armW * 0.55,
              borderWidth: d.stroke,
              transform: [{ rotate: "-12deg" }],
            },
          ]}
        />
        <View
          style={[
            styles.hand,
            {
              width: d.handW,
              height: d.handH,
              borderRadius: d.handW * 0.5,
              borderWidth: d.stroke,
              top: d.armH * 0.78,
              left: -d.handW * 0.10,
              transform: [{ rotate: "-8deg" }],
            },
          ]}
        />
      </View>

      {/* Right arm (animated to “hand on stomach/chest”) */}
      <Animated.View
        style={[
          styles.armAnchor,
          {
            right: (size - d.torsoW) / 2 - d.armW * 0.55,
            top: (size - d.torsoH) / 2 + d.torsoH * 0.22,
            transform: [
              { translateX: rightArmTranslateX },
              { translateY: rightArmTranslateY },
              { rotate: rightArmRotate },
            ],
          },
        ]}
      >
        <LinearGradient
          colors={["#F7C7A3", "#EAAE86"]}
          start={{ x: 0.2, y: 0.1 }}
          end={{ x: 0.8, y: 1 }}
          style={[
            styles.arm,
            {
              width: d.armW,
              height: d.armH,
              borderRadius: d.armW * 0.55,
              borderWidth: d.stroke,
            },
          ]}
        />
        <View
          style={[
            styles.hand,
            {
              width: d.handW,
              height: d.handH,
              borderRadius: d.handW * 0.5,
              borderWidth: d.stroke,
              top: d.armH * 0.78,
              left: -d.handW * 0.08,
            },
          ]}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  stage: {
    alignItems: "center",
    justifyContent: "center",
  },

  torso: {
    alignItems: "center",
    justifyContent: "flex-start",
    borderColor: "rgba(0,0,0,0.65)",
    shadowColor: "#000",
    shadowOpacity: 0.28,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 14 },
    elevation: 10,
  },

  highlight: {
    position: "absolute",
    backgroundColor: "rgba(255,255,255,0.10)",
    transform: [{ rotate: "-10deg" }],
  },

  collarWrap: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  collar: {
    width: "100%",
    height: "100%",
    borderRadius: 999,
    borderColor: "rgba(0,0,0,0.55)",
    opacity: 0.96,
  },
  placket: {
    position: "absolute",
    backgroundColor: "rgba(255,255,255,0.10)",
  },
  button: {
    position: "absolute",
    left: "50%",
    marginLeft: -9999, // overwritten by RN? (we'll set via translate style below if needed)
    backgroundColor: "rgba(255,255,255,0.85)",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.25)",
    transform: [{ translateX: -4 }], // keeps it near center visually
  },

  bellyShade: {
    position: "absolute",
  },

  neck: {
    position: "absolute",
    borderColor: "rgba(0,0,0,0.55)",
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },

  armAnchor: {
    position: "absolute",
  },
  arm: {
    backgroundColor: "transparent",
    borderColor: "rgba(0,0,0,0.55)",
    shadowColor: "#000",
    shadowOpacity: 0.22,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },
  hand: {
    position: "absolute",
    backgroundColor: "#F7C7A3",
    borderColor: "rgba(0,0,0,0.55)",
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
});
