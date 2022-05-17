#include "mainwindow.h"
#include "ui_mainwindow.h"
#include <QMessageBox>
#include <QString>
#include <QDebug>
#include <QFileDialog>
#include <QBitArray>
#define POLINOMIAL_POWER 34

MainWindow::MainWindow(QWidget *parent)
    : QMainWindow(parent)
    , ui(new Ui::MainWindow)
{
    ui->setupUi(this);
}

MainWindow::~MainWindow()
{
    delete ui;
}

void MainWindow::on_openFileBtn_released()
{
    //Removing wrong symbols
    QString baseKey = ui->eStRegValue->text();
    int length = baseKey.length();
    for (int i = 0; i < length; i++)
        if (baseKey[i] != '0' && baseKey[i] != '1')
        {
            baseKey.remove(i, 1);
            i--;
            length--;
        }

    ui->eStRegValue->setText(baseKey);
    //Check baseKey
    if (length == 0)
    {
        QMessageBox::warning(this, "Ошибка", "Введите начальное значение регистра");
        return;
    }
    if (length != POLINOMIAL_POWER)
    {
        QString message = "Длина ключа должна быть равна 34 (сейчас ";
        message.append(QString::number(length));
        message.append(")");
        QMessageBox::warning(this, "Ошибка", message);
        return;
    }

    //Open file to cipher/decipher
    QString fileName = QFileDialog::getOpenFileName(this, "Открыть файл", ".");
    QFile openedFile(fileName);

    if (!openedFile.open(QIODevice::ReadOnly))
    {
        QMessageBox::warning(this, "Ошибка", "Не удалось открыть файл");
        return;
    }

    //Constants
    const QChar ZERO = '0';
    const int ZERO_CODE = ZERO.toLatin1();

    //Create bits array
    QString initialToBinaryStr = "", keyToBinaryStr = ui->eStRegValue->text(), convertedToBinaryStr = "";
    QDataStream openStream(&openedFile);
    QByteArray fileData;
    fileData.reserve(openedFile.size());
    int bufferSize = 1024;
    uint readBytes = 0;
    char* bufChar = new char[bufferSize];
    do
    {
        readBytes = openStream.readRawData(bufChar, bufferSize);
        fileData.append(bufChar, readBytes);
    }   while (readBytes > 0);
    delete[] bufChar;

    QBitArray initialToBinary;
    int bitsAmount = openedFile.size() * CHAR_BIT;
    initialToBinary = QBitArray::fromBits(fileData, openedFile.size() * CHAR_BIT);

    for (int i = 0; i < bitsAmount; i++)
            initialToBinaryStr.append((char)(ZERO_CODE + initialToBinary.testBit(i)));
    ui->tOrFile->setText(initialToBinaryStr);

    QBitArray reg(POLINOMIAL_POWER), key(bitsAmount), convertedToBinary(bitsAmount);

    //Base key to binary code
    for (int i = 0; i < POLINOMIAL_POWER; i++)
        reg.setBit(i, baseKey[i].toLatin1() - ZERO_CODE);

    //Key generation
    int min = POLINOMIAL_POWER;
    if (min > bitsAmount)
        min = bitsAmount;
    for (int i = 0; i < min; i++)
        key.setBit(i, reg.testBit(i));

    int next;
    for (int i = POLINOMIAL_POWER; i < bitsAmount; i++)
    {
        next = reg.testBit(33) ^ reg.testBit(14) ^ reg.testBit(13) ^ reg.testBit(0);
        key.setBit(i, next);
        keyToBinaryStr.append((QChar)(ZERO_CODE + next));
        for (int j = POLINOMIAL_POWER - 1; j > 0; j--)
            reg.setBit(j, reg.testBit(j - 1));
        reg.setBit(0, next);
    }
    keyToBinaryStr = keyToBinaryStr.mid(0, bitsAmount);
    ui->tKey->setText(keyToBinaryStr);

    //Conversion
    convertedToBinary = initialToBinary ^ key;
    for (int i = 0; i < bitsAmount; i++)
        convertedToBinaryStr.append((QChar)(ZERO_CODE + convertedToBinary.testBit(i)));
    ui->tFinFile->setText(convertedToBinaryStr);

    //Saving
    QString FileToSave = "Result file";
    QFile saveFile(FileToSave);
    QDataStream saveStream(&saveFile);
    if (!saveFile.open(QIODevice::WriteOnly))
    {
        QMessageBox::warning(this, "Ошибка", "Нельзя создать файл");
        return;
    }
    fileData = QByteArray::fromRawData(convertedToBinary.bits(), bitsAmount / 8);
    saveFile.write(fileData);
    openedFile.close();
    saveFile.close();
}

