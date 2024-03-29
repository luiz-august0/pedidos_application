export function mobileDetect() { 
  if( navigator.userAgent.match(/Android/i)
  || navigator.userAgent.match(/webOS/i)
  || navigator.userAgent.match(/iPhone/i)
  || navigator.userAgent.match(/iPad/i)
  || navigator.userAgent.match(/iPod/i)
  || navigator.userAgent.match(/BlackBerry/i)
  || navigator.userAgent.match(/Windows Phone/i)
  ){
     return true;
   }
  else {
     return false;
   }
 }

export const flexOnOrNot = () => {
  if (mobileDetect()) {
      return 0;
  } else {
      return 1;
  }
}

export const AG_GRID_LOCALE_BR = {
  selectAll: '(Selecionar Todos)',
  selectAllSearchResults: '(Selecionar todos os resultados de busca)',
  searchOoo: 'Buscando...',
  blanks: '(Em branco)',
  noMatches: 'Sem correspondências',

  filterOoo: 'Filtrando...',
  equals: 'Igual',
  notEqual: 'Diferente',
  blank: 'Em branco',
  notBlank: 'Não está em branco',
  empty: 'Escolha um',

  lessThan: 'Menor que',
  greaterThan: 'Maior que',
  lessThanOrEqual: 'Menor que/ou igual',
  greaterThanOrEqual: 'Maior que/ou igual',
  inRange: 'No alcance',
  inRangeStart: 'De',
  inRangeEnd: 'Para',

  contains: 'Contem',
  notContains: 'Não contem',
  startsWith: 'Começa com',
  endsWith: 'Termina com',

  dateFormatOoo: 'yyyy-mm-dd',

  andCondition: 'E',
  orCondition: 'Ou',

  applyFilter: 'Aplicar',
  resetFilter: 'Resetar',
  clearFilter: 'Apagar',
  cancelFilter: 'Cancelar',

  textFilter: 'Filtro de texto',
  numberFilter: 'Filtro de numero',
  dateFilter: 'Filtro de data',
  setFilter: 'Filtrar por',

  columns: 'Colunas',
  filters: 'Filtros',

  pivotMode: 'Modo Pivô',
  groups: 'Grupos de linha',
  rowGroupColumnsEmptyMessage: 'Arraste aqui para definir grupos de linha',
  values: 'Valores',
  valueColumnsEmptyMessage: 'Arrasta que para juntar',
  pivots: 'Coluna de Rótulos',
  pivotColumnsEmptyMessage: 'Arraste aqui para definir rótulos de coluna',

  group: 'Grupo',

  rowDragRow: 'Linha',
  rowDragRows:'Linhas',

  loadingOoo: 'Carregando...',
  noRowsToShow: 'Não há dados para mostrar',
  enabled: 'Ativado',

  pinColumn: 'Pin Column',
  pinLeft: 'Pin Left',
  pinRight: 'Pin Right',
  noPin: 'No Pin',
  valueAggregation: 'Adicionar valor',
  autosizeThiscolumn: 'Ajustar o tamanho desta coluna automaticamente',
  autosizeAllColumns: 'Ajustar o tamanho de todas as colunas automaticamente',
  groupBy: 'Agrupar por',
  ungroupBy: 'Desagrupar por',
  addToValues: 'Adicionar ${variable} aos valores',
  removeFromValues: 'Remover ${variable} dos valores',
  addToLabels: 'Adicionar ${variable} aos rótulos',
  removeFromLabels: 'Remover ${variable} dos rótulos',
  resetColumns: 'Resetar colunas',
  expandAll: 'Expandir todos',
  collapseAll: 'Fechar todos',
  copy: 'Copiar',
  ctrlC: 'Ctrl+C',
  copyWithHeaders: 'Copiar com cabeçalho',
  copyWithGroupHeaders: 'Copiar com grupo de cabeçalhos',
  paste: 'Colar',
  ctrlV: 'Ctrl+V',
  export: 'Exportar',
  csvExport: 'Exportar CSV',
  excelExport: 'Exportar Excel',

  sum: 'Somar',
  min: 'Minimo',
  max: 'Maximo',
  none: 'Nenhum',
  count: 'Contar',
  avg: 'Média',
  filteredRows: 'Filtrado',
  selectedRows: 'Selecionado',
  totalRows: 'Total de linhas',
  totalAndFilteredRows: 'Linhas',
  more: 'Mais',
  to: 'para',
  of: 'de',
  page: 'Pagina',
  nextPage: 'Próxima pagina',
  lastPage: 'Ultima anterior',
  firstPage: 'Primeira pagina',
  previousPage: 'Pagina anterior',

  pivotColumnGroupTotals: 'Total',

  pivotChartAndPivotMode: 'Pivot Chart & Pivot Mode',
  pivotChart: 'Pivot Chart',
  chartRange: 'Chart Range',

  columnChart: 'Coluna',
  groupedColumn: 'Agrupado',
  stackedColumn: 'Empilhado',
  normalizedColumn: '100% Empilhado',

  barChart: 'Barra',
  groupedBar: 'Agrupado',
  stackedBar: 'Empilhado',
  normalizedBar: '100% Empilhado',

  pieChart: 'Pie',
  pie: 'Pie',
  doughnut: 'Doughnut',

  line: 'Linha',

  xyChart: 'X Y (Scatter)',
  scatter: 'Espalhar',
  bubble: 'Bolha',

  areaChart: 'Area',
  area: 'Area',
  stackedArea: 'Empilhado',
  normalizedArea: '100% Empilhado',

  histogramChart: 'Histograma',
  histogramFrequency: "Frequência",

  combinationChart: 'Combinação',
  columnLineCombo: 'COluna e linha',
  AreaColumnCombo: 'Area e Coluna',

  pivotChartTitle: 'Pivot Chart',
  rangeChartTitle: 'Range Chart',
  settings: 'Configurações',
  data: 'Data',
  format: 'Formato',
  categories: 'Categorias',
  defaultCategory: '(None)',
  series: 'Series',
  xyValues: 'X Y Valores',
  paired: 'Modo emparelhado',
  axis: 'Axis',
  navigator: 'Navigador',
  color: 'Cor',
  thickness: 'Espessura',
  xType: 'X Type',
  automatic: 'Automatico',
  category: 'Categoria',
  number: 'Numero',
  time: 'Tempo',
  autoRotate: 'Girar Automaticamente',
  xRotation: 'X Rotation',
  yRotation: 'Y Rotation',
  ticks: 'Ticks',
  width: 'Largura',
  height: 'Altura',
  length: 'Comprimento',
  padding: 'Preenchimento',
  spacing: 'Espaçamento',
  chart: 'Gráfico',
  title: 'Título',
  titlePlaceholder: 'Título gráfico - clique duas vezes para editar',
  background: 'Fundo',
  font: 'Fonte',
  top: 'Topo',
  right: 'Direita',
  bottom: 'Meio',
  left: 'Esquerda',
  labels: 'Rótulos',
  size: 'Tamanho',
  minSize: 'Tamanho minimo',
  maxSize: 'Tamanho maximo',
  legend: 'Legenda',
  position: 'Posição',
  markerSize: 'Tamanho do marcador',
  markerStroke: 'Marcador de borda',
  markerPadding: 'Marcador de preenchimento',
  itemSpacing: 'Espaçamento de item',
  itemPaddingX: 'Espaçamento de item X',
  itemPaddingY: 'Espaçamento de item Y',
  layoutHorizontalSpacing: 'Espaçamento horizontal',
  layoutVerticalSpacing: 'Espaçamento Vertical',
  strokeWidth: 'Largura da borda',
  lineDash: 'Traço de linha',
  offset: 'Deslocamento',
  offsets: 'Deslocamentos',
  tooltips: 'Dicas de ferramentas',
  callout: 'Texto explicativo',
  markers: 'Marcadores',
  shadow: 'Sombra',
  blur: 'Borrão',
  xOffset: 'Deslocamento X',
  yOffset: 'Deslocamento Y',
  lineWidth: 'Largura da linha',
  normal: 'Normal',
  bold: 'Negrito',
  italic: 'Italico',
  boldItalic: 'Negrito Italico',
  predefined: 'Predefinido',
  fillOpacity: 'Opacidade de preenchimento',
  strokeOpacity: 'Opacidade da linha',
  histogramBinCount: 'Contador de registros',
  columnGroup: 'Coluna',
  barGroup: 'Barra',
  pieGroup: 'Pie',
  lineGroup: 'Linha',
  scatterGroup: 'X Y (Scatter)',
  areaGroup: 'Area',
  histogramGroup: 'Histograma',
  combinationGroup: 'Combinação',
  groupedColumnTooltip: 'Agrupado',
  stackedColumnTooltip: 'Empilhado',
  normalizedColumnTooltip: '100% Empilhado',
  groupedBarTooltip: 'Agrupado',
  stackedBarTooltip: 'Empilhado',
  normalizedBarTooltip: '100% Empilhado',
  pieTooltip: 'Pie',
  doughnutTooltip: 'Doughnut',
  lineTooltip: 'Linha',
  groupedAreaTooltip: 'Area',
  stackedAreaTooltip: 'Empilhado',
  normalizedAreaTooltip: '100% Empilhado',
  scatterTooltip: 'Espalhar',
  bubbleTooltip: 'Bolha',
  histogramTooltip: 'Histograma',
  columnLineComboTooltip: 'Coluna e linha',
  areaColumnComboTooltip: 'Area e coluna',
  customComboTooltip: 'Combinação customizada',
  noDataToChart: 'Não há dados disponíveis para serem mapeados.',
  pivotChartRequiresPivotMode: 'Gráfico de pivô requer modo pivô ativado.',
  chartSettingsToolbarTooltip: 'Menu',
  chartLinkToolbarTooltip: 'Conectado a grade',
  chartUnlinkToolbarTooltip: 'Desconectado da grade',
  chartDownloadToolbarTooltip: 'Baixar mapeamento',
  seriesChartType: 'Tipo de gráfico de série',
  seriesType: 'Tipo de série',
  secondaryAxis: 'Eixo Secundario',

  ariaChecked: 'Marcado',
  ariaColumn: 'Coluna',
  ariaColumnGroup: 'Grupo de colunas',
  ariaColumnList: 'Lista de colunas',
  ariaColumnSelectAll: 'Alterar todas as colunas selecionadas',
  ariaDateFilterInput: 'Filtro de data',
  ariaDefaultListName: 'Lista',
  ariaFilterColumnsInput: 'Filtro de colunas',
  ariaFilterFromValue: 'Filtrar por valor',
  ariaFilterInput: 'Filtro',
  ariaFilterList: 'Lista de filtros',
  ariaFilterToValue: 'Filtrar por valores',
  ariaFilterValue: 'Filtrar por valor',
  ariaFilteringOperator: 'Operador de filtragem',
  ariaHidden: 'Esconder',
  ariaIndeterminate:'Indeterminado',
  ariaInputEditor: 'Editor de entrada',
  ariaMenuColumn: 'Pressione CTRL+ENTER para abrir o menu da coluna.',
  ariaRowDeselect: 'Pressione ESPAÇO para desmarcar linha selecionada',
  ariaRowSelectAll: 'Pressione ESPAÇO para desmarcar todas as linhas selecionadas',
  ariaRowToggleSelection: 'Pressione ESPAÇO retirar seleção',
  ariaRowSelect: 'Pressione ESPAÇO para selecionar esta linha',
  ariaSearch: 'Buscar',
  ariaSortableColumn: 'Pressioner ENTER para ordenar',
  ariaToggleVisibility: 'Pressione ESPAÇO para esconder',
  ariaUnchecked: 'Desmarcado',
  ariaVisible: 'Visivel',
  ariaSearchFilterValues: 'Buscar filtro de valores',

  ariaRowGroupDropZonePanelLabel: 'Grupo de linhas',
  ariaValuesDropZonePanelLabel: 'Valores',
  ariaPivotDropZonePanelLabel: 'Titulo de coluna',
  ariaDropZoneColumnComponentDeion: 'Pressione DELETE para remover',
  ariaDropZoneColumnValueItemDeion: 'Pressione ENTER mudar o tipo de agregação',
  ariaDropZoneColumnGroupItemDeion: 'Pressione ENTER para ordenar ',
  ariaDropZoneColumnComponentAggFuncSeperator: ' de ',
  ariaDropZoneColumnComponentSortAscending: 'Ascendente',
  ariaDropZoneColumnComponentSortDescending: 'Descendente',

  ariaLabelColumnMenu: 'Menu de colunas',
  ariaLabelCellEditor: 'Editor de celulas',
  ariaLabelDialog: 'Dialogo',
  ariaLabelSelectField: 'Selecionar campo',
  ariaLabelTooltip: 'Dicas',
  ariaLabelContextMenu: 'Menu de contexto',
  ariaLabelSubMenu: 'SubMenu',
  ariaLabelAggregationFunction: 'Função de agregação',

  thousandSeparator: ',',
  decimalSeparator: '.'

}