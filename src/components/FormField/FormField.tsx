import { ChangeEvent, useState } from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

import iconEmail from '@/assets/icons/icon_formfield_email.svg';
import iconNickname from '@/assets/icons/icon_formfield_nickname.svg';
import iconPassword from '@/assets/icons/icon_formfield_password.svg';
import iconInvisible from '@/assets/icons/icon_password_invisible.svg';
import iconVisible from '@/assets/icons/icon_password_visible.svg';
import { cn } from '@/lib/cn';

interface FieldProps {
  label: string;
  id: string;
  type: keyof typeof FORMFIELD_ICON_MAP;
  placeholder?: string;
  autoComplete?: string;
  register?: UseFormRegisterReturn;
  error?: FieldError;
  defaultHint?: string;
}

const FORMFIELD_ICON_MAP = {
  email: iconEmail,
  password: iconPassword,
  text: iconNickname,
} as const;

const PASSWORD_VISIBLE_ICON_MAP = {
  false: iconInvisible,
  true: iconVisible,
};

const FormField = ({
  label,
  id,
  type,
  placeholder,
  autoComplete,
  register,
  error,
  defaultHint,
}: FieldProps) => {
  const [isDirty, setIsDirty] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const errorState = isDirty ? !!error : 'undefined';
  const hint = isDirty ? error?.message : defaultHint;

  const InputRegister = {
    ...register,
    onChange: (e: ChangeEvent<HTMLInputElement>) => {
      if (!isDirty) {
        setIsDirty(true); // 최초 입력 시에만 한 번 상태 변경
      }
      if (register) {
        register.onChange?.(e);
      }
    },
  };

  const inputType = type === 'password' && isVisible ? 'text' : type;

  const handlePasswordIconClick = () => {
    setIsVisible((prev) => !prev);
  };

  const IconFormField = FORMFIELD_ICON_MAP[type];
  const IconEye = PASSWORD_VISIBLE_ICON_MAP[`${isVisible}`];

  const ERROR_STATE_STYLES = {
    text: {
      undefined: 'text-gray-600',
      false: 'text-orange-500',
      true: 'text-state-error',
    },
    border: {
      undefined: 'border-gray-600',
      false: 'border-orange-500',
      true: 'border-state-error',
    },
  };

  const FLOATING_LABEL_STYLES = {
    base: cn(
      'text-body1-medium bg-white px-2',
      'absolute top-0 left-11 translate-y-[-50%] text-center',
      ERROR_STATE_STYLES.text[`${errorState}`],
    ),
    hidden: 'group-has-[:placeholder-shown]:group-[:not(:focus-within)]:opacity-0',
    visible: 'group-focus-within:opacity-100 group-has-[:not(:placeholder-shown)]:opacity-100',
    animation: 'formfield-animate',
  };

  const INPUT_CONTAINER_STYLES = cn(
    'flex h-13 flex-row items-center gap-3 rounded-full border-1 px-5 md:h-16',
    ERROR_STATE_STYLES.border[`${errorState}`],
    'formfield-animate',
  );

  const FIELD_ICON_STYLES = cn(ERROR_STATE_STYLES.text[`${errorState}`], 'formfield-animate');

  const INPUT_STYLES = cn(
    'text-body1 grow outline-0',
    'placeholder:text-gray-600 placeholder:transition-opacity placeholder:duration-300',
    'group-focus-within:placeholder:opacity-0',
  );

  const HINT_STYLES = cn(
    'mt-3 h-[17px] text-[14px]/[17px]',
    ERROR_STATE_STYLES.text[`${errorState}`],
    'formfield-animate opacity-0',
    errorState && 'opacity-100',
  );

  return (
    <div className='group relative'>
      <p
        className={cn(
          FLOATING_LABEL_STYLES.hidden,
          FLOATING_LABEL_STYLES.visible,
          FLOATING_LABEL_STYLES.base,
          FLOATING_LABEL_STYLES.animation,
        )}
      >
        {label}
      </p>

      <div className={INPUT_CONTAINER_STYLES}>
        <label htmlFor={id}>
          <IconFormField className={FIELD_ICON_STYLES} />
        </label>
        <input
          id={id}
          className={INPUT_STYLES}
          type={inputType}
          placeholder={placeholder}
          autoComplete={autoComplete}
          {...InputRegister}
        />
        {type === 'password' && (
          <IconEye className='cursor-pointer' onClick={handlePasswordIconClick} />
        )}
      </div>
      <p className={HINT_STYLES}>{hint}</p>
    </div>
  );
};

export default FormField;
