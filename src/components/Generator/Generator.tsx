import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tooltip } from "@/components/Tooltip/Tooltip";
import { generateCPF, generateCNPJ } from "@/lib/generate-document"
import { cnpjMask, cpfMask } from "@/lib/masks";
import { ModeToggle } from "../ModeToggle/ModeToggle";
import { cn } from "@/lib/utils";

type DocumentType = "CPF" | "CNPJ";

function Generator() {
  const [tooltipText, setTooltipText] = useState("");

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
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-[20px]">Document Generator</h1>
        <ModeToggle />
      </div>

      <Tooltip text={tooltipText}>
        <Input
          type="document"
          id="document"
          readOnly
          onClick={handleDocument}
          className={cn("cursor-pointer", !tooltipText.length && 'pointer-events-none')}
        />
      </Tooltip>
      
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
