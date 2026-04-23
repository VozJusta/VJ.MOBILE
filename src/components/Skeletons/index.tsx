import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";
import { styles } from "./styles";
import { ISkeletonProps } from "@/interfaces/components/Skeletons";

export default function Skeletons({ ...props }: ISkeletonProps) {
  return (
    <MotiView
      transition={{
        type: "timing",
      }}
      style={styles.container}
      animate={{ backgroundColor: "transparent" }}
    >
      {Array.from({ length: props.amountOfSkeletons }).map((_, index) => (
        <Skeleton
          key={index}
          width={"100%"}
          height={props.height || 250}
          radius={25}
          colorMode="dark"
        />
      ))}
    </MotiView>
  );
}
