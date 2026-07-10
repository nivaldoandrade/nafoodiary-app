import { AppText, IAppTextProps } from "@/ui/components/AppText";
import { styles } from "@/ui/components/RadioGroup/styles";
import { theme } from "@/ui/styles/theme";
import { createContext, use, useState } from "react";
import { TouchableOpacity, TouchableOpacityProps, View, ViewProps } from "react-native";

interface IRadioGroupContextType {
  selectedValue: string | null;
  isHorizontal: boolean;
  onChange: (value: string) => void;
}

const RadioGroupContext = createContext({} as IRadioGroupContextType);

interface IRadioGroupProps extends ViewProps {
  isHorizontal?: boolean;
}

function RadioGroup({
  style,
  isHorizontal = false,
  ...props
}: IRadioGroupProps) {
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  console.log(selectedValue)

  const handleSelect = (value: string) => {
    setSelectedValue(value);
  };

  return (
    <RadioGroupContext.Provider value={{ selectedValue, onChange: handleSelect, isHorizontal }}>
      <View
        style={[
          styles.container,
          isHorizontal && styles.containerHorizontal,
          style
        ]}
        {...props}
      />
    </RadioGroupContext.Provider >
  )
}

interface IRadioGroupItemProps extends TouchableOpacityProps {
  value: string;
}

const RadioGroupItemContext = createContext({ isSelected: false });
function RadioGroupItem({
  style,
  value,
  ...props
}: IRadioGroupItemProps) {
  const { onChange, selectedValue, isHorizontal } = use(RadioGroupContext);
  const isSelected = selectedValue === value;

  return (
    <RadioGroupItemContext.Provider value={{ isSelected }}>
      <TouchableOpacity
        style={[
          styles.item,
          isHorizontal && styles.itemHorizontal,
          isSelected && styles.isSelectedItem,
          style
        ]}
        onPress={() => onChange(value)}
        {...props} />
    </RadioGroupItemContext.Provider>
  )
}

function RadioGroupItemIcon({ style, ...props }: IAppTextProps) {
  const { isSelected } = use(RadioGroupItemContext);

  return (
    <View style={[styles.icon, isSelected && styles.isSelectedIcon]}>
      <AppText style={style} {...props} />
    </View>
  )
}

function RadioGroupItemLabel({ style, ...props }: IAppTextProps) {
  const { isHorizontal } = use(RadioGroupContext);

  return (
    <AppText
      weight="semiBold"
      style={[
        style,
        isHorizontal && styles.textHorizontal
      ]}
      {...props}
    />
  )
}

function RadioGroupItemDescription({ style, ...props }: IAppTextProps) {
  const { isHorizontal } = use(RadioGroupContext);

  return (
    <AppText
      color={theme.colors.gray[700]}
      style={[
        style,
        isHorizontal && styles.textHorizontal
      ]}
      {...props}
    />
  )
}

function RadioGroupItemInfo({ style, ...props }: ViewProps) {
  return (
    <View style={[style]} {...props} />
  )
}


export {
  RadioGroup,
  RadioGroupItem, RadioGroupItemDescription,
  RadioGroupItemIcon, RadioGroupItemInfo, RadioGroupItemLabel
};

