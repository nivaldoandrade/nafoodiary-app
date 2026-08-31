import { useAccount } from '@/app/hooks/queries/useAccount';
import { AppText } from '@/ui/components/AppText';
import { ButtonApp } from '@/ui/components/Button';
import { FormGroup } from '@/ui/components/FormGroup';
import { InputApp } from '@/ui/components/Input';
import { EditGoalSchema, editGoalsSchema } from '@/ui/screens/editGoals/schema';
import { styles } from '@/ui/screens/editGoals/styles';
import { HeaderApp } from '@/ui/screens/home/components/HeaderApp';
import { theme } from '@/ui/styles/theme';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFocusEffect } from '@react-navigation/native';
import * as SystemUI from 'expo-system-ui';
import { useCallback, useState } from 'react';
import { Control, Controller, FieldValues, Path, useForm } from 'react-hook-form';
import { Platform, View } from 'react-native';
import { KeyboardAwareScrollView, KeyboardStickyView } from 'react-native-keyboard-controller';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function EditGoals() {
  const [footerHeight, setFooterHeight] = useState(0);
  const { account } = useAccount({ enabled: false });
  const { top, bottom } = useSafeAreaInsets();

  const { control } = useForm<EditGoalSchema>({
    defaultValues: {
      calories: account?.goal.calories,
      carbohydrates: account?.goal.carbohydrates,
      proteins: account?.goal.proteins,
      fats: account?.goal.fats,
    },
    resolver: zodResolver(editGoalsSchema),
  });

  useFocusEffect(
    useCallback(() => {
      if (!(Platform.OS === 'web')) {
        return;
      }

      SystemUI.setBackgroundColorAsync(null);

    }, []),
  );

  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <KeyboardAwareScrollView
        bottomOffset={footerHeight}
      >
        <HeaderApp title='Suas Metas' />
        <View style={styles.content}>
          <GoalInputField
            name='calories'
            control={control}
            label='Calorias'
            placeholder='2000'
            unit='kcal'
          />
          <GoalInputField
            name='carbohydrates'
            control={control}
            label='Carboidratos'
            placeholder='200'
            unit='g'
          />
          <GoalInputField
            name='proteins'
            control={control}
            label='Proteínas'
            placeholder='175'
            unit='g'
          />
          <GoalInputField
            name='fats'
            control={control}
            label='Gorduras'
            placeholder='56'
            unit='g'
          />
        </View>
      </KeyboardAwareScrollView>
      <KeyboardStickyView
        onLayout={(e) => setFooterHeight(e.nativeEvent.layout.height + bottom)}
        offset={{ opened: 10 }}
        style={{ backgroundColor: theme.colors.white }}
      >
        <View style={[styles.footer, { paddingBottom: bottom }]}>
          <ButtonApp
            intent='neutral'
            style={{ flex: 1 }}
            onPress={() => console.log('Cancelar')}
          >
            Cancelar
          </ButtonApp>
          <ButtonApp
            style={{ flex: 1 }}
            onPress={() => console.log('salvar')}
          >
            Salvar
          </ButtonApp>
        </View>
      </KeyboardStickyView>
    </View >
  );
}

type GoalInputFieldProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label: string;
  unit: string;
  placeholder?: string;
};

function GoalInputField<T extends FieldValues>({
  name,
  control,
  label,
  unit,
  placeholder,
}: GoalInputFieldProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <View style={styles.inputGroup}>
          <FormGroup
            label={label}
            error={fieldState.error?.message}
            style={{ flex: 1 }}
          >
            <InputApp
              placeholder={placeholder}
              inputMode='numeric'
              onChangeText={field.onChange}
              value={String(field.value)}
              returnKeyType='default'
            />
          </FormGroup>
          <AppText
            color={theme.colors.gray[700]}
            style={styles.unit}
          >
            {unit}
          </AppText>
        </View>
      )}
    />
  );
}
