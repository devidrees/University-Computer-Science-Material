using Microsoft.UI.Xaml;
using Microsoft.UI.Xaml.Controls;

namespace WinUI_Calculator
{
    public sealed partial class MainWindow : Window
    {
        double lastNumber, result;
        string selectedOperator;

        public MainWindow()
        {
            this.InitializeComponent();
            txtDisplay.Text = "0";
        }

        private void btn_Click(object sender, RoutedEventArgs e)
        {
            var button = (Button)sender;
            if (txtDisplay.Text == "0")
            {
                txtDisplay.Text = button.Content.ToString();
            }
            else
            {
                txtDisplay.Text += button.Content.ToString();
            }
        }

        private void Operator_Click(object sender, RoutedEventArgs e)
        {
            var button = (Button)sender;
            selectedOperator = button.Content.ToString();
            lastNumber = double.Parse(txtDisplay.Text);
            txtDisplay.Text = "0";
        }

        private void btnEqual_Click(object sender, RoutedEventArgs e)
        {
            double newNumber;
            if (double.TryParse(txtDisplay.Text, out newNumber))
            {
                switch (selectedOperator)
                {
                    case "+":
                        result = lastNumber + newNumber;
                        break;
                    case "-":
                        result = lastNumber - newNumber;
                        break;
                    case "*":
                        result = lastNumber * newNumber;
                        break;
                    case "/":
                        result = lastNumber / newNumber;
                        break;
                }
                txtDisplay.Text = result.ToString();
            }
        }

        private void btnClear_Click(object sender, RoutedEventArgs e)
        {
            txtDisplay.Text = "0";
            lastNumber = 0;
            result = 0;
        }
    }
}

