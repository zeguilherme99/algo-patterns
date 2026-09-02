package io.github.zeguilherme99.algopatterns.slidingwindow;

import io.github.zeguilherme99.algopatterns.trace.Trace;
import io.github.zeguilherme99.algopatterns.trace.Traceable;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

import static io.github.zeguilherme99.algopatterns.trace.Trace.kv;

/**
 * Variable-size sliding window with a lookup map (the "jump the left pointer" variant).
 * <p>
 * Given a string, find the length of the longest substring with no repeated characters.
 */
public final class LongestSubstringWithoutRepeating implements Traceable {

    public static final String ID = "sliding-window/longest-substring-without-repeating";

    static final String SNIPPET = """
            int longest(String s) {
                Map<Character, Integer> lastSeen = new HashMap<>();
                int left = 0, best = 0;
                for (int right = 0; right < s.length(); right++) {
                    char c = s.charAt(right);
                    if (lastSeen.containsKey(c) && lastSeen.get(c) >= left) {
                        left = lastSeen.get(c) + 1;          // jump past the duplicate
                    }
                    lastSeen.put(c, right);
                    best = Math.max(best, right - left + 1); // record
                }
                return best;
            }""";

    public int longest(String s) {
        return (int) trace(s).getResult();
    }

    public Trace trace(String s) {
        Trace t = new Trace(ID, "sliding-window",
                "Longest Substring Without Repeating Characters",
                "Given a string, find the length of the longest substring that contains no repeated characters.",
                SNIPPET,
                Map.of("array", s.chars().mapToObj(c -> String.valueOf((char) c)).toList(), "string", s));

        Map<Character, Integer> lastSeen = new HashMap<>();
        int left = 0, best = 0;
        t.step(3, -1, -1, "init", "init", kv(), "best", best, "lastSeen", snapshot(lastSeen));

        for (int right = 0; right < s.length(); right++) {
            char c = s.charAt(right);
            String ch = String.valueOf(c);
            t.step(5, left, right, "expand", "expand", kv("right", right, "c", ch),
                    "c", ch, "best", best, "lastSeen", snapshot(lastSeen));

            if (lastSeen.containsKey(c) && lastSeen.get(c) >= left) {
                int dup = lastSeen.get(c);
                left = dup + 1;
                t.step(7, left, right, "shrink", "shrink", kv("c", ch, "dup", dup, "left", left),
                        "c", ch, "best", best, "lastSeen", snapshot(lastSeen));
            } else if (lastSeen.containsKey(c)) {
                t.step(6, left, right, "check", "check", kv("c", ch, "seen", lastSeen.get(c), "left", left),
                        "c", ch, "best", best, "lastSeen", snapshot(lastSeen));
            }

            lastSeen.put(c, right);
            int len = right - left + 1;
            boolean improved = len > best;
            best = Math.max(best, len);
            t.step(10, left, right, "record", improved ? "record.improved" : "record.notImproved",
                    kv("c", ch, "right", right, "left", left, "len", len),
                    "c", ch, "best", best, "lastSeen", snapshot(lastSeen));
        }
        t.step(12, -1, -1, "done", "done", kv("best", best), "best", best);
        t.finish(best);
        return t;
    }

    private static Map<String, Integer> snapshot(Map<Character, Integer> m) {
        Map<String, Integer> copy = new TreeMap<>();
        m.forEach((k, v) -> copy.put(String.valueOf(k), v));
        return copy;
    }

    @Override
    public List<Trace> examples() {
        return List.of(trace("abcabcbb"));
    }
}
