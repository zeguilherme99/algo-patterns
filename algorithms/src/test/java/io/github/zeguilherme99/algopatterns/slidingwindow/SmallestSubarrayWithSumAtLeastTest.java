package io.github.zeguilherme99.algopatterns.slidingwindow;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class SmallestSubarrayWithSumAtLeastTest {

    private final SmallestSubarrayWithSumAtLeast algo = new SmallestSubarrayWithSumAtLeast();

    @Test
    void findsSmallestWindow() {
        assertEquals(2, algo.minLength(new int[]{2, 1, 5, 2, 3, 2}, 7));
        assertEquals(1, algo.minLength(new int[]{2, 1, 5, 2, 8}, 7));
        assertEquals(3, algo.minLength(new int[]{3, 4, 1, 1, 6}, 8));
    }

    @Test
    void returnsZeroWhenImpossible() {
        assertEquals(0, algo.minLength(new int[]{1, 1, 1}, 10));
    }

    @Test
    void traceResultMatches() {
        assertEquals(2, algo.trace(new int[]{2, 1, 5, 2, 3, 2}, 7).getResult());
    }
}
