class HasMutation {
    constructor(dna) {
        this.dna = dna;
        this.baseDnaInitials = ['A', 'T', 'C', 'G'];
    }

    /*Crea una matriz de NxN en base a los datos introducidos.*/
    makeMatriz(dna) {
        let matriz = []
        for (let index = 0; index < dna.length; index++) {
            const elementSplitted = dna[index].split('');
            matriz.push(elementSplitted);
        }

        return matriz;
    }


    /*Crea un objeto en base a las bases nitrogenas del ADN este objecto tiene una
    matriz binaria para cada base*/
    getBinaryMatrizForEachBaseInitial() {
        const matriz = this.makeMatriz(this.dna);
        let objectMatriz = {};


        /*Crea una matriz binaria para cada base nitrogenada del adn */
        for (let index = 0; index < this.baseDnaInitials.length; index++) {
            const baseInitials = this.baseDnaInitials[index];

            const newMatrizBase = matriz.map((element1) => {
                const binaryArray = element1.map((element2) => {
                    if (element2 === baseInitials) {
                        return element1 = 1
                    } else {
                        return element1 = 0
                    }
                })
    
                return binaryArray;
            });

            objectMatriz[baseInitials] = newMatrizBase;
        }

        return objectMatriz;
    }


    /*Busca en la matriz en base A, T, C, o G de forma horizontal si existe una o mas secuencias
    de base nitrogenada.*/
    findAnHorizontalSequence(baseInitials) {
        const objectMatriz = this.getBinaryMatrizForEachBaseInitial();
        const matriz = objectMatriz[baseInitials]; //Obtiene la matriz dependiendo la base nitrogenada.
        let sequenceArray = [];//Guarda las secuencias encontradas.

        for (let i = 0; i < matriz.length; i++) {
            let previous; //apunta al elemento anterior del array recorrido.
            let sequenceCount = 0; //Cuenta el numero de 1's que existen de forma secuencial.
            let current; //Apunto al elemento actual del array recorrido.
            let sequenceFound = 0; //Cuenta el numero de secuencias encontradas. ejemplo: 'AAAACT == 111100(en la matriz binaria)' = 1 secuencia.
            const elementI = matriz[i];

            for (let j = 0; j < elementI.length; j++) {
                if (j == 0) {
                    current = elementI[j];
                    sequenceCount = 0;
                } else if (j >= 1) {
                    previous = current;
                    current = elementI[j]
                }

                if (previous == 1 && current == previous) {
                    sequenceCount++;
                } else if (current == 0) {
                    sequenceCount = 0
                }
                //Si sequenceCount == 3, significa que existe una secuencia nitrogenada, ejemplo: 'AAAACT == 111100(en la matriz binaria)' = 1 secuencia. 
                if (sequenceCount == 3 && (elementI[j + 1] == 0 || elementI[j + 1] == undefined)) {
                    sequenceFound++
                }
            }

            sequenceArray[i] = sequenceFound;
        }


        return sequenceArray;
    }


    /*Busca en la matriz en base A, T, C, o G de forma vertical, si existe una o mas secuencias
    de base nitrogenada.*/
    findVerticalSequence(baseInitials) {
        const objectMatriz = this.getBinaryMatrizForEachBaseInitial();
        const matriz = objectMatriz[baseInitials]; //Obtiene la matriz dependiendo la base nitrogenada.
        let sequenceArray = []; //Guarda las secuencias encontradas.

        for (let j = 0; j < matriz.length; j++) {
            let previous; //apunta al elemento anterior del array recorrido.
            let sequenceCount = 0; //Cuenta el numero de 1's que existen de forma secuencial.
            let current; //Apunto al elemento actual del array recorrido.
            let sequenceFound = 0; //Cuenta el numero de secuencias encontradas. ejemplo: 'AAAACT == 111100(en la matriz binaria)' = 1 secuencia.

            for (let i = 0; i < matriz.length; i++) {
                const elementI = matriz[i][j];
                if (i == 0) {
                    current = elementI;
                    sequenceCount = 0;
                } else if (i >= 1) {
                    previous = current;
                    current = elementI;
                }

                if ( previous == 1 && current == previous) {
                    sequenceCount++;
                } else if ( current == 0 ) {
                    sequenceCount = 0;
                }

                //Si sequenceCount == 3, significa que existe una secuencia nitrogenada, ejemplo: 'AAAACT == 111100(en la matriz binaria)' = 1 secuencia.
                //Verifica si ha llegado al final del recorrido de forma vertical.
                if ( sequenceCount == 3 && i < matriz.length - 1 ) {
                    if (matriz[i + 1][j] == 0) {
                        sequenceFound++;
                    }
                } else if ( sequenceCount == 3 && i == matriz.length - 1) {
                    sequenceFound++;
                }

            }
            sequenceArray[j] = sequenceFound;
        }

        return sequenceArray;
    }

