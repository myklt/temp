import { UiSchema } from "@rjsf/core";
import { JSONSchema7 } from "json-schema";

export const schema: JSONSchema7 = {
  properties: {
    horizontal1: {
      type: "object",
      title: "",
      properties: {
        StartTime: {
          type: "string",
          title: "Start Time",
          format: "time",
          default: "09:30:00",
          description: "Strategy Start Time",
        },
        EndTime: {
          type: "string",
          title: "Start Time",
          format: "time",
          default: "16:00:00",
          description: "Strategy End Time",
        },
        m_dq: {
          type: "string",
          title: "Display Qty Handling",
          default: "choice1",
          oneOf: [
            { const: "choice1", title: "Send nothing" },
            { const: "choice2", title: "Send 0" },
            { const: "choice3", title: "Send what user enters" },
          ],
        },
        DisplayQty: {
          type: "integer",
          title: "Display Quantity",
          minimum: 0,
        },
      },
      required: ["StartTime", "EndTime"],
    },
    horizontal2: {
      type: "object",
      title: "",
      properties: {
        SweepDistribution: {
          type: "string",
          title: "Sweep Distribution",
          oneOf: [
            // TODO: should wire values be used already here or only later? In rules only enumID is used
            // TODO: is it possible to display description for each enum?
            { const: "U", title: "Uniform" },
            { const: "G", title: "Gaussian" },
            // 	<EnumPair enumID="e_Uniform" wireValue="U">
            // 		<Description>The 'Uniform' setting for Sweep Distribution</Description>
            // 	</EnumPair>
            // <lay:ListItem enumID="e_Uniform" uiRep="Uniform"/>
          ],
          default: "U", // e_Uniform
        },
        Variance: {
          type: "number",
          title: "Variance",
          minimum: 0.01,
          maximum: 0.5,
          // TODO: needs to be calculated based on default, minimum, maximum if not provided
          multipleOf: 0.01,
        },
      },
      required: ["SweepDistribution"],
    },
  },
};

export const uiSchema: UiSchema = {
  horizontal1: {
    StartTime: {
      "ui:widget": "timePicker",
      fixTag: "7602",
    },
    EndTime: {
      "ui:widget": "timePicker",
      fixTag: "7603",
    },
    DisplayQty: {
      fixTag: "7645",
    },
  },
  horizontal2: {
    SweepDistribution: {
      fixTag: "7640",
    },
    Variance: {
      fixTag: "7641",
    },
  },
};

export const rules = [
  {
    conditions: {
      "horizontal1.m_dq": { or: [{ equal: "choice1" }, { equal: "choice2" }] },
    },
    event: {
      type: "disable",
      params: {
        field: "horizontal1.DisplayQty",
        value: true,
      },
    },
  },
  {
    conditions: {
      "horizontal1.m_dq": { equal: "choice1" },
    },
    event: {
      type: "setFieldValue",
      params: {
        field: "horizontal1.DisplayQty",
        value: undefined,
      },
    },
  },
  {
    conditions: {
      "horizontal1.m_dq": { equal: "choice2" },
    },
    event: {
      type: "setFieldValue",
      params: {
        field: "horizontal1.DisplayQty",
        value: 0,
      },
    },
  },
  {
    conditions: {
      "horizontal2.SweepDistribution": { equal: "U" }, // e_Uniform
    },
    event: {
      type: "disable",
      params: {
        field: "horizontal2.Variance",
        value: true,
      },
    },
  },
  {
    // TODO: check if could be merged for the same condition by listing multiple events somehow
    conditions: {
      "horizontal2.SweepDistribution": { equal: "U" }, // e_Uniform
    },
    event: {
      type: "setFieldValue",
      params: {
        field: "horizontal2.Variance",
        value: undefined,
      },
    },
  },
  {
    conditions: {
      "horizontal2.SweepDistribution": { equal: "G" }, // e_Uniform
    },
    event: {
      type: "require",
      params: {
        field: "horizontal2.Variance",
      },
    },
  },
];
