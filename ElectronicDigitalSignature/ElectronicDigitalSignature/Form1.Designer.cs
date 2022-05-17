namespace ElectronicDigitalSignature
{
    partial class MainForm
    {
        /// <summary>
        ///  Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        ///  Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        ///  Required method for Designer support - do not modify
        ///  the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.label1 = new System.Windows.Forms.Label();
            this.PNumeric = new System.Windows.Forms.NumericUpDown();
            this.label2 = new System.Windows.Forms.Label();
            this.QNumeric = new System.Windows.Forms.NumericUpDown();
            this.label3 = new System.Windows.Forms.Label();
            this.ENumeric = new System.Windows.Forms.NumericUpDown();
            this.label4 = new System.Windows.Forms.Label();
            this.DTextBox = new System.Windows.Forms.TextBox();
            this.CheckValuesButton = new System.Windows.Forms.Button();
            this.label5 = new System.Windows.Forms.Label();
            this.DigestTextBox = new System.Windows.Forms.TextBox();
            this.label6 = new System.Windows.Forms.Label();
            this.SignatureTextBox = new System.Windows.Forms.TextBox();
            this.SignFileButton = new System.Windows.Forms.Button();
            this.CheckFileButton = new System.Windows.Forms.Button();
            ((System.ComponentModel.ISupportInitialize)(this.PNumeric)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.QNumeric)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.ENumeric)).BeginInit();
            this.SuspendLayout();
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Location = new System.Drawing.Point(10, 18);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(17, 15);
            this.label1.TabIndex = 0;
            this.label1.Text = "p:";
            // 
            // PNumeric
            // 
            this.PNumeric.Location = new System.Drawing.Point(34, 16);
            this.PNumeric.Margin = new System.Windows.Forms.Padding(3, 2, 3, 2);
            this.PNumeric.Maximum = new decimal(new int[] {
            -1593835521,
            466537709,
            54210,
            0});
            this.PNumeric.Minimum = new decimal(new int[] {
            2,
            0,
            0,
            0});
            this.PNumeric.Name = "PNumeric";
            this.PNumeric.Size = new System.Drawing.Size(131, 23);
            this.PNumeric.TabIndex = 1;
            this.PNumeric.Value = new decimal(new int[] {
            2,
            0,
            0,
            0});
            this.PNumeric.ValueChanged += new System.EventHandler(this.PNumeric_ValueChanged);
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Location = new System.Drawing.Point(240, 16);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(17, 15);
            this.label2.TabIndex = 2;
            this.label2.Text = "q:";
            // 
            // QNumeric
            // 
            this.QNumeric.Location = new System.Drawing.Point(263, 16);
            this.QNumeric.Margin = new System.Windows.Forms.Padding(3, 2, 3, 2);
            this.QNumeric.Maximum = new decimal(new int[] {
            268435455,
            1042612833,
            542101086,
            0});
            this.QNumeric.Minimum = new decimal(new int[] {
            2,
            0,
            0,
            0});
            this.QNumeric.Name = "QNumeric";
            this.QNumeric.Size = new System.Drawing.Size(131, 23);
            this.QNumeric.TabIndex = 3;
            this.QNumeric.Value = new decimal(new int[] {
            2,
            0,
            0,
            0});
            this.QNumeric.ValueChanged += new System.EventHandler(this.QNumeric_ValueChanged);
            // 
            // label3
            // 
            this.label3.AutoSize = true;
            this.label3.Location = new System.Drawing.Point(461, 18);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(16, 15);
            this.label3.TabIndex = 4;
            this.label3.Text = "e:";
            // 
            // ENumeric
            // 
            this.ENumeric.Location = new System.Drawing.Point(483, 16);
            this.ENumeric.Margin = new System.Windows.Forms.Padding(3, 2, 3, 2);
            this.ENumeric.Maximum = new decimal(new int[] {
            268435455,
            1042612833,
            542101086,
            0});
            this.ENumeric.Minimum = new decimal(new int[] {
            2,
            0,
            0,
            0});
            this.ENumeric.Name = "ENumeric";
            this.ENumeric.Size = new System.Drawing.Size(131, 23);
            this.ENumeric.TabIndex = 5;
            this.ENumeric.Value = new decimal(new int[] {
            2,
            0,
            0,
            0});
            this.ENumeric.ValueChanged += new System.EventHandler(this.ENumeric_ValueChanged);
            // 
            // label4
            // 
            this.label4.AutoSize = true;
            this.label4.Location = new System.Drawing.Point(81, 53);
            this.label4.Name = "label4";
            this.label4.Size = new System.Drawing.Size(17, 15);
            this.label4.TabIndex = 6;
            this.label4.Text = "d:";
            // 
            // DTextBox
            // 
            this.DTextBox.Location = new System.Drawing.Point(81, 70);
            this.DTextBox.Margin = new System.Windows.Forms.Padding(3, 2, 3, 2);
            this.DTextBox.Name = "DTextBox";
            this.DTextBox.ReadOnly = true;
            this.DTextBox.Size = new System.Drawing.Size(475, 23);
            this.DTextBox.TabIndex = 7;
            // 
            // CheckValuesButton
            // 
            this.CheckValuesButton.Location = new System.Drawing.Point(12, 223);
            this.CheckValuesButton.Margin = new System.Windows.Forms.Padding(3, 2, 3, 2);
            this.CheckValuesButton.Name = "CheckValuesButton";
            this.CheckValuesButton.Size = new System.Drawing.Size(184, 69);
            this.CheckValuesButton.TabIndex = 8;
            this.CheckValuesButton.Text = "Проверить введённые значения";
            this.CheckValuesButton.UseVisualStyleBackColor = true;
            this.CheckValuesButton.Click += new System.EventHandler(this.CheckValuesButton_Click);
            // 
            // label5
            // 
            this.label5.AutoSize = true;
            this.label5.Location = new System.Drawing.Point(81, 103);
            this.label5.Name = "label5";
            this.label5.Size = new System.Drawing.Size(71, 15);
            this.label5.TabIndex = 9;
            this.label5.Text = "Хеш-образ:";
            // 
            // DigestTextBox
            // 
            this.DigestTextBox.Location = new System.Drawing.Point(81, 120);
            this.DigestTextBox.Margin = new System.Windows.Forms.Padding(3, 2, 3, 2);
            this.DigestTextBox.Name = "DigestTextBox";
            this.DigestTextBox.ReadOnly = true;
            this.DigestTextBox.Size = new System.Drawing.Size(475, 23);
            this.DigestTextBox.TabIndex = 10;
            // 
            // label6
            // 
            this.label6.AutoSize = true;
            this.label6.Location = new System.Drawing.Point(81, 154);
            this.label6.Name = "label6";
            this.label6.Size = new System.Drawing.Size(35, 15);
            this.label6.TabIndex = 11;
            this.label6.Text = "ЭЦП:";
            // 
            // SignatureTextBox
            // 
            this.SignatureTextBox.Location = new System.Drawing.Point(81, 172);
            this.SignatureTextBox.Margin = new System.Windows.Forms.Padding(3, 2, 3, 2);
            this.SignatureTextBox.Name = "SignatureTextBox";
            this.SignatureTextBox.ReadOnly = true;
            this.SignatureTextBox.Size = new System.Drawing.Size(475, 23);
            this.SignatureTextBox.TabIndex = 12;
            // 
            // SignFileButton
            // 
            this.SignFileButton.Enabled = false;
            this.SignFileButton.Location = new System.Drawing.Point(220, 223);
            this.SignFileButton.Margin = new System.Windows.Forms.Padding(3, 2, 3, 2);
            this.SignFileButton.Name = "SignFileButton";
            this.SignFileButton.Size = new System.Drawing.Size(184, 67);
            this.SignFileButton.TabIndex = 13;
            this.SignFileButton.Text = "Открыть файл для подписи";
            this.SignFileButton.UseVisualStyleBackColor = true;
            this.SignFileButton.Click += new System.EventHandler(this.SignFileButton_Click);
            // 
            // CheckFileButton
            // 
            this.CheckFileButton.Enabled = false;
            this.CheckFileButton.Location = new System.Drawing.Point(433, 224);
            this.CheckFileButton.Margin = new System.Windows.Forms.Padding(3, 2, 3, 2);
            this.CheckFileButton.Name = "CheckFileButton";
            this.CheckFileButton.Size = new System.Drawing.Size(181, 67);
            this.CheckFileButton.TabIndex = 14;
            this.CheckFileButton.Text = "Открыть файл для проверки подписи";
            this.CheckFileButton.UseVisualStyleBackColor = true;
            this.CheckFileButton.Click += new System.EventHandler(this.CheckFileButton_Click);
            // 
            // MainForm
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(7F, 15F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(631, 303);
            this.Controls.Add(this.CheckFileButton);
            this.Controls.Add(this.SignFileButton);
            this.Controls.Add(this.SignatureTextBox);
            this.Controls.Add(this.label6);
            this.Controls.Add(this.DigestTextBox);
            this.Controls.Add(this.label5);
            this.Controls.Add(this.CheckValuesButton);
            this.Controls.Add(this.DTextBox);
            this.Controls.Add(this.label4);
            this.Controls.Add(this.ENumeric);
            this.Controls.Add(this.label3);
            this.Controls.Add(this.QNumeric);
            this.Controls.Add(this.label2);
            this.Controls.Add(this.PNumeric);
            this.Controls.Add(this.label1);
            this.Margin = new System.Windows.Forms.Padding(3, 2, 3, 2);
            this.Name = "MainForm";
            this.Text = "Электронная Цифровая Подпись";
            ((System.ComponentModel.ISupportInitialize)(this.PNumeric)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.QNumeric)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.ENumeric)).EndInit();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private Label label1;
        private NumericUpDown PNumeric;
        private Label label2;
        private NumericUpDown QNumeric;
        private Label label3;
        private NumericUpDown ENumeric;
        private Label label4;
        private TextBox DTextBox;
        private Button CheckValuesButton;
        private Label label5;
        private TextBox DigestTextBox;
        private Label label6;
        private TextBox SignatureTextBox;
        private Button SignFileButton;
        private Button CheckFileButton;
    }
}