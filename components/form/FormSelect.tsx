import { useFormStatus } from 'react-dom';
import Select, {
  GroupBase,
  OnChangeValue,
  Props,
  ActionMeta,
} from 'react-select';
import { Label } from '../ui/label';
import FormErrors from './FormErrors';
import { useState } from 'react';

interface FormSelectProps<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
> extends Props<Option, IsMulti, Group> {
  id: string;
  label?: string;
  placeholder?: string;
  className?: string;
  options: Option[];
  isMulti?: IsMulti;
  isDisabled?: boolean;
  autoFocus?: boolean;
  errors?: Record<string, string[] | undefined>;
  hideSelectedOptions?: boolean;
  onBlur?: () => void;
  defaultValue?: Option | Option[] | null;
}

export const FormSelect = <
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>({
  id,
  label,
  placeholder,
  options,
  className,
  isDisabled,
  isMulti,
  autoFocus,
  errors,
  hideSelectedOptions = true,
  defaultValue,
  onBlur,
}: FormSelectProps<Option, IsMulti, Group>) => {
  const [selectedOption, setSelectedOption] = useState<
    Option | Option[] | null
  >(null);
  const { pending } = useFormStatus();

  const onChange = (
    newValue: OnChangeValue<Option, IsMulti>,
    actionMeta: ActionMeta<Option>
  ) => {
    if (isMulti) {
      setSelectedOption(newValue as Option[]);
    } else {
      setSelectedOption(newValue as Option | null);
    }
  };

  return (
    <div className=' space-y-2'>
      <div className='space-y-1'>
        {label ? (
          <Label
            htmlFor={id}
            className='text-xs font-semibold text-neutral-700'
          >
            {label}
          </Label>
        ) : null}
        <Select
          instanceId={id}
          id={id}
          placeholder={placeholder}
          isDisabled={isDisabled || pending}
          defaultValue={defaultValue}
          options={options}
          autoFocus={autoFocus}
          onChange={onChange}
          onBlur={onBlur}
          className={className}
          name={id}
          isMulti={isMulti}
          aria-describedby={`${id}-error`}
          hideSelectedOptions={hideSelectedOptions}
        />
      </div>
      <FormErrors id={id} errors={errors} />
    </div>
  );
};

FormSelect.displayName = 'FormSelect';
