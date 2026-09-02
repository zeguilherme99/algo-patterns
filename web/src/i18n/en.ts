const en = {
  meta: { code: 'en', label: 'EN', htmlLang: 'en', switchTo: 'Mudar para Português' },
  ui: {
    brand: 'Algo Patterns',
    github: 'GitHub',
    author: 'by José Guilherme',
    loading: 'Loading…',
    backHome: 'Back home',
    patterns: 'Patterns',
    problems: 'Problems',
    steps: '{n} steps →',
    whenToUse: 'When to reach for it',
    template: 'Template',
    heroTitle: 'Algorithm patterns,',
    heroAccent: 'step by step',
    heroText:
      'Pick a problem, press play, and watch the pointers move while the code that drives them lights up. Then clone the repo and solve the same problems yourself in Java.',
    reference: 'Reference (Java)',
    variables: 'Variables',
    result: 'result',
    step: 'step {i} / {n}',
    speed: 'speed',
    play: 'Play',
    pause: 'Pause',
    replay: 'Replay',
    first: 'First (Home)',
    prev: 'Previous (←)',
    next: 'Next (→)',
    last: 'Last (End)',
    playPause: 'Play / pause (space)',
    seek: 'Step',
    loadError: 'Could not load this page.',
  },
  actions: {
    init: 'init',
    expand: 'expand',
    shrink: 'shrink',
    record: 'record',
    wait: 'wait',
    check: 'check',
    done: 'done',
  },
  patterns: {
    'sliding-window': {
      name: 'Sliding Window',
      tagline: 'Turn a nested O(n²) scan over contiguous ranges into a single O(n) pass.',
      whenToUse: [
        'The input is a linear sequence: array, string, linked list.',
        'The question is about a contiguous subarray or substring.',
        'You need the longest, shortest, max, min or count of such ranges.',
        'Extending the range by one element can update the answer in O(1).',
      ],
    },
  },
  traces: {
    'sliding-window/max-sum-subarray-of-size-k': {
      title: 'Maximum Sum Subarray of Size K',
      problem: 'Given an array of integers and a number k, find the maximum sum of any contiguous subarray of size k.',
      steps: {
        init: 'Start with an empty window. sum = 0, best = -∞.',
        expand: 'Move right to {right} and add nums[{right}] = {value} to the sum.',
        record: {
          improved: 'Window [{left}, {right}] has {k} elements. sum = {sum} is a new best.',
          notImproved: 'Window [{left}, {right}] has {k} elements. sum = {sum} does not beat best = {best}.',
        },
        shrink: 'Drop nums[{index}] = {value} from the left so the window keeps size {k}.',
        wait: 'Only {count} element(s) so far; keep expanding until the window has {k}.',
        done: 'Every window of size {k} was seen. Answer: {best}.',
      },
    },
    'sliding-window/smallest-subarray-with-sum-at-least': {
      title: 'Smallest Subarray With Sum ≥ Target',
      problem:
        'Given an array of positive integers and a target, find the length of the smallest contiguous subarray whose sum is at least the target.',
      steps: {
        init: 'Start with an empty window. sum = 0, best = ∞.',
        expand: {
          valid: 'Add nums[{right}] = {value}. sum = {sum} ≥ {target}, the window is valid.',
          invalid: 'Add nums[{right}] = {value}. sum = {sum} < {target}, keep expanding.',
        },
        record: {
          improved: 'Window [{left}, {right}] is valid with length {len}. New best.',
          notImproved: 'Window [{left}, {right}] is valid with length {len}. Not better than {best}.',
        },
        shrink: {
          stillValid: 'Try to shrink: drop nums[{index}] = {value}. sum = {sum}, still valid.',
          invalid: 'Try to shrink: drop nums[{index}] = {value}. sum = {sum}, no longer valid.',
        },
        done: 'Right pointer reached the end. Answer: {answer}.',
      },
    },
    'sliding-window/longest-substring-without-repeating': {
      title: 'Longest Substring Without Repeating Characters',
      problem: 'Given a string, find the length of the longest substring that contains no repeated characters.',
      steps: {
        init: 'Start with an empty window and an empty lastSeen map.',
        expand: "Move right to {right}: c = '{c}'.",
        shrink: "'{c}' was already seen at index {dup} inside the window. Jump left to {left}.",
        check: "'{c}' was seen at index {seen}, but that is before left = {left}. Ignore it.",
        record: {
          improved: "Remember '{c}' at {right}. Window [{left}, {right}] has length {len}. New best.",
          notImproved: "Remember '{c}' at {right}. Window [{left}, {right}] has length {len}.",
        },
        done: 'Reached the end of the string. Answer: {best}.',
      },
    },
  },
}

export default en
export type Dictionary = typeof en
