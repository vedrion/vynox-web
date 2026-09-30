export type CareerFieldErrors = Record<string, string>;
export type CareerValues = Record<string, string>;

export type CareerApplicationState =
  | { status: "idle" }
  | { status: "success"; id: string }
  | { status: "error"; message: string; errors?: CareerFieldErrors; values?: CareerValues };

export const initialCareerApplicationState: CareerApplicationState = { status: "idle" };