    /*Busca en la matriz en base A, T, C, o G de forma diagonal primaria, si existe una o mas secuencias
    de base nitrogenada.*/
    findFirstDiagonalSequence(baseDnaInitials) {
        const objectMatriz = this.getBinaryMatrizForEachBaseInitial();
        const matriz = objectMatriz[baseDnaInitials]; //Obtiene la matriz dependiendo la base nitrogenada.
        let sequenceArrayDown = []; //Guarda las secuencias encontradas por abajo de la diagonal principal.
        let sequenceArrayUp = []; //Guarda las secuencias encontradas por arriba de la diagonal principal.

        /*Busca si existe una o mas secuencias de base nitrogenada por abajo de la diagonal principal*/
        for (let iDown = 1; iDown < matriz.length; iDown++) {
            let previous; //Apunta al elemento anterior recorrido de forma diagonal principal.
            let current; //Apunta al elemento actual recorrido de forma diagonal principal.
            let diagonalPosition = 0; //Pibote que permite acceder a los elementos de forma diagonal.
            let sequenceFound = 0; //Cuenta el numero de secuencias encontradas. ejemplo: 'AAAACT == 111100(en la matriz binaria)' = 1 secuencia.
            let sequenceCount = 0; //Cuenta el numero de 1's que existen de forma secuencial.

            for (let jDown = 0; jDown < matriz.length - iDown; jDown++) {
                const element = matriz[diagonalPosition + iDown][jDown]
                if (jDown == 0) {
                    current = element;
                } else { diagonalPosition >= 1} {
                    previous = current;
                    current = element;
                }

                //Verifica el hay una secuencia de 1's en el recorrido.
                if (previous == 1 && current == previous) {
                    sequenceCount++;
                } else if ( current == 0 ) {
                    sequenceCount = 0;
                }

                /*Solo si existe una secuencia de 4 1's entonces sequenceCount = 3.
                Si el elemento en que estoy no es el ultimo del recorrido diagonal y si el elemento siguiente al elemento
                en el estoy es igual a 0, agregue una secuencia encontrada.*/
                if (sequenceCount == 3 && (diagonalPosition + iDown < matriz.length - 1)) {
                    if (matriz[diagonalPosition + iDown + 1][jDown + 1] == 0) {
                        sequenceFound++;
                    }
                } else if ( sequenceCount == 3 &&  diagonalPosition + iDown == matriz.length - 1) {
                    sequenceFound++;
                }

                diagonalPosition++;
            }
            
            sequenceArrayDown[iDown] = sequenceFound;
        }


        /*Busca si existe una o mas secuencias de base nitrogenada por arriba de la diagonal principal*/
        for (let jUp = 0; jUp < matriz.length; jUp++) {
            let previous; //Apunta al elemento anterior recorrido de forma diagonal principal.
            let current; //Apunta al elemento actual recorrido de forma diagonal principal.
            let diagonalPosition = 0; //Pibote que permite acceder a los elementos de forma diagonal.
            let sequenceFound = 0; //Cuenta el numero de secuencias encontradas. ejemplo: 'AAAACT == 111100(en la matriz binaria)' = 1 secuencia.
            let sequenceCount = 0; //Cuenta el numero de 1's que existen de forma secuencial.

            for (let iUp = 0; iUp < matriz.length - jUp; iUp++) {
                const element = matriz[iUp][diagonalPosition+jUp];
                if (iUp == 0) {
                    current = element;
                } else if (diagonalPosition >= 1) {
                    previous = current;
                    current = element;
                }


                if ( previous == 1 && current == previous) {
                    sequenceCount++;
                } else if (current == 0) {
                    sequenceCount = 0;
                }

                /*Solo si existe una secuencia de 4 1's entonces sequenceCount = 3.
                Si el elemento en que estoy no es el ultimo del recorrido diagonal y si el elemento siguiente al elemento
                en el estoy es igual a 0, agregue una secuencia encontrada.*/
                if (sequenceCount == 3 && (diagonalPosition + jUp < matriz.length - 1)) {
                    if (matriz[iUp + 1][diagonalPosition + jUp + 1] == 0) {
                        sequenceFound++;
                    }
                } else if ( sequenceCount == 3 &&  diagonalPosition + jUp == matriz.length - 1) {
                    sequenceFound++;
                }

                diagonalPosition++;
            }

            sequenceArrayUp[jUp] = sequenceFound;
        }

        //Une las secuencias encontradas de los dos arrays.
        const sequenceArray = sequenceArrayDown.concat(sequenceArrayUp);

        return sequenceArray;

    }

