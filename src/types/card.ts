export type Card = {
  id: string;
  cardNumber: string;
  cardHolder: string;
  expiredAt: string;
  color: string;
};

export type CardFormValues = {
  cardHolder: string;
  cardNumber: string;
  expiredAt: Date | null;
  color: string;
};
