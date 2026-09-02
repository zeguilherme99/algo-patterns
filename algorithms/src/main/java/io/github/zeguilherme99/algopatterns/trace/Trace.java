package io.github.zeguilherme99.algopatterns.trace;

import java.util.ArrayList;
import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/**
 * A complete recording of one algorithm run: metadata, input, result and every {@link Step}.
 * The frontend replays this object; it never re-executes the algorithm.
 * <p>
 * {@code title} and {@code problem} are English fallbacks; the frontend prefers its own dictionaries.
 */
public final class Trace {

    private final String id;
    private final String pattern;
    private final String title;
    private final String problem;
    private final String snippet;
    private final Map<String, Object> input;
    private final List<Step> steps = new ArrayList<>();
    private Object result;

    public Trace(String id, String pattern, String title, String problem, String snippet, Map<String, Object> input) {
        this.id = id;
        this.pattern = pattern;
        this.title = title;
        this.problem = problem;
        this.snippet = snippet;
        this.input = input;
    }

    /**
     * Records a step.
     *
     * @param params message parameters, built with {@link #kv(Object...)}
     * @param vars   variable snapshot as alternating key/value pairs
     */
    public void step(int line, int left, int right, String action, String key, Map<String, Object> params, Object... vars) {
        steps.add(new Step(line, left, right, action, key, params, kv(vars)));
    }

    /** Builds an insertion-ordered map from alternating key/value pairs. Null values are allowed. */
    public static Map<String, Object> kv(Object... pairs) {
        if (pairs.length % 2 != 0) {
            throw new IllegalArgumentException("expected key/value pairs");
        }
        Map<String, Object> map = new LinkedHashMap<>();
        for (int i = 0; i < pairs.length; i += 2) {
            map.put(String.valueOf(pairs[i]), pairs[i + 1]);
        }
        return map;
    }

    public void finish(Object result) {
        this.result = result;
    }

    public String getId() { return id; }
    public String getPattern() { return pattern; }
    public String getTitle() { return title; }
    public String getProblem() { return problem; }
    public String getSnippet() { return snippet; }
    public Map<String, Object> getInput() { return input; }
    public List<Step> getSteps() { return Collections.unmodifiableList(steps); }
    public Object getResult() { return result; }
}
