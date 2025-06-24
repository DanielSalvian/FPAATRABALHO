## Professora

* Amália Soares Vieira de Vasconcelos

## Integrantes

* Yago de Arruda Simões,  
* Daniel Vitor Salviano Araújo,
* Gustavo Augusto Santos Perdigão,
* Vinicius Augusto Gomes de Oliveira

## Perguntas e problemas

1. Como a programação dinâmica foi aplicada na solução?
A programação dinâmica foi utilizada para calcular o comprimento da maior subsequência comum (LCS) entre duas strings. Para isso, foi construída uma matriz (dpLen) onde cada célula dpLen[i][j] armazena o tamanho da LCS entre os prefixos stringX[0...i-1] e stringY[0...j-1]. Essa matriz é preenchida de forma incremental, aproveitando soluções de subproblemas menores para construir soluções maiores. Isso evita recomputações desnecessárias e melhora o desempenho do algoritmo.

2. Por que o uso de backtracking é necessário neste problema?
A programação dinâmica sozinha calcula o comprimento da maior subsequência comum, mas não recupera todas as subsequências possíveis.

O backtracking é necessário para percorrer a matriz dp em sentido reverso, reconstruindo todas as subsequências que resultam no valor máximo. Ele permite explorar múltiplos caminhos que levam ao mesmo valor ótimo, garantindo que todas as subsequências distintas sejam recuperadas, sem repetição.

3. Houve desafios na implementação? Quais? Como foram superados?
Descobrir como era feito a analise de todas as substrings sem usar backtracking.

4. Qual é a complexidade da solução proposta? Faça o cálculo da ordem de complexidade passo a passo para:
a) Versão utilizando apenas programação dinâmica
A matriz dpLen tem tamanho (n+1) x (m+1) onde n e m são os tamanhos das strings.

Cada célula é preenchida em tempo constante.

Portanto, a complexidade é O(n * m) para calcular o comprimento da LCS.

b) Versão que combina programação dinâmica com backtracking
A construção da tabela DP continua com complexidade O(n * m).

Já o backtracking, no pior caso, pode gerar um número exponencial de subsequências (por exemplo, se todas as letras forem iguais).

O número de LCS possíveis pode ser até 2^min(n, m), e o algoritmo percorre todos os caminhos válidos.

Com memoização, a quantidade de estados possíveis é limitada a n * m, mas cada estado pode retornar múltiplas subsequências.

Assim, a complexidade total é:

Tempo: O(n * m + k), onde k é o número total de LCS distintas geradas
Espaço: O(n * m * s), onde s é o tamanho médio das subsequências armazenadas

5. O que o grupo aprendeu ao resolver esse problema?
Foi aprendido melhor como usar programação dinamica e que não necessariamente backtracking precisa de recurção para ser categorizado como recurção.

