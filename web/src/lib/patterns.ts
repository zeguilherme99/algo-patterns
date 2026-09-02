export interface PatternInfo {
  slug: string
  name: string
  tagline: string
  whenToUse: string[]
  template: string
}

export const PATTERNS: Record<string, PatternInfo> = {
  'sliding-window': {
    slug: 'sliding-window',
    name: 'Sliding Window',
    tagline: 'Turn a nested O(n²) scan over contiguous ranges into a single O(n) pass.',
    whenToUse: [
      'The input is a linear sequence: array, string, linked list.',
      'The question is about a contiguous subarray or substring.',
      'You need the longest, shortest, max, min or count of such ranges.',
      'Extending the range by one element can update the answer in O(1).',
    ],
    template: `int left = 0;
for (int right = 0; right < n; right++) {
    add(nums[right]);                 // expand
    while (windowIsInvalid()) {
        remove(nums[left++]);         // shrink
    }
    best = better(best, right - left + 1); // record
}`,
  },
}
