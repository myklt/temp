import { WidgetProps } from "@rjsf/core";
import { FormEvent } from "react";

export interface TimePickerProps extends WidgetProps {}

export default function TimePicker(props: TimePickerProps) {
  const max = props.schema.maximum;
  const min = props.schema.minimum;

  const handleChange = (event: FormEvent<HTMLInputElement>) => {
    // TODO: in case of `lay:Clock_t` layout type and `UTCTimestamp_t` parameter type, the whole timestamp should be sent, i.e. with the date
    props.onChange(event.currentTarget.value);
  };

  return (
    <input
      id={props.id}
      type="time"
      name={props.name}
      value={props.value}
      onChange={handleChange}
      required={props.required}
      readOnly={props.readonly}
      disabled={props.disabled}
      max={max}
      min={min}
    />
  );
}
