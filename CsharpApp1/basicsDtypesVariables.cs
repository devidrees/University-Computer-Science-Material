// syntax for variables in c#

// type variableName

int age;
age = 25;

int sNumber = 30;

// case sensetive var names
Age = 80;

// value types
int num = 10;
double pi = 3.14;
char letter = 'Z';
bool isActive = true;
float temp =35.56f;

// Reference Types: These store references(pointers) to the data, not the data itself
// sequence of characters
string greeting = "Hello bishes!";
// base type for all data types in C# 
// can hold any type of data
object anything = 45.6;

// you can make value types nullable using the ? modifier:
int? paisa = null;

// Operators in C#
// a. Arithmetic Operators
int sum = 5 + 3; // Result: 8
int difference = 10 - 4;
int product = 4 * 2;
int quotient = 10 / 2; // Result: 5
int remainder = 10 % 3; // Result: 1
bool isEqual = 5 == 5;  // Result: true
bool isNotEqual = 5 != 3;  // Result: true
bool isGreaterThan = 5 > 3;  // Result: true
bool isGreaterOrEqual = 5 >= 5;  // Result: true
bool isLessThan = 3 < 5;  // Result: true
bool isLessOrEqual = 3 <= 5;  // Result: true

// c. Logical Operators
bool andResult = true && false;  // Result: false
bool orResult = true || false;  // Result: true
bool notResult = !true;  // Result: false

// d. Assignment Operators
int x = 10;  // Assigns 10 to x
x += 5;  // Equivalent to x = x + 5
x -= 3;  // Equivalent to x = x - 3
x *= 2;  // Equivalent to x = x * 2
x /= 2;  // Equivalent to x = x / 2

// e. Conditional (Ternary) Operator
// condition ? expressionIfTrue : expressionIfFalse;

int result = (x > 5) ? 10 : 20;  // If x > 5, result is 10; otherwise, it's 20

// Examplse:
int number = 10;
string result = (number % 2 == 0) ? "Even" : "Odd";
Console.WriteLine(result);  // Output: Even
