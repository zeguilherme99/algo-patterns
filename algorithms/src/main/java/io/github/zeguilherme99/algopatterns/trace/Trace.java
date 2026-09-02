package io.github.zeguilherme99.algopatterns.trace;

import java.util.ArrayList;
import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/**
 * A complete recording of one algorithm run: metadata, input, result and every {@link Step}.
 * The frontend replays this object; it never re-executes the algorithm.
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

    /** Records a step. {@code vars} are given as alternating key/value pairs to keep call sites short. */
    public void step(int line, int left, int right, String action, String message, Object... vars) {
        if (vars.length % 2 != 0) {
            throw new IllegalArgumentException("vars must be key/value pairs");
        }
        Map<String, Object> snapshot = new LinkedHashMap<>();
        for (int i = 0; i < vars.length; i += 2) {
            snapshot.put(String.valueOf(vars[i]), vars[i + 1]);
        }
        steps.add(new Step(line, left, right, action, message, snapshot));
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
