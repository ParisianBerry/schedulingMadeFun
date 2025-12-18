import { useTasks } from "@/app/state/TasksContext";
import { useState } from "react";
import { Button, FlatList, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function TaskList() {
  const { tasks, addTask, markDone } = useTasks();
  const [title, setTitle] = useState("");

  const onAdd = () => {
    addTask(title);
    setTitle("");
  };

  return (
    <View style={styles.wrap}>
      {/* Add task row */}
      <View style={styles.row}>
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="New task..."
          style={styles.input}
          returnKeyType="done"
          onSubmitEditing={onAdd}
        />
        <Button title="Add" onPress={onAdd} />
      </View>

      {/* Tasks list */}
      <FlatList
        data={tasks}
        keyExtractor={(t) => t.id}
        renderItem={({ item }) => (
          <View style={styles.taskRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.taskTitle}>{item.title}</Text>
              <Text style={styles.taskMeta}>{item.status.toUpperCase()}</Text>
            </View>

            {item.status === "todo" ? (
              <Button title="Done" onPress={() => markDone(item.id)} />
            ) : (
              <Pressable style={styles.donePill}>
                <Text style={styles.donePillText}>DONE</Text>
              </Pressable>
            )}
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No tasks yet.</Text>}
        contentContainerStyle={{ paddingBottom: 16 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: 12 },
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

  donePill: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#333",
  },
  donePillText: { fontWeight: "700" },

  empty: { marginTop: 12, opacity: 0.6, textAlign: "center" },
});
