package io.github.zeguilherme99.algopatterns.practice;

import io.github.zeguilherme99.algopatterns.slidingwindow.LongestSubstringWithoutRepeating;
import io.github.zeguilherme99.algopatterns.slidingwindow.MaxSumSubarrayOfSizeK;
import io.github.zeguilherme99.algopatterns.slidingwindow.SmallestSubarrayWithSumAtLeast;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;

import java.util.Random;

import static org.junit.jupiter.api.Assertions.assertEquals;

/**
 * Your solutions in {@link SlidingWindowExercises} are checked against the reference implementations,
 * first on hand-picked cases and then on random inputs.
 * Run with: mvn test -Ppractice
 */
@Tag("practice")
class SlidingWindowExercisesTest {

    private final SlidingWindowExercises yours = new SlidingWindowExercises();
    private final Random random = new Random(42);

    @Test
    void maxSumSubarrayOfSizeK() {
        MaxSumSubarrayOfSizeK ref = new MaxSumSubarrayOfSizeK();
        assertEquals(9, yours.maxSumSubarrayOfSizeK(new int[]{2, 1, 5, 1, 3, 2}, 3));
        for (int i = 0; i < 200; i++) {
            int[] nums = randomArray(1, 12, -10, 10);
            int k = 1 + random.nextInt(nums.length);
            assertEquals(ref.maxSum(nums, k), yours.maxSumSubarrayOfSizeK(nums, k), "nums=" + java.util.Arrays.toString(nums) + " k=" + k);
        }
    }

    @Test
    void smallestSubarrayWithSumAtLeast() {
        SmallestSubarrayWithSumAtLeast ref = new SmallestSubarrayWithSumAtLeast();
        assertEquals(2, yours.smallestSubarrayWithSumAtLeast(new int[]{2, 1, 5, 2, 3, 2}, 7));
        for (int i = 0; i < 200; i++) {
            int[] nums = randomArray(1, 12, 1, 10);
            int target = 1 + random.nextInt(30);
            assertEquals(ref.minLength(nums, target), yours.smallestSubarrayWithSumAtLeast(nums, target), "nums=" + java.util.Arrays.toString(nums) + " target=" + target);
        }
    }

    @Test
    void longestSubstringWithoutRepeating() {
        LongestSubstringWithoutRepeating ref = new LongestSubstringWithoutRepeating();
        assertEquals(3, yours.longestSubstringWithoutRepeating("abcabcbb"));
        for (int i = 0; i < 200; i++) {
            StringBuilder sb = new StringBuilder();
            int len = random.nextInt(15);
            for (int j = 0; j < len; j++) sb.append((char) ('a' + random.nextInt(5)));
            String s = sb.toString();
            assertEquals(ref.longest(s), yours.longestSubstringWithoutRepeating(s), "s=" + s);
        }
    }

    private int[] randomArray(int minLen, int maxLen, int minVal, int maxVal) {
        int len = minLen + random.nextInt(maxLen - minLen + 1);
        int[] a = new int[len];
        for (int i = 0; i < len; i++) a[i] = minVal + random.nextInt(maxVal - minVal + 1);
        return a;
    }
}
