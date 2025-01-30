import { forwardRef } from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';

type ButtonVariant = 'primary' | 'secondary' | 'link' | 'danger';

const styles = {
  primary: {
    button: 'items-center bg-emerald-500 rounded-[28px] shadow-md p-4',
    text: 'text-white text-lg font-semibold text-center',
  },
  secondary: {
    button: 'items-center border-2 border-emerald-500 rounded-[28px] shadow-md p-4',
    text: 'text-emerald-500 text-lg font-semibold text-center',
  },
  link: {
    button: 'items-center p-4',
    text: 'text-emerald-500 text-lg font-bold text-center',
  },
  danger: {
    button:
      'items-center justify-center border-2 border-red-500 rounded-[28px] bg-red-50 shadow-md px-4',
    text: 'text-red-500 text-lg font-bold text-center',
  },
};
type ButtonProps = {
  title: string;
  variant?: ButtonVariant;
} & TouchableOpacityProps;

export const Button = forwardRef<View, ButtonProps>(
  ({ title, variant = 'primary', ...touchableProps }, ref) => {
    return (
      <TouchableOpacity
        ref={ref}
        {...touchableProps}
        className={`${styles[variant].button} ${touchableProps.className}`}>
        <Text className={styles[variant].text}>{title}</Text>
      </TouchableOpacity>
    );
  }
);
