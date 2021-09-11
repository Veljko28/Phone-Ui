import { ValidationError } from "yup";

export const formatYupError = (err: ValidationError | any) => {
  const errors: Array<{ path: string | undefined; message: string }> = [];
  err.inner.forEach((e: ValidationError) => {
    errors.push({
      path: e.path,
      message: e.message
    });
  });

  return errors;
};