package io.github.zeguilherme99.algopatterns.slidingwindow;

import io.github.zeguilherme99.algopatterns.trace.Trace;
import io.github.zeguilherme99.algopatterns.trace.Traceable;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

import static io.github.zeguilherme99.algopatterns.trace.Trace.kv;

/**
 * Variable-size sliding window (grow until valid, then shrink while still valid).
 * <p>
 * Given an array of positive integers and a target, find the length of the smallest contiguous
 * subarray whose sum is greater than or equal to the target. Return 0 if none exists.
 */
public final class SmallestSubarrayWithSumAtLeast implements Traceable {

    public static final String ID = "sliding-window/smallest-subarray-with-sum-at-least";

    static final String SNIPPET = """
            int minLength(int[] nums, int target) {
                int left = 0, sum = 0, best = Integer.MAX_VALUE;
                for (int right = 0; right < nums.length; right++) {
                    sum += nums[right];                          // expand
                    while (sum >= target) {                      // window is valid
                        best = Math.min(best, right - left + 1); // record
                        sum -= nums[left++];                     // shrink from the left
                    }
                }
                return best == Integer.MAX_VALUE ? 0 : best;
            }""";

    public int minLength(int[] nums, int target) {
        return (int) trace(nums, target).getResult();
    }

    public Trace trace(int[] nums, int target) {
        Trace t = new Trace(ID, "sliding-window",
                "Smallest Subarray With Sum ≥ Target",
                "Given an array of positive integers and a target, find the length of the smallest contiguous subarray whose sum is at least the target.",
                SNIPPET,
                Map.of("array", Arrays.stream(nums).boxed().toList(), "target", target));

        int left = 0, sum = 0, best = Integer.MAX_VALUE;
        t.step(2, -1, -1, "init", "init", kv(), "sum", sum, "best", null);

        for (int right = 0; right < nums.length; right++) {
            sum += nums[right];
            t.step(4, left, right, "expand", sum >= target ? "expand.valid" : "expand.invalid",
                    kv("right", right, "value", nums[right], "sum", sum, "target", target),
                    "sum", sum, "best", best == Integer.MAX_VALUE ? null : best);

            while (sum >= target) {
                int len = right - left + 1;
                boolean improved = len < best;
                best = Math.min(best, len);
                t.step(6, left, right, "record", improved ? "record.improved" : "record.notImproved",
                        kv("left", left, "right", right, "len", len, "best", best),
                        "sum", sum, "best", best);

                sum -= nums[left];
                left++;
                t.step(7, left, right, "shrink", sum >= target ? "shrink.stillValid" : "shrink.invalid",
                        kv("index", left - 1, "value", nums[left - 1], "sum", sum),
                        "sum", sum, "best", best);
            }
        }
        int answer = best == Integer.MAX_VALUE ? 0 : best;
        t.step(10, -1, -1, "done", "done", kv("answer", answer), "best", answer);
        t.finish(answer);
        return t;
    }

    @Override
    public List<Trace> examples() {
        return List.of(trace(new int[]{2, 1, 5, 2, 3, 2}, 7));
    }
}
