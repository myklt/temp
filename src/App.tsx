import { useState } from "react";
import AtdlForm from "./AtdlForm";
import { schema, uiSchema, rules } from "./schema";

function App() {
  const [result, setResult] = useState<string>();

  const handleSubmit = (result: string) => {
    setResult(result);
  };

  return (
    <>
      <AtdlForm
        schema={schema}
        uiSchema={uiSchema}
        rules={rules}
        onSubmit={handleSubmit}
      />
      <pre>{result}</pre>
    </>
  );
}

export default App;
