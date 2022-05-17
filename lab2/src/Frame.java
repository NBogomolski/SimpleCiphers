import java.awt.event.ActionListener;
import java.io.File;

import javax.swing.JButton;
import javax.swing.JFileChooser;
import javax.swing.JFrame;
import javax.swing.JPanel;
import javax.swing.JTextArea;
import javax.swing.JTextField;
import javax.swing.filechooser.FileFilter;
import javax.swing.filechooser.FileView;
import javax.swing.plaf.FileChooserUI;
import java.awt.event.ActionEvent;

public class Frame extends JFrame {
    public Frame() {
        setLocation(100, 100);
        setSize(500, 300);
        JPanel panel = new JPanel();
        add(panel);
        JTextField register = new JTextField();
        JButton btnEncrypt = new JButton("Encrypt");
        JButton btOpen = new JButton("Open");
        JTextArea textArea = new JTextArea();
        add(register);
        add(btnEncrypt);
        add(textArea);
        
            btOpen.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                JFileChooser chooser = new JFileChooser();
                if (JFileChooser.APPROVE_OPTION == chooser.showOpenDialog(null)) {
                    File chosen = new File(chooser.getSelectedFile().getAbsolutePath());
                }
            }
        });
        setDefaultCloseOperation(this.EXIT_ON_CLOSE);
        setVisible(true);
    }
}