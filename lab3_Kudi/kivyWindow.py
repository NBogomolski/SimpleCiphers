from kivy.app import App
from kivy.uix.textinput import TextInput
from kivy.uix.button import Button
from kivy.uix.boxlayout import BoxLayout
from kivy.uix.label import Label
from kivy.core.window import Window

import files as f
import rabins as rab

# Setting the size of window
Window.size = (900, 600)
Window.clearcolor = (0.9, 0.9, 0.9, 1)
Window.maximize()

PATH = "D:\\TI\\TI_labs\\lab3_Kudi\\out.txt"
BASE_PATH = "D:\\TI\\TI_labs\\lab3_Kudi\\"


class Window(App):
    def __init__(self, **kwargs):
        super().__init__()
        self.textFieldBKey = None
        self.textFieldQKey = None
        self.textFieldPKey = None
        self.textFieldIn = None
        self.textFieldOut = None
        self.inFileName = ""
        self.outFileName = PATH

    def enc_file(self, instance):
        if self.inFileName == "" or self.outFileName == "":
            self.textFieldIn.text = "Please, select the file"
            return

        # checking for all errors
        try:
            # Getting keys
            p = int(self.textFieldPKey.text)
            q = int(self.textFieldQKey.text)
            b = int(self.textFieldBKey.text)

            rab.check_keys(p, q, b)
            out_bytes = rab.enrypt_rabins(
                self.inFileName, self.outFileName, p, q, b)

            self.textFieldOut.text = " ".join([str(x) for x in out_bytes])
        except ValueError as err:
            self.textFieldOut.text = "KeyError: " + str(err)
        except:
            self.textFieldOut.text = "Unexpected error"

    def dec_file(self, instance):
        if self.inFileName == "" or self.outFileName == "":
            self.textFieldIn.text = "Please, select the file"
            return

            # checking for all errors
        try:
            # Getting keys
            p = int(self.textFieldPKey.text)
            q = int(self.textFieldQKey.text)
            b = int(self.textFieldBKey.text)

            rab.check_keys(p, q, b)
            out_bytes = rab.decrypt_rabins(
                self.inFileName, self.outFileName, p, q, b)

            self.textFieldOut.text = " ".join([str(x) for x in out_bytes])
        except ValueError as err:
            self.textFieldOut.text = "KeyError: " + str(err)
        except:
            self.textFieldOut.text = "Unexpected error"

    def get_binary_file_data(self, instance):
        filePath = str(self.textFieldIn.text)
        filePath = filePath.split("\n")

        if filePath:
            try:
                # self.textFieldIn.text = "Loading..."
                self.inFileName = BASE_PATH + filePath[0].strip()
                if len(filePath) >= 2:
                    self.outFileName = BASE_PATH + filePath[1].strip()

                try:
                    content = f.read_ecnrypted_file(self.inFileName)
                except:
                    content = f.read_binary_file(self.inFileName)
                str_content = " ".join([str(x) for x in content])
                self.textFieldIn.text = ""
                self.textFieldIn.insert_text(str_content)
            except:
                self.textFieldIn.text = "Wrong file name"

    def clearAll(self, instance):
        self.textFieldIn.text = ""
        self.textFieldOut.text = ""
        self.inFileName = ""
        self.outFileName = PATH

    def build(self):
        self.title = "Open key encipherment"  # setting the title to window
        # main Layouts
        # for storing all fields with buttons
        mainLayout = BoxLayout(orientation='vertical')
        # storing horizontally all fields
        generalLayout = BoxLayout(orientation='horizontal')

        # Another layouts
        inFieldLayout = BoxLayout(
            orientation='vertical', padding=20)  # layout of inFields
        outFieldLayout = BoxLayout(
            orientation='vertical', padding=20)  # layout of outFields
        # layout of# layout of start_key field and full kuy field ,padding=[20, 20, 20, 20]
        keyWidgetsLayout = BoxLayout(
            orientation='horizontal', size_hint=(1, 0.05),  padding=[0, 0, 20, 0])
        buttonsLayout = BoxLayout(orientation='horizontal', size_hint=(
            1, 0.15), padding=[40, 20, 40, 40])  #

        # Buttons
        btnLoad = Button(text="Load file", font_size=40,
                         on_press=self.get_binary_file_data)
        btnSave = Button(text="Clear", font_size=40, on_press=self.clearAll)
        btnEncrypt = Button(text="Encrypt", font_size=40,
                            on_press=self.enc_file)
        btnDecrypt = Button(text="Decrypt", font_size=40,
                            on_press=self.dec_file)

        # Labels
        lblPKey = Label(text="p:", size_hint=(0.3, 1), font_size=40)
        lblQKey = Label(text="q:", size_hint=(0.3, 1), font_size=40)
        lblBKey = Label(text="b:", size_hint=(0.3, 1), font_size=40)
        lblInFile = Label(text="Initial file",
                          size_hint=(1, 0.1), font_size=40)
        lblOutFile = Label(text="Out file", size_hint=(1, 0.1), font_size=40)

        lblPKey.color = [0, 0, 0, 1]
        lblQKey.color = [0, 0, 0, 1]
        lblBKey.color = [0, 0, 0, 1]
        lblInFile.color = [0, 0, 0, 1]
        lblOutFile.color = [0, 0, 0, 1]

        # TextInputs
        self.textFieldIn = TextInput()  # field of content of initial file
        self.textFieldOut = TextInput()  # field of content of out file
        self.textFieldPKey = TextInput(multiline=False, size_hint=(1, 1), font_size=28)
        self.textFieldQKey = TextInput(multiline=False, size_hint=(1, 1), font_size=28)
        self.textFieldBKey = TextInput(multiline=False, size_hint=(1, 1), font_size=28)

        # relative font size
        font_size_general = 20
        self.textFieldIn.font_size = font_size_general
        self.textFieldOut.font_size = font_size_general

        keyWidgetsLayout.add_widget(lblPKey)
        keyWidgetsLayout.add_widget(self.textFieldPKey)
        keyWidgetsLayout.add_widget(lblQKey)
        keyWidgetsLayout.add_widget(self.textFieldQKey)
        keyWidgetsLayout.add_widget(lblBKey)
        keyWidgetsLayout.add_widget(self.textFieldBKey)

        inFieldLayout.add_widget(lblInFile)
        inFieldLayout.add_widget(self.textFieldIn)

        outFieldLayout.add_widget(lblOutFile)
        outFieldLayout.add_widget(self.textFieldOut)

        buttonsLayout.add_widget(btnLoad)
        buttonsLayout.add_widget(btnSave)
        buttonsLayout.add_widget(btnEncrypt)
        buttonsLayout.add_widget(btnDecrypt)

        # generalLayout.add_widget(keyWidgetsLayout)
        generalLayout.add_widget(inFieldLayout)
        generalLayout.add_widget(outFieldLayout)


        mainLayout.add_widget(generalLayout)
        mainLayout.add_widget(keyWidgetsLayout)
        mainLayout.add_widget(buttonsLayout)

        return mainLayout


Window().run()
