public class BasketGuess {

    public static void main(String[] args) {
        int minDifference = Integer.MAX_VALUE;
        int closestX = 0;
        int closestY = 0;
        int closestZ = 0;
        for (int x = 1; x <= 100; x++) {
            for (int y = 1; y <= 100; y++) {
                for (int z = 1; z <= 100; z++) {
                    int sum = x * 15 + y * 55 + z * 3;
                    int currDifference = Math.abs(10100 - sum);
                    if (currDifference < minDifference) {
                        minDifference = currDifference;
                        closestX = x;
                        closestY = y;
                        closestZ = z;

                    }
                    if (sum == 10100)
                        System.out.println("x: " + x + ", y: " + y);

                }
            }
        }
        System.out.println("x: " + closestX);
        System.out.println("y: " + closestY);
        System.out.println("z: " + closestZ);
        System.exit(0);
    }
}