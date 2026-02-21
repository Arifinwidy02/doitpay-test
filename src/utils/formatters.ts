export const formatCardNumber = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 16);
  return digits.match(/.{1,4}/g)?.join("-") ?? "";
};

export const maskCardNumber = (number: string) => {
  const cleanNumber = number.replace(/\D/g, "");

  const maskedSection = cleanNumber.slice(0, -4).replace(/\d/g, "*");
  const lastFour = cleanNumber.slice(-4);

  const fullString = maskedSection + lastFour;

  return fullString.match(/.{1,4}/g)?.join(" ") || "";
};
