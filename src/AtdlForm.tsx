import applyRules from "rjsf-conditionals";
import Engine from "json-rules-engine-simplified";
import Form, { FormProps, ISubmitEvent, UiSchema } from "@rjsf/core";
import { ComponentType, useMemo } from "react";
import { JSONSchema7 } from "json-schema";
import { set, get, isNil } from "lodash";
import { flatten } from "flat";
import TimePicker from "./TimePicker";

const extraActions = {
  disable: (
    { field, value }: { field: string; value: boolean },
    _: JSONSchema7,
    uiSchema: UiSchema
  ) => {
    set(uiSchema, `${field}.ui:disabled`, value);
  },
  setFieldValue: (
    { field, value }: { field: string; value: boolean },
    _: JSONSchema7,
    __: UiSchema,
    formData: FormData
  ) => {
    set(formData, field, value);
  },
};

const widgets = {
  timePicker: TimePicker,
};

interface AtdlFormProps {
  schema: JSONSchema7;
  uiSchema?: UiSchema;
  rules?: any;
  onSubmit: (result: string) => void;
}

const AtdlForm = ({ schema, uiSchema, rules, onSubmit }: AtdlFormProps) => {
  const handleSubmit = (event: ISubmitEvent<FormData>) => {
    const { formData, uiSchema } = event;
    const output = Object.entries(flatten(formData))
      .flatMap(([key, value]) => {
        const fixTag = get(uiSchema, `${key}.fixTag`);
        if (!isNil(fixTag) && !isNil(value)) {
          return [`${fixTag}=${value}`];
        }
        return [];
      })
      .join(" ");

    onSubmit(output);
  };

  const FormWithConditionals = useMemo(
    () =>
      applyRules(
        schema,
        uiSchema,
        rules,
        Engine,
        extraActions
      )(Form) as ComponentType<Omit<FormProps<FormData>, "schema">>,
    [schema, uiSchema, rules]
  );

  return <FormWithConditionals onSubmit={handleSubmit} widgets={widgets} />;
};

export default AtdlForm;
