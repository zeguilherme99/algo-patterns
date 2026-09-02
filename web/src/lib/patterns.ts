/** Language-neutral data per pattern. Names, taglines and bullets live in src/i18n. */
export const PATTERN_TEMPLATES: Record<string, string> = {
  'sliding-window': `int left = 0;
for (int right = 0; right < n; right++) {
    add(nums[right]);                 // expand
    while (windowIsInvalid()) {
        remove(nums[left++]);         // shrink
    }
    best = better(best, right - left + 1); // record
}`,
}
