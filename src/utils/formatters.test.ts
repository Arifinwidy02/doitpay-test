import { formatCardNumber, maskCardNumber } from "./formatters";

describe("Card Formatters", () => {
  describe("formatCardNumber", () => {
    it("should format digits into groups of 4 separated by dashes", () => {
      expect(formatCardNumber("1234567812345678")).toBe("1234-5678-1234-5678");
    });

    it("should limit the input to 16 digits", () => {
      expect(formatCardNumber("11112222333344445555")).toBe(
        "1111-2222-3333-4444",
      );
    });

    it("should return an empty string for empty input", () => {
      expect(formatCardNumber("")).toBe("");
    });
  });

  describe("maskCardNumber", () => {
    it("should mask all but the last 4 digits and group by spaces", () => {
      expect(maskCardNumber("1234123412341234")).toBe("**** **** **** 1234");
    });

    it("should strip non-digits before masking", () => {
      expect(maskCardNumber("1234-5678-9012-3456")).toBe("**** **** **** 3456");
    });

    it("should return empty string if no digits are present", () => {
      expect(maskCardNumber("abcd")).toBe("");
    });
  });
});
