package io.github.zeguilherme99.algopatterns.trace;

import java.util.List;

/** An algorithm that can run its built-in example inputs and record a {@link Trace} for each. */
public interface Traceable {

    /** Runs every showcase example and returns one trace per example. */
    List<Trace> examples();
}
