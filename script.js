document.addEventListener('DOMContentLoaded', () => {
      const display = document.getElementById('display');
      const buttons = document.querySelectorAll('.buttons button');

      let currentInput = '0';
      let calculation = '';
      let waitingForNewNumber = true; // Flag to handle consecutive number inputs

      /**
       * Updates the display input element visually.
       */
      function updateDisplay() {
          display.value = currentInput;
      }

      /**
       * Handles number button clicks (0-9 and .)
       * @param {string} number - The number value clicked.
       */
      function inputNumber(number) {
          if (waitingForNewNumber) {
              // Start a new number input sequence
              currentInput = number === '.' ? '0.' : number;
              waitingForNewNumber = false;
          } else if (number === '.') {
              // Prevent multiple decimals
              if (currentInput.includes('.')) return;
              currentInput += '.';
          } else {
              // Append number
              currentInput = currentInput === '0' ? number : currentInput + number;
          }
          updateDisplay();
      }

      /**
       * Handles operator button clicks (+, -, x, /)
       * @param {string} operator - The operator symbol clicked.
       */
      function handleOperator(operator) {
          // If the display is '0' and we click an operator, or if the last action was an operator, 
          // we might want to overwrite the current sequence.
          if (currentInput === '0' && !calculation) {
              // Do nothing if starting with '0'
          } else if (waitingForNewNumber) {
              // If we just calculated something, use the result as the first operand
              calculation = currentInput + operator;
              waitingForNewNumber = true;
              return;
          } else {
              // Append to the running calculation string
              calculation = currentInput + operator;
              waitingForNewNumber = true;
          }
          updateDisplay();
      }
function calculateResult() {
          if (!calculation) return;

          try {
              // SAFETY WARNING: Using eval() is generally dangerous, but for a contained
              // calculator example, it's the simplest way to evaluate the expression string.
              // In a production app, you should use a dedicated math library.
              const result = eval(calculation.toString().replace(/x/g, '*'));
              calculation = result.toString();
              display = result.toString();
          } catch (e) {
              display = 'Error';
          }
      }

      // --- Event Listener Setup ---
      document.querySelectorAll('.calculator-button').forEach(button => {
          button.addEventListener('click', () => {
              const value = button.dataset.value;

              if (value) {
                  if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', 'x'].includes(value)) {
                      // Handle number/decimal/multiplication symbol (using 'x' for display)
                      if (value === '.') {
                           // Basic check to prevent multiple decimals in one number segment
                          let currentDisplay = display;
                          if (!currentDisplay.includes('.')) {
                              display = (display === '0' && value === '.') ? '0.' : display + '.';
                          }
                      } else if (value === 'x') {
                          display = display.includes('x') ? display : display + 'x';
                      } else {
                          display = display === '0' ? value === '1' ? '1' : value : display + value;
                      }
                  } else if (value === 'x') {
                      // If the button pressed is 'x'
                      display = display.includes('x') ? display : display + 'x';
                  } else if (value === '=') {
                      // Handle equals sign
                      calculateResult();
                  } else if (value === 'clear') {
                      // Handle clear button
                      display = '0';
                      calculation = '';
                  }
              }
          });
      });
// Global State Variables
      let display = '0'; // What the user sees
      let calculation = ''; // The full mathematical string being built

      // Modified function to keep state consistent and handle the 'x' replacement for eval()
      function calculateResult() {
          try {
              // Replace the user-friendly 'x' with the programming '*' symbol for eval()
              const expressionForEval = calculation.replace(/x/g, '*');
              const result = eval(expressionForEval);

              display = result.toString();
              calculation = result.toString(); // Set the result as the base for next calculation
          } catch (e) {
              display = 'Error';
              calculation = '';
          }
      }

      // --- Redesign for Clean Event Handling (since the provided structure is HTML-based) ---
      // Since I cannot modify the assumed HTML structure, I will use a unified approach
      // that assumes the necessary buttons are present and attach listeners based on action.

      // Placeholder function to simulate the binding to the assumed structure
      function setupCalculator() {
          const buttons = document.querySelectorAll('[data-action]');
          buttons.forEach(button => {
              button.addEventListener('click', () => {
                  const action = button.getAttribute('data-action');
                  const value = button.getAttribute('data-value');

                  if (action === 'number' || action === 'operator') {
                      if (value === '.') {
                          if (!display.includes('.') || display === '0') {
                              display = display === '0' ? '0.' : display + '.';
                          }
                      } else if (value === 'x') {
                          if (display.endsWith(')') || display.endsWith(']')) {
                              display += 'x';
                          } else if (display === '0' && value !== '.') {
                              display = value;
                          } else {
                              display += 'x';
                          }
                      } else {
                          display = display === '0' ? value : display + value;
                      }
                      calculation = calculation ? calculation + value : value;
                  } else if (action === 'equals') {
                  } else if (action === 'clear') {
                      display = '0';
                      calculation = '';
                  }   
              }); 
          }); 
      }   
      
      // Because the prompt is structural, I will output the FINAL JAVASCRIPT BLOCK assuming
      // the necessary HTML elements are present and follow a logical pattern for calculation.
  }   
