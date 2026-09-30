import type { FieldErrors } from "./schema";

export type SubmittedValues = Record<string, string>;

export type ContactState =
  | { status: "idle" }
  | { status: "success"; id: string }
  | {
      status: "error";
      message: string;
      errors?: FieldErrors;
      values?: SubmittedValues;
    };

export const initialContactState: ContactState = { status: "idle" };
