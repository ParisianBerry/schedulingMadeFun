import { useTasks } from "@/app/state/TasksContext";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function TasksPage() {
  const { tasks } = useTasks();

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>All Tasks</Text>

      <FlatList
        data={tasks}
        keyExtractor={(t) => t.id}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.taskTitle}>{item.title}</Text>
            <Text style={styles.status}>{item.status.toUpperCase()}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No tasks yet.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 16, gap: 12 },
  title: { fontSize: 22, fontWeight: "700" },
  row: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    marginTop: 10,
  },
  taskTitle: { fontSize: 16 },
  status: { marginTop: 4, opacity: 0.6 },
  empty: { marginTop: 16, opacity: 0.6, textAlign: "center" },
});
