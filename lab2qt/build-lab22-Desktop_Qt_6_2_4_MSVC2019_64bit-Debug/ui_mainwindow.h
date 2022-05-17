/********************************************************************************
** Form generated from reading UI file 'mainwindow.ui'
**
** Created by: Qt User Interface Compiler version 6.2.4
**
** WARNING! All changes made in this file will be lost when recompiling UI file!
********************************************************************************/

#ifndef UI_MAINWINDOW_H
#define UI_MAINWINDOW_H

#include <QtCore/QVariant>
#include <QtWidgets/QApplication>
#include <QtWidgets/QLabel>
#include <QtWidgets/QLineEdit>
#include <QtWidgets/QMainWindow>
#include <QtWidgets/QMenuBar>
#include <QtWidgets/QPushButton>
#include <QtWidgets/QStatusBar>
#include <QtWidgets/QTextEdit>
#include <QtWidgets/QWidget>

QT_BEGIN_NAMESPACE

class Ui_MainWindow
{
public:
    QWidget *centralwidget;
    QLineEdit *eStRegValue;
    QTextEdit *tKey;
    QTextEdit *tOrFile;
    QTextEdit *tFinFile;
    QPushButton *openFileBtn;
    QLabel *lStRegVal;
    QLabel *lKey;
    QLabel *lOrFile;
    QLabel *lFinFile;
    QMenuBar *menubar;
    QStatusBar *statusbar;

    void setupUi(QMainWindow *MainWindow)
    {
        if (MainWindow->objectName().isEmpty())
            MainWindow->setObjectName(QString::fromUtf8("MainWindow"));
        MainWindow->resize(1010, 600);
        centralwidget = new QWidget(MainWindow);
        centralwidget->setObjectName(QString::fromUtf8("centralwidget"));
        eStRegValue = new QLineEdit(centralwidget);
        eStRegValue->setObjectName(QString::fromUtf8("eStRegValue"));
        eStRegValue->setGeometry(QRect(20, 40, 401, 26));
        tKey = new QTextEdit(centralwidget);
        tKey->setObjectName(QString::fromUtf8("tKey"));
        tKey->setGeometry(QRect(510, 40, 481, 61));
        tOrFile = new QTextEdit(centralwidget);
        tOrFile->setObjectName(QString::fromUtf8("tOrFile"));
        tOrFile->setGeometry(QRect(20, 170, 461, 291));
        tFinFile = new QTextEdit(centralwidget);
        tFinFile->setObjectName(QString::fromUtf8("tFinFile"));
        tFinFile->setGeometry(QRect(510, 170, 471, 291));
        openFileBtn = new QPushButton(centralwidget);
        openFileBtn->setObjectName(QString::fromUtf8("openFileBtn"));
        openFileBtn->setGeometry(QRect(20, 480, 181, 51));
        QFont font;
        font.setPointSize(12);
        openFileBtn->setFont(font);
        lStRegVal = new QLabel(centralwidget);
        lStRegVal->setObjectName(QString::fromUtf8("lStRegVal"));
        lStRegVal->setGeometry(QRect(20, 10, 311, 20));
        lStRegVal->setFont(font);
        lKey = new QLabel(centralwidget);
        lKey->setObjectName(QString::fromUtf8("lKey"));
        lKey->setGeometry(QRect(460, 50, 41, 31));
        lKey->setFont(font);
        lOrFile = new QLabel(centralwidget);
        lOrFile->setObjectName(QString::fromUtf8("lOrFile"));
        lOrFile->setGeometry(QRect(150, 130, 161, 31));
        lOrFile->setFont(font);
        lFinFile = new QLabel(centralwidget);
        lFinFile->setObjectName(QString::fromUtf8("lFinFile"));
        lFinFile->setGeometry(QRect(620, 140, 241, 20));
        lFinFile->setFont(font);
        MainWindow->setCentralWidget(centralwidget);
        menubar = new QMenuBar(MainWindow);
        menubar->setObjectName(QString::fromUtf8("menubar"));
        menubar->setGeometry(QRect(0, 0, 1010, 26));
        MainWindow->setMenuBar(menubar);
        statusbar = new QStatusBar(MainWindow);
        statusbar->setObjectName(QString::fromUtf8("statusbar"));
        MainWindow->setStatusBar(statusbar);

        retranslateUi(MainWindow);

        QMetaObject::connectSlotsByName(MainWindow);
    } // setupUi

    void retranslateUi(QMainWindow *MainWindow)
    {
        MainWindow->setWindowTitle(QCoreApplication::translate("MainWindow", "MainWindow", nullptr));
        openFileBtn->setText(QCoreApplication::translate("MainWindow", "Open file", nullptr));
        lStRegVal->setText(QCoreApplication::translate("MainWindow", "Original register value", nullptr));
        lKey->setText(QCoreApplication::translate("MainWindow", "Key", nullptr));
        lOrFile->setText(QCoreApplication::translate("MainWindow", "Original file", nullptr));
        lFinFile->setText(QCoreApplication::translate("MainWindow", "Reformed file", nullptr));
    } // retranslateUi

};

namespace Ui {
    class MainWindow: public Ui_MainWindow {};
} // namespace Ui

QT_END_NAMESPACE

#endif // UI_MAINWINDOW_H
