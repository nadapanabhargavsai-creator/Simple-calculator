package com.calculator;
import org.springframework.stereotype.Service;
 
@Service
public class CalculatorService {
 
    /**
     * Performs the calculation based on operator.
     * Supported operators: +, -, *, /, %
     *
     * @param num1     first number
     * @param num2     second number
     * @param operator one of +  -  *  /  %
     * @return result as double
     * @throws IllegalArgumentException for unknown operator or division by zero
     */
    public double calculate(double num1, double num2, String operator) {
        return switch (operator) {
            case "+" -> num1 + num2;
            case "-" -> num1 - num2;
            case "*" -> num1 * num2;
            case "/" -> {
                if (num2 == 0) throw new IllegalArgumentException("Division by zero is not allowed.");
                yield num1 / num2;
            }
            case "%" -> num1 % num2;
            default  -> throw new IllegalArgumentException("Unknown operator: " + operator);
        };
    }
}