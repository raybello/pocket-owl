import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "./ui/tooltip";

interface HintProps {
    children: React.ReactNode;
    description: string;
    side?: "top" | "bottom" | "left" | "right";
    sideOffset?: number;
}

export const Hint = ({
    children,
    description,
    side = "bottom",
    sideOffset = 0,
} : HintProps) => {
    return (
        <TooltipProvider>
            <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                    {children}
                </TooltipTrigger>
                <TooltipContent side={side} sideOffset={sideOffset} className="text-xs text-slate-500 max-w-[220px] break-words">
                    {description}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}