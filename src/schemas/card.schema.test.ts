import { cardSchema } from "./card.schema";

describe("cardSchema", () => {
  const validData = {
    cardHolder: "John Doe 123",
    cardNumber: "1234 5678 1234 5678",
    expiredAt: new Date(new Date().getFullYear() + 1, 1),
    color: "blue",
  };

  describe("cardHolder", () => {
    it("should fail if cardHolder is missing", async () => {
      await expect(
        cardSchema.validateAt("cardHolder", { cardHolder: "" }),
      ).rejects.toThrow("Card holder is required");
    });

    it("should fail if cardHolder contains special characters", async () => {
      await expect(
        cardSchema.validateAt("cardHolder", { cardHolder: "John@Doe" }),
      ).rejects.toThrow("Only alphanumeric characters allowed");
    });
  });

  describe("cardNumber", () => {
    it("should normalize and accept a card number with spaces", async () => {
      const validated = await cardSchema.validate(validData);
      expect(validated.cardNumber).toBe("1234567812345678");
    });

    it("should fail if card number is not 16 digits after normalization", async () => {
      const shortCard = { ...validData, cardNumber: "1234 5678" };
      await expect(cardSchema.validate(shortCard)).rejects.toThrow(
        "Card number must be 16 digits",
      );
    });
  });

  describe("expiredAt", () => {
    it("should fail if the date is in the past", async () => {
      const pastDate = new Date(2000, 1, 1);
      const invalidData = { ...validData, expiredAt: pastDate };

      await expect(cardSchema.validate(invalidData)).rejects.toThrow(
        "Expiry date cannot be in the past",
      );
    });
  });
});
