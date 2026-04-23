import { ScrollView } from "react-native";
import FilterStatus from "../FilterStatus";
import { filters } from "./data";
import { IFiltersProps } from "@/interfaces/components/Filters";

export default function Filters({ ...props }: IFiltersProps) {
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
          amount={filter.status ? props.amounts[filter.status] : props.amounts.total}
          statusSelected={props.statusSelected}
          onPress={(status) => props.onFilterChange(status)}
        />
      ))}
    </ScrollView>
  );
}
