# DoItPay Test

# Getting Started

1. Clone the repository
2. Install dependencies: yarn install or npm install
3. Run the project: yarn dev or npm run dev

# Technical Considerations

1. Form Management: I utilized react-hook-form with the Controller pattern. The form state is kept local to the component rather than global, because its only used in this component.
2. Mock Data: To test the UI with multiple items, please uncomment the use of CardSeed in CardList.tsx (around line 26).
3. Validation: Robust error handling is implemented using Yup schema validation to ensure data integrity.
4. UX Features: The "View All" toggle logic is dynamic; it only appears when the card count exceeds the initial layout capacity, providing a cleaner interface for fewer items.
5. UX Features: The "View All" toggle logic is dynamic; it only appears when the card count exceeds the initial layout capacity, providing a cleaner interface for fewer items.

# Unit Testing

The project includes test cases for core utility functions. You can execute them by running yarn test. the file is places at the local folder instead of the dedicated test folder for small test purpose only
Test Cases:

1. maskCardNumber: Ensures sensitive card digits are correctly obfuscated.
2. formatExpiredAt: Validates the transformation of date objects into the required MM/YYYY string format.
