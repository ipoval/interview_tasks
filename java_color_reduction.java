/**
*  Color reduction mock from 255 colors to 5 colors - test for Bitcoint exchange terminal
*/
public class ColorReducer {
  private int red;
  private int blue;
  private int green;

  /**
  * @param red the red value [0.255]
  * @param green the green value [0.255]
  * @param blue the blue value [0.255]
  */
  public Color(int red, int blue, int green) {
    this.red   = red;
    this.blue  = blue;
    this.green = green;
  }

  /**
  *  Convert to only values [0, 51, 102, 153, 204, 255] for red, blue, green
  */
  public void reduce() {
    this.red   = (this.red * 6 / 256) * 51;
    this.green = (this.red * 6 / 256) * 51;
    this.blue  = (this.red * 6 / 256) * 51;
  }

  /**
   * Turns this color into the equivalent gray value.
   */
  public void turnGray()
  {
      // Changes this color to its equivalent gray value.
      // The red, green, and blue variables should all be
      // set to the gray level, which is computed as a weighted
      // average of the original red, blue, and green levels.
      // The weights (corresponding to the sensitivity of the
      // cone cells in the human eye) are:
      // red - 0.2126
      // green - 0.7152
      // blue - 0.0722
      int gray = (int) (0.2126 * this.red + 0.7152 * this.green + 0.0722 * this.blue);
      this.red = gray;
      this.green = gray;
      this.blue = gray;
  }

  public static final Color RED        = new Color(255, 0, 0);
  public static final Color GREEN      = new Color(0, 255, 0);
  public static final Color BLUE       = new Color(0, 0, 255);
  public static final Color WHITE      = new Color(255, 255, 255);
  public static final Color LIGHT_GRAY = new Color(192, 192, 192);
  public static final Color GRAY       = new Color(128, 128, 128);
  public static final Color DARK_GRAY  = new Color(64, 64, 64);
  public static final Color BLACK      = new Color(0, 0, 0);
  public static final Color CYAN       = new Color(0, 255, 255);
  public static final Color MAGENTA    = new Color(255, 0, 255);
  public static final Color YELLOW     = new Color(255, 255, 0);
  public static final Color PINK       = new Color(255, 175, 175);
  public static final Color ORANGE     = new Color(255, 200, 0);
}
