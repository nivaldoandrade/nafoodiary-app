import { ImageStyle, TextStyle, ViewStyle } from 'react-native';

type StringToBoolean<T> = T extends 'true' | 'false' ? boolean : T;

type Variant = Record<string, Record<string, ViewStyle | TextStyle | ImageStyle>>

type DefaultVariants<TVariants extends Variant> = {
  [Variant in keyof TVariants]: StringToBoolean<keyof TVariants[Variant]> | undefined
}

type SelectedVariant<TVariants extends Variant> = {
  [Variant in keyof TVariants]?: StringToBoolean<keyof TVariants[Variant]>
}

interface ICreateVariants<TVariants extends Variant> {
  base?: ViewStyle | TextStyle | ImageStyle;
  variants: TVariants;
  defaultVariants: DefaultVariants<TVariants>;
}

const falsyToString = <T extends unknown>(value: T) =>
  typeof value === 'boolean' ? `${value}` : value === 0 ? '0' : value;

export function cva<TVariants extends Variant>({
  base = {},
  variants,
  defaultVariants,
}: ICreateVariants<TVariants>) {
  return (props?: SelectedVariant<TVariants>) => {

    const getVariantStyle = Object.keys(variants).map((variant: keyof typeof variants) => {
      const variantProp = props?.[variant as keyof typeof props];
      const defaultVariantProp = defaultVariants?.[variant];

      const variantKey = (falsyToString(variantProp) || falsyToString(defaultVariantProp)) as keyof (typeof variants)[typeof variant];

      return variants[variant][variantKey];
    });

    return Object.assign({}, base, ...getVariantStyle);
  };
}

export type VariantProps<T extends ReturnType<typeof cva>> = NonNullable<Parameters<T>[0]>;
