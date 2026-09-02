package io.github.zeguilherme99.algopatterns.slidingwindow;

import io.github.zeguilherme99.algopatterns.trace.Trace;
import io.github.zeguilherme99.algopatterns.trace.Traceable;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

import static io.github.zeguilherme99.algopatterns.trace.Trace.kv;

/**
 * Fixed-size sliding window.
 * <p>
 * Given an array and an integer k, find the maximum sum of any contiguous subarray of size k.
 * The window always holds exactly k elements once it is "full": every time the right pointer
 * adds one element, the left pointer drops one.
 */
public final class MaxSumSubarrayOfSizeK implements Traceable {

    public static final String ID = "sliding-window/max-sum-subarray-of-size-k";

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
        Trace t = new Trace(ID, "sliding-window",
                "Maximum Sum Subarray of Size K",
                "Given an array of integers and a number k, find the maximum sum of any contiguous subarray of size k.",
                SNIPPET,
                kv("array", Arrays.stream(nums).boxed().toList(), "k", k));

        int sum = 0, best = Integer.MIN_VALUE;
        t.step(2, -1, -1, "init", "init", kv(), "sum", sum, "best", null);

        for (int right = 0; right < nums.length; right++) {
            int left = Math.max(0, right - k + 1);
            sum += nums[right];
            t.step(4, left, right, "expand", "expand", kv("right", right, "value", nums[right]),
                    "sum", sum, "best", best == Integer.MIN_VALUE ? null : best);

            if (right >= k - 1) {
                boolean improved = sum > best;
                best = Math.max(best, sum);
                t.step(6, left, right, "record", improved ? "record.improved" : "record.notImproved",
                        kv("left", left, "right", right, "k", k, "sum", sum, "best", best),
                        "sum", sum, "best", best);

                sum -= nums[left];
                t.step(7, left + 1, right, "shrink", "shrink", kv("index", left, "value", nums[left], "k", k),
                        "sum", sum, "best", best);
            } else {
                t.step(5, left, right, "wait", "wait", kv("count", right + 1, "k", k),
                        "sum", sum, "best", null);
            }
        }
        t.step(10, -1, -1, "done", "done", kv("k", k, "best", best), "best", best);
        t.finish(best);
        return t;
    }

    @Override
    public List<Trace> examples() {
        return List.of(trace(new int[]{2, 1, 5, 1, 3, 2}, 3));
    }
}
