package io.github.zeguilherme99.algopatterns.slidingwindow;

import io.github.zeguilherme99.algopatterns.trace.Trace;
import io.github.zeguilherme99.algopatterns.trace.Traceable;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

/**
 * Fixed-size sliding window.
 * <p>
 * Given an array and an integer k, find the maximum sum of any contiguous subarray of size k.
 * The window always holds exactly k elements once it is "full": every time the right pointer
 * adds one element, the left pointer drops one.
 */
public final class MaxSumSubarrayOfSizeK implements Traceable {

    static final String SNIPPET = """
            int maxSum(int[] nums, int k) {
                int sum = 0, best = Integer.MIN_VALUE;
                for (int right = 0; right < nums.length; right++) {
                    sum += nums[right];                 // expand: add the new element
                    if (right >= k - 1) {               // window has k elements
                        best = Math.max(best, sum);     // record the answer
                        sum -= nums[right - k + 1];     // shrink: drop the leftmost
                    }
                }
                return best;
            }""";

    public int maxSum(int[] nums, int k) {
        return (int) trace(nums, k).getResult();
    }

    public Trace trace(int[] nums, int k) {
        Trace t = new Trace(
                "sliding-window/max-sum-subarray-of-size-k",
                "sliding-window",
                "Maximum Sum Subarray of Size K",
                "Given an array of integers and a number k, find the maximum sum of any contiguous subarray of size k.",
                SNIPPET,
                Map.of("array", Arrays.stream(nums).boxed().toList(), "k", k));

        int sum = 0, best = Integer.MIN_VALUE;
        t.step(2, -1, -1, "init", "Start with an empty window. sum = 0, best = -∞.", "sum", sum, "best", null);

        for (int right = 0; right < nums.length; right++) {
            int left = Math.max(0, right - k + 1);
            sum += nums[right];
            t.step(4, left, right, "expand",
                    "Move right to " + right + " and add nums[" + right + "] = " + nums[right] + " to the sum.",
                    "sum", sum, "best", best == Integer.MIN_VALUE ? null : best);

            if (right >= k - 1) {
                boolean improved = sum > best;
                best = Math.max(best, sum);
                t.step(6, left, right, "record",
                        improved ? "Window [" + left + ", " + right + "] has " + k + " elements. sum = " + sum + " is a new best."
                                 : "Window [" + left + ", " + right + "] has " + k + " elements. sum = " + sum + " does not beat best = " + best + ".",
                        "sum", sum, "best", best);

                sum -= nums[left];
                t.step(7, left + 1, right, "shrink",
                        "Drop nums[" + left + "] = " + nums[left] + " from the left so the window keeps size " + k + ".",
                        "sum", sum, "best", best);
            } else {
                t.step(5, left, right, "wait",
                        "Only " + (right + 1) + " element(s) so far; keep expanding until the window has " + k + ".",
                        "sum", sum, "best", null);
            }
        }
        t.step(10, -1, -1, "done", "Every window of size " + k + " was seen. Answer: " + best + ".", "best", best);
        t.finish(best);
        return t;
    }

    @Override
    public List<Trace> examples() {
        return List.of(trace(new int[]{2, 1, 5, 1, 3, 2}, 3));
    }
}
