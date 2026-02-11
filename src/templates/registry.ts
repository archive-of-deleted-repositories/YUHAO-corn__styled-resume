import type { ComponentType } from "react";
import type { ResumeData } from "../types/resume";
import ShadcnPreview from "./shadcn/PreviewTemplate";

export interface Template {
  id: string;
  name: string;
  component: ComponentType<{ data: ResumeData }>;
  disabled?: boolean;
}

export const templates: Template[] = [
  { id: "shadcn", name: "Shadcn", component: ShadcnPreview },
  { id: "claude", name: "Claude", component: ShadcnPreview, disabled: true },
];

export const getTemplate = (id: string) =>
  templates.find((t) => t.id === id && !t.disabled) ?? templates[0];
