package io.github.zeguilherme99.algopatterns.trace;

import java.util.Map;

/**
 * One frame of an algorithm's execution.
 * <p>
 * Steps carry no human-readable text. The frontend looks up {@code key} in the active language's
 * dictionary (e.g. {@code traces.<traceId>.steps.record.improved}) and interpolates {@code params}
 * and {@code vars} into the template, so every message is translatable without touching Java.
 *
 * @param line   1-based line of the {@code snippet} being executed (drives code highlighting)
 * @param left   left pointer / window start (inclusive), or -1 if not applicable
 * @param right  right pointer / window end (inclusive), or -1 if not applicable
 * @param action short machine-readable label, e.g. "expand", "shrink", "record"
 * @param key    message key, dot-separated, resolved by the frontend dictionaries
 * @param params values interpolated into the message template
 * @param vars   snapshot of the interesting local variables after this step
 */
public record Step(int line, int left, int right, String action, String key,
                   Map<String, Object> params, Map<String, Object> vars) {
}
