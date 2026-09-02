package io.github.zeguilherme99.algopatterns.trace;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import io.github.zeguilherme99.algopatterns.slidingwindow.LongestSubstringWithoutRepeating;
import io.github.zeguilherme99.algopatterns.slidingwindow.MaxSumSubarrayOfSizeK;
import io.github.zeguilherme99.algopatterns.slidingwindow.SmallestSubarrayWithSumAtLeast;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/**
 * Writes every registered algorithm's traces as JSON into the frontend's public folder.
 * <pre>
 *   cd algorithms && mvn -q compile exec:java
 * </pre>
 */
public final class TraceExporter {

    /** Register new algorithms here. */
    private static final List<Traceable> ALGORITHMS = List.of(
            new MaxSumSubarrayOfSizeK(),
            new SmallestSubarrayWithSumAtLeast(),
            new LongestSubstringWithoutRepeating()
    );

    public static void main(String[] args) throws IOException {
        Path outDir = Path.of(args.length > 0 ? args[0] : "../web/public/traces");
        Files.createDirectories(outDir);

        ObjectMapper mapper = new ObjectMapper().enable(SerializationFeature.INDENT_OUTPUT);
        List<Map<String, Object>> index = new ArrayList<>();

        for (Traceable algorithm : ALGORITHMS) {
            for (Trace trace : algorithm.examples()) {
                Path file = outDir.resolve(trace.getId() + ".json");
                Files.createDirectories(file.getParent());
                mapper.writeValue(file.toFile(), trace);

                Map<String, Object> entry = new LinkedHashMap<>();
                entry.put("id", trace.getId());
                entry.put("pattern", trace.getPattern());
                entry.put("title", trace.getTitle());
                entry.put("steps", trace.getSteps().size());
                index.add(entry);
                System.out.println("wrote " + file + " (" + trace.getSteps().size() + " steps)");
            }
        }
        mapper.writeValue(outDir.resolve("index.json").toFile(), index);
        System.out.println("wrote " + outDir.resolve("index.json"));
    }
}
