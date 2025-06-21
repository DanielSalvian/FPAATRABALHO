# FPAATRABALHO
2. Por que o uso de backtracking é necessário neste problema?
A programação dinâmica sozinha calcula o comprimento da maior subsequência comum, mas não recupera todas as subsequências possíveis.

O backtracking é necessário para percorrer a matriz dp em sentido reverso, reconstruindo todas as subsequências que resultam no valor máximo. Ele permite explorar múltiplos caminhos que levam ao mesmo valor ótimo, garantindo que todas as subsequências distintas sejam recuperadas, sem repetição.
