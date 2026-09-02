package io.github.zeguilherme99.algopatterns.slidingwindow;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class LongestSubstringWithoutRepeatingTest {

    private final LongestSubstringWithoutRepeating algo = new LongestSubstringWithoutRepeating();

    @Test
    void findsLongestUniqueSubstring() {
        assertEquals(3, algo.longest("abcabcbb"));
        assertEquals(1, algo.longest("bbbbb"));
        assertEquals(3, algo.longest("pwwkew"));
        assertEquals(2, algo.longest("abba"));
    }

    @Test
    void emptyString() {
        assertEquals(0, algo.longest(""));
    }
}
