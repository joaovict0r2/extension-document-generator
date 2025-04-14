import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tooltip } from "@/components/Tooltip/Tooltip";
import { generateCPF, generateCNPJ } from "@/lib/generate-document"
import { cnpjMask, cpfMask } from "@/lib/masks";
import { ModeToggle } from "../ModeToggle/ModeToggle";

type DocumentType = "CPF" | "CNPJ";

function Generator() {
  const [tooltipText, setTooltipText] = useState("Click to Copy");

  const generateDocument = (type: DocumentType) => {
    const generatedDocument = type === "CPF" ? generateCPF() : generateCNPJ();
    const elem = document.getElementById("document") as HTMLInputElement;

    setTooltipText('Click to Copy')

    elem.defaultValue =
      type === "CPF" ? cpfMask(generatedDocument) : cnpjMask(generatedDocument);
  };

  const handleDocument = () => {
    const elem = document.getElementById("document") as HTMLInputElement;
    navigator.clipboard.writeText(elem.value);

    setTooltipText("Copied!");
  };

  return (
    <div className="w-full flex flex-col p-4 mt-3.5 gap-2">
      <div className="flex justify-end">
        <ModeToggle />
      </div>

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
