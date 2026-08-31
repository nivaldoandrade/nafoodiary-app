import { ApiError, getErrorMessage } from '@/app/errors/apiErrors';
import { useUpdateGoal } from '@/app/hooks/mutations/useUpdateGoal';
import { useAccount } from '@/app/hooks/queries/useAccount';
import { AppStackNavigatorProps } from '@/app/navigation/AppStack';
import { ButtonApp } from '@/ui/components/Button';
import { GoalInputField } from '@/ui/screens/editGoals/components/GoalInputField';
import { EditGoalSchema, editGoalsSchema } from '@/ui/screens/editGoals/schema';
import { styles } from '@/ui/screens/editGoals/styles';
import { HeaderApp } from '@/ui/screens/home/components/HeaderApp';
import { theme } from '@/ui/styles/theme';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { isAxiosError } from 'axios';
import * as SystemUI from 'expo-system-ui';
import { useCallback, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Platform, View } from 'react-native';
import { KeyboardAwareScrollView, KeyboardStickyView } from 'react-native-keyboard-controller';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function EditGoals() {
  const [footerHeight, setFooterHeight] = useState(0);

  const { goBack } = useNavigation<AppStackNavigatorProps>();
  const { account } = useAccount({ enabled: false });
  const { top, bottom } = useSafeAreaInsets();
  const { isPending, updateGoal } = useUpdateGoal();

  const form = useForm<EditGoalSchema>({
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

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      await updateGoal(data);
      goBack();
    } catch (error) {
      if (isAxiosError<ApiError>(error)) {
        const code = error.response?.data.error.code;
        const message = getErrorMessage(code);
        form.setError('root.api', { message });
      }
    }
  });

  const isSubmitting = (form.formState.isSubmitting || isPending);

  return (
    <FormProvider {...form} >
      <View style={[styles.container, { paddingTop: top }]}>
        <HeaderApp title='Suas Metas' disabled={isSubmitting} />
        <KeyboardAwareScrollView
          bottomOffset={footerHeight}
        >
          <View style={styles.content}>
            <GoalInputField
              name='calories'
              label='Calorias'
              placeholder='2000'
              unit='kcal'
              disabled={isSubmitting}
            />
            <GoalInputField
              name='carbohydrates'
              label='Carboidratos'
              placeholder='200'
              unit='g'
              disabled={isSubmitting}
            />
            <GoalInputField
              name='proteins'
              label='Proteínas'
              placeholder='175'
              unit='g'
              disabled={isSubmitting}
            />
            <GoalInputField
              name='fats'
              label='Gorduras'
              placeholder='56'
              unit='g'
              disabled={isSubmitting}
              errorApi={form.formState.errors.root?.api.message}
            />
          </View>
        </KeyboardAwareScrollView>
        <KeyboardStickyView
          onLayout={(e) => setFooterHeight(e.nativeEvent.layout.height + bottom)}
          offset={{ opened: 10 + 20 }}
          style={{ backgroundColor: theme.colors.white }}
        >
          <View style={[styles.footer, { paddingBottom: bottom }]}>
            <ButtonApp
              intent='neutral'
              style={{ flex: 1 }}
              disabled={isSubmitting}
              onPress={goBack}
            >
              Cancelar
            </ButtonApp>
            <ButtonApp
              style={{ flex: 1 }}
              disabled={!form.formState.isValid || isSubmitting}
              isLoading={isSubmitting}
              onPress={handleSubmit}
            >
              Salvar
            </ButtonApp>
          </View>
        </KeyboardStickyView>
      </View >
    </FormProvider>
  );
}

