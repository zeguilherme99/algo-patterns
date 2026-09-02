package io.github.zeguilherme99.algopatterns.slidingwindow;

import io.github.zeguilherme99.algopatterns.trace.Trace;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

class MaxSumSubarrayOfSizeKTest {

    private final MaxSumSubarrayOfSizeK algo = new MaxSumSubarrayOfSizeK();

    @Test
    void findsMaxSumWindow() {
        assertEquals(9, algo.maxSum(new int[]{2, 1, 5, 1, 3, 2}, 3));
        assertEquals(7, algo.maxSum(new int[]{2, 3, 4, 1, 5}, 2));
    }

    @Test
    void windowEqualToArrayLength() {
        assertEquals(6, algo.maxSum(new int[]{1, 2, 3}, 3));
    }

    @Test
    void handlesNegativeNumbers() {
        assertEquals(-1, algo.maxSum(new int[]{-3, -1, -2}, 1));
    }

    @Test
    void traceIsWellFormed() {
        Trace t = algo.trace(new int[]{2, 1, 5, 1, 3, 2}, 3);
        assertEquals(9, t.getResult());
        assertTrue(t.getSteps().size() > 6);
        t.getSteps().forEach(s -> {
            assertNotNull(s.key());
            assertFalse(s.key().isBlank(), "every step needs a message key");
            assertNotNull(s.params());
            if (s.left() >= 0) assertTrue(s.left() <= s.right(), "left must not pass right: " + s);
        });
        assertEquals("record.improved", t.getSteps().get(6).key());
    }
}
