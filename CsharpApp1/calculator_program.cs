using System;

public class Calculator {
    public static void Main(string[] args) {
        Console.WriteLine("Enter first number: ");
        double num1 = Convert.ToDouble(Console.ReadLine());

        Console.WriteLine("Enter an operator (+, -, *, /): ");
        char operatorChar = Console.ReadLine()[0];

        Console.WriteLine("Enter second number: ");
        double num2 = Convert.ToDouble(Console.ReadLine());

        double result;

        switch (operatorChar) {
            case '+':
                result = num1 + num2;
                break;
            case '-':
                result = num1 - num2;
                break;
            case '*':
                result = num1 * num2;
                break;
            case '/':
                if (num2 != 0) {
                    result = num1 / num2;
                } else {
                    Console.WriteLine("Cannot divide by zero!");
                    return;
                }
                break;
            default:
                Console.WriteLine("Invalid operator!");
                return;
        }

        Console.WriteLine("The result is: " + result);
    }
}
