import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../components/Button";

const SPORTS = [
  "Tennis",
  "Water Polo",
  "Football",
  "Body Building",
  "Cycling",
  "Baseball",
  "Basketball",
  "Health",
  "Flighting Sports",
  "Fitness",
  "Track & Field",
  "Skiing",
  "Rhythmic",
  "Gymnastics",
  "Snowboard",
  "Sea Sports",
  "Swimming",
  "Cricket",
  "Volley Ball",
  "Hand Ball",
  "Rugby",
];

export default function FavoriteSportsScreen() {
  const [selected, setSelected] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const router = useRouter();

  const toggleSport = (sport: string) => {
    setSelected((prev) =>
      prev.includes(sport) ? prev.filter((s) => s !== sport) : [...prev, sport]
    );
  };

  const handleSubmit = () => {
    console.log("Selected sports:", selected);
    router.push("./image"); 
  };

  const filteredSports = SPORTS.filter((s) =>
    s.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Choose favorite sports</Text>
          <Text style={styles.description}>
            Your account is ready to use. Tell us more about you and help us
            better prepare content for you
          </Text>
        </View>

        <TextInput
          placeholder="Search your mind..."
          placeholderTextColor="#AAA"
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
        />

        <FlatList
          data={filteredSports}
          numColumns={3}
          keyExtractor={(item) => item}
          contentContainerStyle={styles.sportGrid}
          renderItem={({ item }) => {
            const isActive = selected.includes(item);
            return (
              <TouchableOpacity
                onPress={() => toggleSport(item)}
                style={[
                  styles.sportButton,
                  isActive && styles.sportButtonActive,
                ]}
              >
                <Text
                  style={[styles.sportText, isActive && styles.sportTextActive]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            );
          }}
        />

        <Button text="Send" onPress={handleSubmit} />
        <TouchableOpacity>
          <Text style={styles.skipText}>skip for now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#ddd",
  },
  container: {
    flex: 1,
    padding: 24,
  },
  headerContainer: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 30,
    marginBottom: 17,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 22,
    color: "#263238",
  },
  description: {
    textAlign: "center",
    fontSize: 12,
    color: "#aaa",
    marginBottom: 17,
  },
  searchInput: {
    backgroundColor: "#DDD",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginBottom: 20,
    fontSize: 14,
    color: "#AAA",
    borderColor: "#AAA",
    borderWidth: 1,
  },
  sportGrid: {
    justifyContent: "center",
    gap: 15,
  },
  sportButton: {
    backgroundColor: "#DDD",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
    margin: 5,
    borderColor: "#AAA",
    borderWidth: 1,
  },
  sportButtonActive: {
    backgroundColor: "#263238",
  },
  sportText: {
    fontSize: 12,
    color: "#000",
  },
  sportTextActive: {
    color: "#fff",
    fontWeight: "400",
  },
  skipText: {
    textAlign: "center",
    marginTop: 14,
    fontSize: 14,
    color: "#bbb",
  },
});
