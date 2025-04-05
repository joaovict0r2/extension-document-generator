import { cnpjMask, cpfMask, generateCNPJ, generateCPF } from "@/lib/utils";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Tooltip } from "../Tooltip/Tooltip";
import { useState } from "react";

type DocumentType = "CPF" | "CNPJ";

function Generator() {
  const [tooltipText, setTooltipText] = useState("Click to Copy");

  const generateDocument = (type: DocumentType) => {
    const generatedDocument = type === "CPF" ? generateCPF() : generateCNPJ();
    const elem = document.getElementById("document") as HTMLInputElement;

    elem.defaultValue =
      type === "CPF" ? cpfMask(generatedDocument) : cnpjMask(generatedDocument);
  };

  const handleDocument = () => {
    const elem = document.getElementById("document") as HTMLInputElement;
    navigator.clipboard.writeText(elem.value);

    setTooltipText("Copied!");
  };

  return (
    <div className="w-full max-w-7xl flex justify-center items-center flex-col p-4 gap-2">
      <div className="grid w-full gap-2">
        <Label htmlFor="document">Documento gerado:</Label>

        <Tooltip text={tooltipText}>
          <Input
            type="document"
            id="document"
            readOnly
            onClick={handleDocument}
            className="cursor-pointer"
          />
        </Tooltip>
      </div>

      <div className="w-full flex gap-1">
        <Button
          variant="outline"
          className="flex-1 cursor-pointer"
          onClick={() => generateDocument("CPF")}
        >
          CPF
        </Button>
        <Button
          variant="outline"
          className="flex-1 cursor-pointer"
          onClick={() => generateDocument("CNPJ")}
        >
          CNPJ
        </Button>
      </div>
    </div>
  );
}

export default Generator;
