import {
  StatusText,
} from "@/interfaces/components/FilterStatus";
import { ScrollView } from "react-native";
import FilterStatus from "../FilterStatus";
import { useState } from "react";
import { filters } from "./data";

export default function Filters() {
  const [statusSelected, setStatusSelected] = useState<StatusText>(
    StatusText.ALL,
  );

  return (
    <ScrollView
      contentContainerClassName="flex flex-row gap-2 h-fit mb-8"
      showsHorizontalScrollIndicator={false}
      horizontal
    >
      {filters.map((filter, index) => (
        <FilterStatus
          key={index}
          {...filter}
          statusSelected={statusSelected}
          onPress={(status) => setStatusSelected(status)}
        />
      ))}
    </ScrollView>
  );
}
