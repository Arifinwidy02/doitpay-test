import * as yup from "yup";

export const cardSchema = yup.object({
  cardHolder: yup
    .string()
    .required("Card holder is required")
    .matches(/^[a-zA-Z0-9 ]+$/, "Only alphanumeric characters allowed"),

  cardNumber: yup
    .string()
    .required("Card number is required")
    .transform((value) => value.replace(/\D/g, ""))
    .length(16, "Card number must be 16 digits"),

  expiredAt: yup
    .date()
    .required("Expiry date is required")
    .test("is-future", "Expiry date cannot be in the past", (value) => {
      if (!value) return false;
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return value >= today;
    })
    .nullable(),

  color: yup.string().required(),
});

export type CardFormValues = yup.InferType<typeof cardSchema>;
