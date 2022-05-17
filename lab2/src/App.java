import java.awt.image.BufferedImage;
import java.awt.image.DataBufferByte;
import java.awt.image.WritableRaster;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.BitSet;

import javax.imageio.ImageIO;

public class App {
    public static void main(String[] args) {
        Frame frame = new Frame();

        String s = "%";
        String registerText = "111000";
        File pic = new File("./TCP_IP.png");
        

        // byte[] bytes = extractBytes(pic.toString()) || s.getBytes();//!Extract bytes

        int bitIndex = 0;
        BitSet bs = new BitSet(s.length());
        byte[] bytes = s.getBytes();
        // StringBuilder binary = new StringBuilder();
        for (int j = 0; j < bytes.length; j++) {
            int val = bytes[j];
            for (int i = 0; i < 8; i++) {
                val <<= 1;
                if ((val & 128) != 0)
                    bs.set(bitIndex);
/*                 if ((val & 128) == 0) {
                    binary.append(0);
                } else {
                    bs.set(bitIndex);
                    binary.append(1);
                } */
                bitIndex++;
            }
        }


        System.out.println("'" + s + "' to binary: " + displayBitSet(bs));
        System.out.println(xorIndexes(bs, 1,6,6,6));
    }

    public static String displayBitSet(BitSet bitSet) {
        String readable = "";
        for (int i = 0; i < bitSet.length(); i++) {
            readable += bitSet.get(i) == true ? "1" : "0";
        }
        return readable;
    }

    public static boolean xorIndexes(BitSet bits, int ... indexes) {
        return bits.get(indexes[0]) ^ bits.get(indexes[1]) ^ bits.get(indexes[2]) ^ bits.get(indexes[3]);
    }

    public static byte[] extractBytes(String ImageName) throws IOException {
        // open image
        File imgPath = new File(ImageName);
        BufferedImage bufferedImage = ImageIO.read(imgPath);

        // get DataBufferBytes from Raster
        WritableRaster raster = bufferedImage.getRaster();
        DataBufferByte data = (DataBufferByte) raster.getDataBuffer();

        return (data.getData());
    }

}
