public class BasketGuess {

    public static void main(String[] args) {
        int minDifference = Integer.MAX_VALUE;
        int closest = 0;
        int closestX = 0;
        int closestY = 0;
        for (int x = 1; x <= 100; x++) {
            for (int y = 1; y <= 100; y++) {
                int sum = x * 39 + y * 30;
                int currDifference = Math.abs(10100 - sum);
                if (currDifference < minDifference) {
                    minDifference = currDifference;
                    closest = sum;
                    closestX = x;
                    closestY = y;
                }
                if (sum == 10100) System.out.println("x: " + x + ", y: " + y);
            }
        }
        System.out.println("x: " + closestX);
        System.out.println("y: " + closestY);
        System.exit(0);
    }
}