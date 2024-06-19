import Select, {
  GroupBase,
  OnChangeValue,
  Props,
  ActionMeta,
} from 'react-select';
import { Label } from '../ui/label';
import FormErrors from './FormErrors';
import { useFormStatus } from 'react-dom';

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
  isSearchable?: boolean;
  autoFocus?: boolean;
  errors?: Record<string, string[] | undefined>;
  hideSelectedOptions?: boolean;
  onBlur?: () => void;
  selectedOption: Option | Option[] | null;
  setSelectedOption: (option: Option | Option[] | null) => void;
  isLoading?: boolean;
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
  isSearchable = true,
  autoFocus,
  errors,
  hideSelectedOptions = true,
  onBlur,
  selectedOption,
  setSelectedOption,
  isLoading = false,
}: FormSelectProps<Option, IsMulti, Group>) => {
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
    <div className='space-y-2'>
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
          placeholder={
            !options.length && !isLoading ? 'No options' : placeholder
          }
          isDisabled={isDisabled || pending || isLoading || !options.length}
          defaultValue={selectedOption}
          options={options}
          autoFocus={autoFocus}
          onChange={onChange}
          onBlur={onBlur}
          className={className}
          name={id}
          isMulti={isMulti}
          aria-describedby={`${id}-error`}
          hideSelectedOptions={hideSelectedOptions}
          isSearchable={isSearchable}
        />
      </div>
      <FormErrors id={id} errors={errors} />
    </div>
  );
};

FormSelect.displayName = 'FormSelect';
