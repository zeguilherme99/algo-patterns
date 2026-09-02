package io.github.zeguilherme99.algopatterns.trace;

import java.util.Map;

/**
 * One frame of an algorithm's execution.
 *
 * @param line    1-based line of the {@code snippet} being executed (drives code highlighting)
 * @param left    left pointer / window start (inclusive), or -1 if not applicable
 * @param right   right pointer / window end (inclusive), or -1 if not applicable
 * @param action  short machine-readable label, e.g. "expand", "shrink", "record"
 * @param message human-readable explanation of what just happened
 * @param vars    snapshot of the interesting local variables after this step
 */
public record Step(int line, int left, int right, String action, String message, Map<String, Object> vars) {
}
