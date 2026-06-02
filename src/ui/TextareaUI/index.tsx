import { TextInput, TextInputProps } from "react-native";

interface TextAreaProps extends TextInputProps {
  isMenuOpen: boolean;
}
export default function TextArea(
  { isMenuOpen, ...props }: TextAreaProps,
) {
  return (
    <TextInput
      {...props}
      textAlignVertical="top"
      className=" text-white w-full min-h-[200px] p-5 border border-solid border-white/10 bg-[rgba(255,255,255,0.03)] rounded-[16px] text-[16px] font-interRegular"
      placeholderTextColor={"#64748B"}
      placeholderClassName="text-[16px] font-interRegular"
      multiline={true}
      editable={!isMenuOpen}
    />
  );
}
