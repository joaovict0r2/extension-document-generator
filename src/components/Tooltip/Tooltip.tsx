import {
  Tooltip as TooltipWrapper,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { ReactNode } from "react"

type Props = { 
  text: string
  children: ReactNode 
}

export function Tooltip({ children, text }: Props) {
  return (
    <TooltipProvider>
      <TooltipWrapper>
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent>
          <p>{text}</p>
        </TooltipContent>
      </TooltipWrapper>
    </TooltipProvider>
  )
}
