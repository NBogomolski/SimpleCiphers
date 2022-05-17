using System.Numerics;
using System.Text;
namespace ElectronicDigitalSignature
{
    public partial class MainForm : Form
    {
        public MainForm()
        {
            InitializeComponent();
        }
        public static decimal Power(decimal numBase, decimal power, decimal modulus)
        {
            decimal result = 1;
            while (power > 0)
            {
                while (power % 2 == 0)
                {
                    power /= 2;
                    numBase = (numBase % modulus) * (numBase % modulus) % modulus;
                }
                power--;
                result = result * numBase % modulus;
            }
            return result;
        }
        public static bool IsPrime(decimal p)
        {
            decimal randomNum;
            if (p == 2) return true;
            if (p % 2 == 0 || p == 1)
                return false;
            Random r = new Random();
            for (int i = 0; i < 100; i++)
            {
                randomNum = r.Next() % (p - 2) + 2;
                if (Power(randomNum, p - 1, p) != 1)
                    return false;
            }
            return true;
        }
        public static decimal EulersFunctionForPrimes(decimal p)
        {
            ///USE ONLY IF P IS GUARANTEED TO BE PRIME!!!
            return p - 1;
        }
        public static decimal EulersFunction(decimal n)
        {
            decimal result = n;
            for (decimal i = 2; i * i <= n; ++i)
                if (n % i == 0)
                {
                    while (n % i == 0)
                        n /= i;
                    result -= result / i;
                }
            if (n > 1)
                result -= result / n;
            return result;
        }
        public static decimal GetGCD(decimal a, decimal b)
        {
            decimal t;
            while (b > 0)
            {
                t = b;
                b = a % b;
                a = t;
            }
            return (a);
        }
        public static decimal MultInverse(decimal e, decimal mod)
        {
            decimal g0 = mod, g1 = e, u0 = 1, v0 = 0, u1 = 0, v1 = 1;
            while (g1 != 0)
            {
                decimal y = (UInt64)(g0 / g1);
                decimal gi = g0 - y * g1;
                decimal ui = u0 - y * u1;
                decimal vi = v0 - y * v1;
                g0 = g1;
                g1 = gi;
                u0 = u1;
                u1 = ui;
                v0 = v1;
                v1 = vi;
            }
            decimal x = v0;
            if (x >= 0)
                return x;
            return (x + mod);
        }
        private void CheckValuesButton_Click(object sender, EventArgs ev)
        {
            decimal p = PNumeric.Value;
            decimal q = QNumeric.Value;
            decimal e = ENumeric.Value;
            if (!IsPrime(p))
            {
                MessageBox.Show("P should be a prime number", "Input error");
                return;
            }
            if (!IsPrime(q))
            {
                MessageBox.Show("Q should be a prime number", "Input error");
                return;
            }
            decimal phi_r = 1, r = 1;
            try
            {
                r = p * q;
                phi_r = EulersFunctionForPrimes(p) * EulersFunctionForPrimes(q);
            }
            catch
            {
                MessageBox.Show($"p * q is too large to process", "Input error");
                return;
            }

            if (phi_r < 3)
            {
                MessageBox.Show($"φ ({ phi_r }) leaves no room for 1<e<φ", "Input error");
                return;
            }

            if (e >= phi_r)
            {
                MessageBox.Show($"e should equal less than { phi_r }", "Input error");
                return;
            }
            if (GetGCD(e, phi_r) != 1)
            {
                MessageBox.Show($"e should be relatively prime to { phi_r }", "Input error");
                return;
            }
            decimal d = MultInverse(e, phi_r);
            DTextBox.Text = d.ToString();
            SignFileButton.Enabled = true;
            CheckFileButton.Enabled = true;
        }

        public static decimal getDigest(string text, decimal r)
        {
            decimal h = 100;
            byte[] bytes = Encoding.ASCII.GetBytes(text);
            for (int i = 0; i < text.Length; i++)
                h = (h + bytes[i]) * (h + bytes[i]) % r;
            return h;
        }
        private void SignFileButton_Click(object sender, EventArgs e)
        {
            OpenFileDialog openFileDialog = new OpenFileDialog();
            if (openFileDialog.ShowDialog() != DialogResult.OK)
            {
                return;
            }
            string filename = openFileDialog.FileName;
            string text;
            using (StreamReader reader = new StreamReader(filename))
            {
                text = reader.ReadToEnd();
            }
            textBoxContent.Text = text;
            decimal p = PNumeric.Value;
            decimal q = QNumeric.Value;
            decimal r = p * q;
            decimal d = Convert.ToDecimal(DTextBox.Text);
            decimal digest = getDigest(text, r);
            DigestTextBox.Text = digest.ToString();
            decimal signature = Power(digest, d, r);
            SignatureTextBox.Text = signature.ToString();

            string nativeFilePath = Path.GetDirectoryName(filename);

            using (StreamWriter writer = new StreamWriter(nativeFilePath+"\\signed.txt"))
            {
                writer.WriteLine(text);
                writer.Write(signature.ToString());
            }
        }

        private void PNumeric_ValueChanged(object sender, EventArgs e)
        {
            SignFileButton.Enabled = false;
            CheckFileButton.Enabled = false;
        }

        private void QNumeric_ValueChanged(object sender, EventArgs e)
        {
            SignFileButton.Enabled = false;
            CheckFileButton.Enabled = false;
        }

        private void ENumeric_ValueChanged(object sender, EventArgs e)
        {
            SignFileButton.Enabled = false;
            CheckFileButton.Enabled = false;
        }

        private void CheckFileButton_Click(object sender, EventArgs e)
        {
            OpenFileDialog openFileDialog = new OpenFileDialog();
            if (openFileDialog.ShowDialog() != DialogResult.OK)
            {
                return;
            }
            string filename = openFileDialog.FileName;
            string text;
            decimal fileSignature = 0;
            using (StreamReader reader = new StreamReader(filename))
            {
                try
                {
                    text = reader.ReadToEnd();
                    textBoxContent.Text = text;
                    for (int i = text.Length - 1; i >= 0; i--)
                    {
                        if (text[i] == '\n')
                        {
                            fileSignature = Convert.ToDecimal(text.Substring(i + 1));
                            text = text.Substring(0, i - 1);
                            break;
                        }
                    }
                }
                catch
                {
                    MessageBox.Show("Couldn't sign the file", "Error");
                    return;
                }
            }
            decimal p = PNumeric.Value;
            decimal q = QNumeric.Value;
            decimal r = p * q;
            decimal d = Convert.ToDecimal(DTextBox.Text);
            decimal digest = getDigest(text, r);
            DigestTextBox.Text = digest.ToString();
            decimal signature = Power(digest, d, r);
            SignatureTextBox.Text = signature.ToString();
            if (signature == fileSignature)
            {
                MessageBox.Show("Signatures DO coincide", "Validation results");
            }
            else
            {
                MessageBox.Show($"Signatures DO NOT match\nFile-contained signature: { fileSignature }\nText signature: { signature }", "Validation results");
            }
        }

        private void label5_Click(object sender, EventArgs e)
        {

        }
    }
}