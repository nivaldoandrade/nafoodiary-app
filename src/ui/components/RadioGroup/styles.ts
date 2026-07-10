import { theme } from "@/ui/styles/theme";
import { StyleSheet } from "react-native";



export const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  containerHorizontal: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  item: {
    alignItems: 'center',
    gap: 16,
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: theme.colors.gray[300],
    borderStyle: 'solid'
  },
  itemHorizontal: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingVertical: 32,
    paddingHorizontal: 16
  },
  isSelectedItem: {
    backgroundColor: theme.colors.lime["700/10"],
    borderColor: theme.colors.lime[700]
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: theme.colors.gray[200]
  },
  isSelectedIcon: {
    backgroundColor: theme.colors["white/40"]
  },
  textHorizontal: {
    textAlign: 'center'
  }
});
