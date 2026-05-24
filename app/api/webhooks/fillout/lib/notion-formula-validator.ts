export interface FormulaValidationError {
  message: string;
  severity: "error" | "warning";
  suggestion?: string;
}

export function validateNotionFormula(formula: string): FormulaValidationError[] {
  const errors: FormulaValidationError[] = [];
  
  if (!formula || formula.trim() === "") {
    errors.push({
      message: "Formula field cannot be empty.",
      severity: "error",
      suggestion: "Example: map(filter(prop(\"Health Logs\"), current.prop(\"Category\") == \"Exercise\"), current.prop(\"Value\")).sum()"
    });
    return errors;
  }

  // 1. Parentheses matching count
  let openParens = 0;
  for (let i = 0; i < formula.length; i++) {
    if (formula[i] === '(') openParens++;
    else if (formula[i] === ')') openParens--;
    
    if (openParens < 0) {
      errors.push({
        message: "Parentheses error: Found a closing parenthesis ')' without a matching opening parenthesis '('.",
        severity: "error",
        suggestion: "Check for extra or misplaced ')' brackets."
      });
      break;
    }
  }
  if (openParens > 0) {
    errors.push({
      message: `Parentheses mismatch: There are ${openParens} unclosed opening parenthesis '('.`,
      severity: "error",
      suggestion: "Ensure every open '(' has a corresponding closing ')'."
    });
  }

  // 2. Square brackets matching count
  let openBrackets = 0;
  for (let i = 0; i < formula.length; i++) {
    if (formula[i] === '[') openBrackets++;
    else if (formula[i] === ']') openBrackets--;
    
    if (openBrackets < 0) {
      errors.push({
        message: "Brackets error: Found a closing square bracket ']' without a matching opening bracket '['.",
        severity: "error"
      });
      break;
    }
  }
  if (openBrackets > 0) {
    errors.push({
      message: `Brackets mismatch: There are ${openBrackets} unclosed square bracket '['.`,
      severity: "error"
    });
  }

  // 3. String quotes parity
  let doubleQuoteCount = 0;
  let singleQuoteCount = 0;
  for (let i = 0; i < formula.length; i++) {
    if (formula[i] === '"' && (i === 0 || formula[i - 1] !== '\\')) doubleQuoteCount++;
    if (formula[i] === "'" && (i === 0 || formula[i - 1] !== '\\')) singleQuoteCount++;
  }
  if (doubleQuoteCount % 2 !== 0) {
    errors.push({
      message: "String error: Odd number of double quotes (\"). All literal texts/property keys must have opening and closing quotes.",
      severity: "error"
    });
  }
  if (singleQuoteCount % 2 !== 0) {
    errors.push({
      message: "String error: Odd number of single quotes ('). Correct the quote pairings in your formula.",
      severity: "error"
    });
  }

  // 4. Notion 2.0 dot chaining method checks
  // e.g., using .sum instead of .sum()
  const invalidChainedNoParens = /\.(sum|mean|min|max|length|flat|reverse|unique|sort|slice|first|last|join|concat|lowercase|uppercase)(?![a-zA-Z0-9_$]*\()/gi;
  if (invalidChainedNoParens.test(formula)) {
    errors.push({
      message: "Notion 2.0 Pitfall: Chained collection aggregators must be invoked as functions with parentheses.",
      severity: "warning",
      suggestion: "Replace .sum with .sum(), .length with .length(), etc."
    });
  }

  // 5. "property(" instead of "prop("
  const legacyPropCheck = /property\s*\(/i;
  if (legacyPropCheck.test(formula)) {
    errors.push({
      message: "Legacy Syntax Alert: Notion formulas use 'prop()' instead of 'property()'.",
      severity: "error",
      suggestion: "Change property(...) to prop(...)."
    });
  }

  // 6. Map without current check
  if (formula.toLowerCase().includes("map(") && !formula.toLowerCase().includes("current")) {
    errors.push({
      message: "Iterative Reference: Using 'map()' usually requires the 'current' variable to reference current iteration items.",
      severity: "warning",
      suggestion: "E.g., map(filter(prop(\"Health Logs\"), current...), current.prop(\"Value\"))"
    });
  }

  // 7. Assignment instead of comparison
  const assignmentInProp = /prop\("[^"]+"\)\s*=\s*[^=]/i;
  if (assignmentInProp.test(formula)) {
    errors.push({
      message: "Equality Error: Direct assignment '='. Use comparison operator '==' or '===' to test equality.",
      severity: "error",
      suggestion: "Change '=' to '==' or '==='."
    });
  }

  return errors;
}
