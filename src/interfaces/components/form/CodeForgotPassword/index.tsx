export function CodeForgotPassword() {
  return (
    <>
      <View className="gap-[16px] items-center justify-center mb-[40px]">
        <View className="w-[64px] h-[64px] flex justify-center items-center bg-[rgba(19,91,236,0.1)] rounded-full">
          <Shield width={30} height={36} />
        </View>
        <Text className="font-interBold text-[24px] text-white text-center">
          {resolvedCodeTitle}
        </Text>
        <Text className="font-interRegular text-[14px] px-[30.5px] text-[#94A3B8] text-center">
          {resolvedCodeDescription}
        </Text>
      </View>

      <InputUI
        inputOTP
        onChangeText={(value) => setCodeChange(value)}
        onFilledOTP={(value) => {
          setCodeChange(value);
          if (pathName.includes("/screens/auth/Validate")) {
            handleValidateCode(props.email, value, token ? token : "");
          } else if (pathName.includes("/screens/auth/ForgotPassword/Code")) {
            handleValidateCodeForgotPassword(emailStorage, value);
          }
        }}
        placeholder={""}
        iconSize={0}
        iconNameProps={"sort"}
        type={"email"}
      />
      <Text className="font-inter text-[12px] text-[rgba(96,165,250,0.8)]">
        O código expira em{" "}
        <Text className="font-interBold"> {timerLabel} </Text>
      </Text>
      <View className="w-full pb-[16px]">
        <ButtonUI
          onPress={() => {
            if (pathName.includes("/screens/auth/Validate")) {
              handleValidateCode(props.email, codeAuth, token ? token : "");
            } else if (pathName.includes("/screens/auth/ForgotPassword/Code")) {
              handleValidateCodeForgotPassword(emailStorage, codeAuth);
            }
          }}
          gradient={false}
          bg="bg-[#135BEC]"
          hover={false}
          size="w-full h-[56px]"
          children={
            <View className="flex-1 justify-center items-center">
              <Text className="text-[16px] font-interBold text-white">
                {resolvedVerifyButtonLabel}
              </Text>
            </View>
          }
          iconLeft={false}
          paddingButtonStatus={""}
        />
      </View>
    </>
  );
}
