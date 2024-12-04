import { LucideCircleCheck, LucideFileText, LucidePencil } from "lucide-react";

export const TICKET_ICONS = {
  CLOSED: <LucideCircleCheck />,
  IN_PROGRESS: <LucidePencil />,
  OPEN: <LucideFileText />,
};

export const TICKET_STATUS_LABELS = {
  CLOSED: "Closed",
  IN_PROGRESS: "In Progress",
  OPEN: "Open",
};
