import type { Dictionary } from './en'

const ptBR: Dictionary = {
  meta: { code: 'pt-BR', label: 'PT', htmlLang: 'pt-BR', switchTo: 'Switch to English' },
  ui: {
    brand: 'Algo Patterns',
    github: 'GitHub',
    author: 'por José Guilherme',
    loading: 'Carregando…',
    backHome: 'Voltar ao início',
    patterns: 'Padrões',
    problems: 'Problemas',
    steps: '{n} passos →',
    whenToUse: 'Quando usar',
    template: 'Template',
    heroTitle: 'Padrões de algoritmos,',
    heroAccent: 'passo a passo',
    heroText:
      'Escolha um problema, aperte play e veja os ponteiros se moverem enquanto o código que os controla acende. Depois clone o repositório e resolva os mesmos problemas em Java.',
    reference: 'Referência (Java)',
    variables: 'Variáveis',
    result: 'resultado',
    step: 'passo {i} / {n}',
    speed: 'velocidade',
    play: 'Play',
    pause: 'Pausar',
    replay: 'Repetir',
    first: 'Primeiro (Home)',
    prev: 'Anterior (←)',
    next: 'Próximo (→)',
    last: 'Último (End)',
    playPause: 'Play / pausa (espaço)',
    seek: 'Passo',
    loadError: 'Não foi possível carregar esta página.',
  },
  actions: {
    init: 'início',
    expand: 'expandir',
    shrink: 'encolher',
    record: 'registrar',
    wait: 'aguardar',
    check: 'verificar',
    done: 'fim',
  },
  patterns: {
    'sliding-window': {
      name: 'Janela Deslizante',
      tagline: 'Transforme uma varredura aninhada O(n²) sobre intervalos contíguos em uma única passada O(n).',
      whenToUse: [
        'A entrada é uma sequência linear: array, string, lista ligada.',
        'A pergunta é sobre um subarray ou substring contíguo.',
        'Você precisa do maior, menor, máximo, mínimo ou da contagem desses intervalos.',
        'Estender o intervalo em um elemento atualiza a resposta em O(1).',
      ],
    },
  },
  traces: {
    'sliding-window/max-sum-subarray-of-size-k': {
      title: 'Soma Máxima de Subarray de Tamanho K',
      problem: 'Dado um array de inteiros e um número k, encontre a soma máxima de qualquer subarray contíguo de tamanho k.',
      steps: {
        init: 'Comece com a janela vazia. sum = 0, best = -∞.',
        expand: 'Mova right para {right} e some nums[{right}] = {value}.',
        record: {
          improved: 'A janela [{left}, {right}] tem {k} elementos. sum = {sum} é o novo melhor.',
          notImproved: 'A janela [{left}, {right}] tem {k} elementos. sum = {sum} não supera best = {best}.',
        },
        shrink: 'Remova nums[{index}] = {value} da esquerda para a janela manter tamanho {k}.',
        wait: 'Só {count} elemento(s) até agora; continue expandindo até a janela ter {k}.',
        done: 'Todas as janelas de tamanho {k} foram vistas. Resposta: {best}.',
      },
    },
    'sliding-window/smallest-subarray-with-sum-at-least': {
      title: 'Menor Subarray com Soma ≥ Alvo',
      problem:
        'Dado um array de inteiros positivos e um alvo, encontre o tamanho do menor subarray contíguo cuja soma é pelo menos o alvo.',
      steps: {
        init: 'Comece com a janela vazia. sum = 0, best = ∞.',
        expand: {
          valid: 'Some nums[{right}] = {value}. sum = {sum} ≥ {target}, a janela é válida.',
          invalid: 'Some nums[{right}] = {value}. sum = {sum} < {target}, continue expandindo.',
        },
        record: {
          improved: 'A janela [{left}, {right}] é válida com tamanho {len}. Novo melhor.',
          notImproved: 'A janela [{left}, {right}] é válida com tamanho {len}. Não é melhor que {best}.',
        },
        shrink: {
          stillValid: 'Tente encolher: remova nums[{index}] = {value}. sum = {sum}, ainda válida.',
          invalid: 'Tente encolher: remova nums[{index}] = {value}. sum = {sum}, não é mais válida.',
        },
        done: 'O ponteiro right chegou ao fim. Resposta: {answer}.',
      },
    },
    'sliding-window/longest-substring-without-repeating': {
      title: 'Maior Substring Sem Caracteres Repetidos',
      problem: 'Dada uma string, encontre o tamanho da maior substring que não contém caracteres repetidos.',
      steps: {
        init: 'Comece com a janela vazia e o mapa lastSeen vazio.',
        expand: "Mova right para {right}: c = '{c}'.",
        shrink: "'{c}' já foi visto no índice {dup}, dentro da janela. Pule left para {left}.",
        check: "'{c}' foi visto no índice {seen}, mas isso é antes de left = {left}. Ignore.",
        record: {
          improved: "Registre '{c}' em {right}. A janela [{left}, {right}] tem tamanho {len}. Novo melhor.",
          notImproved: "Registre '{c}' em {right}. A janela [{left}, {right}] tem tamanho {len}.",
        },
        done: 'Chegou ao fim da string. Resposta: {best}.',
      },
    },
  },
}

export default ptBR