    //Recorre la matriz de formal diagonal en base a la diagonal Secundaria de la matriz.
    //Obtiene el numero de secuencias que existe en la matriz.
    findSecondaryDiagonalSequence(baseDnaInitials) {
        const objectMatriz = this.getBinaryMatrizForEachBaseInitial();
        const matriz = objectMatriz[baseDnaInitials];
        let sequenceArrayDown = []; //Guarda las secuencias encontradas por abajo de la diagonal secundaria.
        let sequenceArrayUp = []; //Guarda las secuencias encontradas por arriba de la diagonal secundaria.
        
        /*Este forloop recorre la matriz en base a la diagonal secundaria y lee todos los campos
        por arriba de la diagonal.*/
        //Obtiene las secuencias que existen por arriba de la diagonal.
        for (let jUp = matriz.length - 1; jUp >= 0; jUp--) {
            let diagonalPosition = 0;
            let previous; //Apunto al elemento anterio.
            let current; //Apunta al elemento actual.
            let sequenceCount = 0; //Cuenta el numero de 1's que existen de forma secuencial.
            let sequenceFound = 0;  //Cuenta el numero de secuencias encontradas. ejemplo: 'AAAACT == 111100(en la matriz binaria)' = 1 secuencia.

            for (let iUp = 0; iUp <= jUp; iUp++) {
                const element = matriz[iUp][jUp + diagonalPosition];

                if ( iUp == 0 ) {
                    current = element;
                } else if ( diagonalPosition <= -1 ) {
                    previous = current;
                    current = element;
                }


                //Verifica si el valor anterior es igual al actual y agrega uno a sequenceCount.
                if ( previous == 1 && current == previous ) {
                    sequenceCount++;
                } else if (current == 0) {
                    //si el current es 0, resetea el sequenceCount para volver a contar si existe una secuencia en los elementos que sigan.
                    sequenceCount = 0;
                }

                /*Solo si existe una secuencia de 4 1's entonces sequenceCount = 3.
                Si el elemento en que estoy no es el ultimo del recorrido diagonal y si el elemento siguiente al elemento
                en el estoy es igual a 0, agregue una secuencia encontrada.*/                
                if ( sequenceCount == 3 && jUp + diagonalPosition !== 0) {
                    if (matriz[iUp + 1][jUp + diagonalPosition - 1] == 0) {
                        sequenceFound++;
                    }
                } else if ( sequenceCount == 3 & jUp + diagonalPosition == 0) {
                    //Si sequenceCount es igual a 3 y estoy en el ultimo elemento del recorrido, agregue uno al sequenceFound.
                    sequenceFound++;
                }

                diagonalPosition--;
            }

            sequenceArrayUp[jUp] = sequenceFound;
        }

        /*Este forloop recorre la matriz en base a la diagonal secundaria y lee todos los campos
        por abajo de la diagonal*/
        //Obtiene las secuencias que existen por abajo de la diagonal.
        for (let iDown = 1; iDown < matriz.length; iDown++) {
            let diagonalPosition = 0;
            let previous; //Apunto al elemento anterio.
            let current; //Apunta al elemento actual.
            let sequenceCount = 0; //Cuenta el numero de 1's que existen de forma secuencial.
            let sequenceFound = 0; //Cuenta el numero de secuencias encontradas. ejemplo: 'AAAACT == 111100(en la matriz binaria)' = 1 secuencia.

            for (let jDown = matriz.length - 1; jDown >= iDown; jDown--) {
                const element = matriz[iDown + diagonalPosition][jDown];
                if ( jDown  == matriz.length - 1 ) {
                    current = element;
                } else if (diagonalPosition >= 1) {
                    previous = current;
                    current = element;
                }

                if (previous == 1 && current == previous) {
                    sequenceCount++;
                } else if ( current == 0) {
                    sequenceCount = 0;
                }

                /*Solo si existe una secuencia de 4 1's entonces sequenceCount = 3.
                Si el elemento en que estoy no es el ultimo del recorrido diagonal y si el elemento siguiente al elemento
                en el estoy es igual a 0, agregue una secuencia encontrada.*/         
                if ( sequenceCount == 3 && diagonalPosition + iDown < matriz.length - 1) {
                    if (matriz[iDown + diagonalPosition + 1][jDown - 1] == 0) {
                        sequenceFound++;
                    }
                } else if ( sequenceCount == 3 && iDown + diagonalPosition == matriz.length - 1) {
                    //Si sequenceCount es igual a 3 y estoy en el ultimo elemento del recorrido, agregue uno al sequenceFound.
                    sequenceFound++;
                }

                diagonalPosition++
            }

            sequenceArrayDown[iDown] = sequenceFound;
            
        }

        //Une las secuencias de base nitrogenada encontradas para cada forloop anterior.
        const sequenceArray = sequenceArrayUp.concat(sequenceArrayDown);

        return sequenceArray;
    }


