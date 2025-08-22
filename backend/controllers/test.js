let a = {
  "topic": "stock market",
  "difficulty": "hard",
  "questions": [
    {
      "question": "Which of the following option strategies is most suitable for a highly volatile market where you expect a large price swing but are unsure of the direction?",
      "options": [
        "Covered Call",
        "Protective Put",
        "Long Straddle",
        "Short Strangle"
      ],
      "correct": "Long Straddle"
    },
    {
      "question": "What is the primary difference between Value at Risk (VaR) and Conditional Value at Risk (CVaR)?",
      "options": [
        "VaR measures the expected loss, while CVaR measures the maximum possible loss.",
        "VaR measures the loss at a specific confidence level, while CVaR measures the average loss exceeding that level.",
        "VaR is used for equities, while CVaR is used for fixed income.",
        "VaR is a more conservative measure than CVaR."
      ],
      "correct": "VaR measures the loss at a specific confidence level, while CVaR measures the average loss exceeding that level."
    }
  ]
}

console.log(a.questions[0].question)