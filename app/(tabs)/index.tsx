import Body from "@/components/character/Body";
import Face from "@/components/character/Face";
import type { Task } from "@/types/task";
import { completeTask, createTask } from "@/utils/task";
import { useEffect, useMemo, useRef, useState } from "react";
import { Animated, Button, FlatList, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function HomeScreen() {
  // Face bounce (always)
  const bounce = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.spring(bounce, { toValue: 1.05, friction: 4, useNativeDriver: true }),
        Animated.spring(bounce, { toValue: 1, friction: 4, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  // Tasks
  const [title, setTitle] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [givenTaskId, setGivenTaskId] = useState<string | null>(null);

  const givenTask = useMemo(
    () => tasks.find(t => t.id === givenTaskId) ?? null,
    [tasks, givenTaskId]
  );

  function addTask() {
    const t = title.trim();
    if (!t) return;
    setTasks(prev => [createTask(t), ...prev]);
    setTitle("");
  }

  function markDone(id: string) {
    setTasks(prev => prev.map(t => (t.id === id ? completeTask(t) : t)));
  }

  function giveToFace(id: string) {
    // only allow done tasks to be "given"
    const t = tasks.find(x => x.id === id);
    if (t?.status === "done") setGivenTaskId(id);
  }

  return (
    <View style={styles.screen}>
        <Text style={styles.faceLabel}>
          {givenTask ? `Given: ${givenTask.title}` : "Give a DONE task to the face"}
        </Text>
      {/* Face centered */}
      <View style={styles.faceArea}>
        <Animated.View style={{ transform: [{ scale: bounce }] }}>
          <Face task={givenTask} />
        </Animated.View>

        <View>
          <Body task={givenTask} size={240} />
        </View>
      </View>
      
      {/* Create task */}
      <View style={styles.row}>
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="New task..."
          style={styles.input}
          returnKeyType="done"
          onSubmitEditing={addTask}
        />
        <Button title="Add" onPress={addTask} />
      </View>

      {/* List tasks */}
      <FlatList
        data={tasks}
        keyExtractor={(t) => t.id}
        contentContainerStyle={{ paddingBottom: 24 }}
        renderItem={({ item }) => (
          <View style={styles.taskRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.taskTitle}>{item.title}</Text>
              <Text style={styles.taskMeta}>{item.status.toUpperCase()}</Text>
            </View>

            {item.status !== "done" ? (
              <Button title="Done" onPress={() => markDone(item.id)} />
            ) : (
              <Pressable onPress={() => giveToFace(item.id)} style={styles.giveBtn}>
                <Text style={styles.giveBtnText}>Give</Text>
              </Pressable>
            )}
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No tasks yet. Add one!</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 16, gap: 12 },
  faceArea: { alignItems: "center", justifyContent: "center", paddingVertical: 10, gap: 8 },
  faceLabel: { fontSize: 12, opacity: 0.7 },

  row: { flexDirection: "row", gap: 10, alignItems: "center" },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },

  taskRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: 12,
    marginTop: 10,
  },
  taskTitle: { fontSize: 16 },
  taskMeta: { fontSize: 12, opacity: 0.6 },

  giveBtn: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#333",
  },
  giveBtnText: { fontWeight: "600" },

  empty: { marginTop: 16, opacity: 0.6, textAlign: "center" },
});