    /*Obtiene todas las secuencias dependiendo el metodo pasado por parametro, 
    ejemplo: si quiero encontrar todas las secuencias de forma horizontal, 
    entonces es: method findAnHorizontalSequence(baseInitials).*/
    getSequenceInAllMatrices(functionToFindSequence) {
        let sequence = []; //Almacena las secuencias encontradas por el metodo pasado por parametro.
        let numberOfSequence = 0;

        this.baseDnaInitials.forEach((element) => {
            //Obtiene las secuencias encontradas por cada basenitrogenada de adn, y esto en funcion del tipo de busqueda en las matrices: vertical, horizontal, o diagonal.
            const sequenceArray = functionToFindSequence(element);
            sequence.push(sequenceArray);
        });

        //Cuenta el numero de secuencias encontradas.
        sequence.forEach((element) => {
            for (let i = 0; i < element.length; i++) {
                const value = element[i];
                if ( value !== 0 && value !== undefined) {
                    numberOfSequence += value;
                }
            }
        });

        return numberOfSequence;
    }

    //Obtiene los resultados por cada tipo de busqueda matricial y guarda el numero de secuencias en un objeto respectivamente.
    getResults() {
        let results = {};
        results['Horizontal'] = this.getSequenceInAllMatrices(this.findAnHorizontalSequence.bind(this));
        results['Vertical'] = this.getSequenceInAllMatrices(this.findVerticalSequence.bind(this));
        results['FirstDiagonal'] = this.getSequenceInAllMatrices(this.findFirstDiagonalSequence.bind(this));
        results['SecondaryDiagonal'] = this.getSequenceInAllMatrices(this.findSecondaryDiagonalSequence.bind(this));
        return results;
    }

    //Retorna True si hay una mutacion en la secuencia de adn.
    hasMutation() {
        const results = this.getResults();
        let resultsCount = 0;

        Object.keys(results).some((key) => {
            const value = results[key];
            resultsCount += value;
        });

        if (resultsCount > 1) {
            return true;
        } else {
            return false;
        }
    }
}

module.exports = HasMutation;