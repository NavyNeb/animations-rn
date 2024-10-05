import { ScrollView, ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const Container = ({ children, style, ...otherProps }: { children: React.ReactNode, style?: ViewStyle, otherProps?: ScrollView['props'] }) => {
  const { top } = useSafeAreaInsets();

  return (
    <ScrollView
      style={[{ paddingHorizontal: 14, flex: 1,  }, style]}
      contentContainerStyle={{
        paddingBottom: 40,
        paddingTop: top,
        position: 'relative'
      }}
      showsVerticalScrollIndicator={false}
      {...otherProps}
    >
    
          {children}
    </ScrollView>
  );
};
