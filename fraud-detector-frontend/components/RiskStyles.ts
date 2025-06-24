
import type { RiskLevel } from '../types';

export interface RiskStylesDefinition {
  label: string;
  textColor: string;
  borderColor: string;
  headerBgColor: string;
}

export const getRiskStylesDefinition = (riskLevel: RiskLevel): RiskStylesDefinition => {
  switch (riskLevel) {
    case "آمن":
      return {
        label: "آمن",
        textColor: "text-success",
        borderColor: "border-success",
        headerBgColor: "bg-success/10",
      };
    case "مشبوه":
      return {
        label: "مشبوه",
        textColor: "text-warning",
        borderColor: "border-warning",
        headerBgColor: "bg-warning/10",
      };
    case "خطير جداً":
      return {
        label: "خطير جداً",
        textColor: "text-danger",
        borderColor: "border-danger",
        headerBgColor: "bg-danger/10",
      };
    default:
      return {
        label: "معلومات",
        textColor: "text-info",
        borderColor: "border-info",
        headerBgColor: "bg-info/10",
      };
  }
}
