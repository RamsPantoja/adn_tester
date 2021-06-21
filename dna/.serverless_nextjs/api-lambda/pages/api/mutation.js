/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 69376:
/***/ (function(module) {

class HasMutation {
  constructor(data) {
    this.dna = data.dna;
    this.baseDnaInitials = ['A', 'T', 'C', 'G'];
  }
  /*Crea una matriz de NxN en base a los datos introducidos.*/


  makeMatriz(dna) {
    let matriz = [];

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
      const newMatrizBase = matriz.map(element1 => {
        const binaryArray = element1.map(element2 => {
          if (element2 === baseInitials) {
            return element1 = 1;
          } else {
            return element1 = 0;
          }
        });
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

    let sequenceArray = []; //Guarda las secuencias encontradas.

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
          current = elementI[j];
        }

        if (previous == 1 && current == previous) {
          sequenceCount++;
        } else if (current == 0) {
          sequenceCount = 0;
        } //Si sequenceCount == 3, significa que existe una secuencia nitrogenada, ejemplo: 'AAAACT == 111100(en la matriz binaria)' = 1 secuencia. 


        if (sequenceCount == 3 && (elementI[j + 1] == 0 || elementI[j + 1] == undefined)) {
          sequenceFound++;
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

        if (previous == 1 && current == previous) {
          sequenceCount++;
        } else if (current == 0) {
          sequenceCount = 0;
        } //Si sequenceCount == 3, significa que existe una secuencia nitrogenada, ejemplo: 'AAAACT == 111100(en la matriz binaria)' = 1 secuencia.
        //Verifica si ha llegado al final del recorrido de forma vertical.


        if (sequenceCount == 3 && i < matriz.length - 1) {
          if (matriz[i + 1][j] == 0) {
            sequenceFound++;
          }
        } else if (sequenceCount == 3 && i == matriz.length - 1) {
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
        const element = matriz[diagonalPosition + iDown][jDown];

        if (jDown == 0) {
          current = element;
        } else {
          diagonalPosition >= 1;
        }

        {
          previous = current;
          current = element;
        } //Verifica el hay una secuencia de 1's en el recorrido.

        if (previous == 1 && current == previous) {
          sequenceCount++;
        } else if (current == 0) {
          sequenceCount = 0;
        }
        /*Solo si existe una secuencia de 4 1's entonces sequenceCount = 3.
        Si el elemento en que estoy no es el ultimo del recorrido diagonal y si el elemento siguiente al elemento
        en el estoy es igual a 0, agregue una secuencia encontrada.*/


        if (sequenceCount == 3 && diagonalPosition + iDown < matriz.length - 1) {
          if (matriz[diagonalPosition + iDown + 1][jDown + 1] == 0) {
            sequenceFound++;
          }
        } else if (sequenceCount == 3 && diagonalPosition + iDown == matriz.length - 1) {
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
        const element = matriz[iUp][diagonalPosition + jUp];

        if (iUp == 0) {
          current = element;
        } else if (diagonalPosition >= 1) {
          previous = current;
          current = element;
        }

        if (previous == 1 && current == previous) {
          sequenceCount++;
        } else if (current == 0) {
          sequenceCount = 0;
        }
        /*Solo si existe una secuencia de 4 1's entonces sequenceCount = 3.
        Si el elemento en que estoy no es el ultimo del recorrido diagonal y si el elemento siguiente al elemento
        en el estoy es igual a 0, agregue una secuencia encontrada.*/


        if (sequenceCount == 3 && diagonalPosition + jUp < matriz.length - 1) {
          if (matriz[iUp + 1][diagonalPosition + jUp + 1] == 0) {
            sequenceFound++;
          }
        } else if (sequenceCount == 3 && diagonalPosition + jUp == matriz.length - 1) {
          sequenceFound++;
        }

        diagonalPosition++;
      }

      sequenceArrayUp[jUp] = sequenceFound;
    } //Une las secuencias encontradas de los dos arrays.


    const sequenceArray = sequenceArrayDown.concat(sequenceArrayUp);
    return sequenceArray;
  } //Recorre la matriz de formal diagonal en base a la diagonal Secundaria de la matriz.
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

      let sequenceFound = 0; //Cuenta el numero de secuencias encontradas. ejemplo: 'AAAACT == 111100(en la matriz binaria)' = 1 secuencia.

      for (let iUp = 0; iUp <= jUp; iUp++) {
        const element = matriz[iUp][jUp + diagonalPosition];

        if (iUp == 0) {
          current = element;
        } else if (diagonalPosition <= -1) {
          previous = current;
          current = element;
        } //Verifica si el valor anterior es igual al actual y agrega uno a sequenceCount.


        if (previous == 1 && current == previous) {
          sequenceCount++;
        } else if (current == 0) {
          //si el current es 0, resetea el sequenceCount para volver a contar si existe una secuencia en los elementos que sigan.
          sequenceCount = 0;
        }
        /*Solo si existe una secuencia de 4 1's entonces sequenceCount = 3.
        Si el elemento en que estoy no es el ultimo del recorrido diagonal y si el elemento siguiente al elemento
        en el estoy es igual a 0, agregue una secuencia encontrada.*/


        if (sequenceCount == 3 && jUp + diagonalPosition !== 0) {
          if (matriz[iUp + 1][jUp + diagonalPosition - 1] == 0) {
            sequenceFound++;
          }
        } else if (sequenceCount == 3 & jUp + diagonalPosition == 0) {
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

        if (jDown == matriz.length - 1) {
          current = element;
        } else if (diagonalPosition >= 1) {
          previous = current;
          current = element;
        }

        if (previous == 1 && current == previous) {
          sequenceCount++;
        } else if (current == 0) {
          sequenceCount = 0;
        }
        /*Solo si existe una secuencia de 4 1's entonces sequenceCount = 3.
        Si el elemento en que estoy no es el ultimo del recorrido diagonal y si el elemento siguiente al elemento
        en el estoy es igual a 0, agregue una secuencia encontrada.*/


        if (sequenceCount == 3 && diagonalPosition + iDown < matriz.length - 1) {
          if (matriz[iDown + diagonalPosition + 1][jDown - 1] == 0) {
            sequenceFound++;
          }
        } else if (sequenceCount == 3 && iDown + diagonalPosition == matriz.length - 1) {
          //Si sequenceCount es igual a 3 y estoy en el ultimo elemento del recorrido, agregue uno al sequenceFound.
          sequenceFound++;
        }

        diagonalPosition++;
      }

      sequenceArrayDown[iDown] = sequenceFound;
    } //Une las secuencias de base nitrogenada encontradas para cada forloop anterior.


    const sequenceArray = sequenceArrayUp.concat(sequenceArrayDown);
    return sequenceArray;
  }
  /*Obtiene todas las secuencias dependiendo el metodo pasado por parametro, 
  ejemplo: si quiero encontrar todas las secuencias de forma horizontal, 
  entonces es: method findAnHorizontalSequence(baseInitials).*/


  getSequenceInAllMatrices(functionToFindSequence) {
    let sequence = []; //Almacena las secuencias encontradas por el metodo pasado por parametro.

    let numberOfSequence = 0;
    this.baseDnaInitials.forEach(element => {
      //Obtiene las secuencias encontradas por cada basenitrogenada de adn, y esto en funcion del tipo de busqueda en las matrices: vertical, horizontal, o diagonal.
      const sequenceArray = functionToFindSequence(element);
      sequence.push(sequenceArray);
    }); //Cuenta el numero de secuencias encontradas.

    sequence.forEach(element => {
      for (let i = 0; i < element.length; i++) {
        const value = element[i];

        if (value !== 0 && value !== undefined) {
          numberOfSequence += value;
        }
      }
    });
    return numberOfSequence;
  } //Obtiene los resultados por cada tipo de busqueda matricial y guarda el numero de secuencias en un objeto respectivamente.


  getResults() {
    let results = {};
    results['Horizontal'] = this.getSequenceInAllMatrices(this.findAnHorizontalSequence.bind(this));
    results['Vertical'] = this.getSequenceInAllMatrices(this.findVerticalSequence.bind(this));
    results['FirstDiagonal'] = this.getSequenceInAllMatrices(this.findFirstDiagonalSequence.bind(this));
    results['SecondaryDiagonal'] = this.getSequenceInAllMatrices(this.findSecondaryDiagonalSequence.bind(this));
    return results;
  } //Retorna True si hay una mutacion en la secuencia de adn.


  hasMutation() {
    const results = this.getResults();
    let resultsCount = 0;
    Object.keys(results).some(key => {
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

/***/ }),

/***/ 65280:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _algorithm_dna_algorithm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(69376);
/* harmony import */ var _algorithm_dna_algorithm__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_algorithm_dna_algorithm__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lib_dbConnect__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(95372);
/* harmony import */ var _lib_dna__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(91424);




const dnaHasMutation = async (req, res) => {
  if (req.method === 'POST') {
    const data = req.body;
    const newHasMutation = new (_algorithm_dna_algorithm__WEBPACK_IMPORTED_MODULE_0___default())(data);
    const getResults = newHasMutation.getResults();
    const hasMutation = newHasMutation.hasMutation();
    const objectResults = {
      hasMutation: hasMutation,
      mutationsSequence: getResults
    };
    await (0,_lib_dbConnect__WEBPACK_IMPORTED_MODULE_1__/* .default */ .Z)();
    const sequenceToString = await data.dna.toString();
    const alreadyExistDnaSequence = await _lib_dna__WEBPACK_IMPORTED_MODULE_2__/* .default.findOne */ .Z.findOne({
      adnSequence: sequenceToString
    });

    if (!alreadyExistDnaSequence) {
      try {
        const newDna = await new _lib_dna__WEBPACK_IMPORTED_MODULE_2__/* .default */ .Z({
          adnSequence: sequenceToString,
          hasMutation: hasMutation
        });
        newDna.save();
      } catch (error) {
        if (error) {
          return res.status(403).send('We can´t save the dna. Try again');
        }
      }
    }

    if (hasMutation) {
      return res.status(200).send(objectResults);
    } else {
      return res.status(403).send(objectResults);
    }
  }
};

/* harmony default export */ __webpack_exports__["default"] = (dnaHasMutation);

/***/ }),

/***/ 90563:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var next_dist_next_server_server_node_polyfill_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3660);
/* harmony import */ var next_dist_next_server_server_node_polyfill_fetch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_next_server_server_node_polyfill_fetch__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var private_dot_next_routes_manifest_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(35706);
/* harmony import */ var next_dist_build_webpack_loaders_next_serverless_loader_api_handler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(88277);

        
      const { processEnv } = __webpack_require__(72333)
      processEnv([{"path":".env","contents":"MONGO_URI = mongodb+srv://RamsPantoja:Left4Dead2@devclosterrams.nodjj.mongodb.net/dnaHasMutation?retryWrites=true&w=majority"}])
    
        
        const runtimeConfig = {}
        ;
        

        

        const combinedRewrites = Array.isArray(private_dot_next_routes_manifest_json__WEBPACK_IMPORTED_MODULE_1__/* .rewrites */ .Dg)
          ? private_dot_next_routes_manifest_json__WEBPACK_IMPORTED_MODULE_1__/* .rewrites */ .Dg
          : []

        if (!Array.isArray(private_dot_next_routes_manifest_json__WEBPACK_IMPORTED_MODULE_1__/* .rewrites */ .Dg)) {
          combinedRewrites.push(...private_dot_next_routes_manifest_json__WEBPACK_IMPORTED_MODULE_1__/* .rewrites.beforeFiles */ .Dg.beforeFiles)
          combinedRewrites.push(...private_dot_next_routes_manifest_json__WEBPACK_IMPORTED_MODULE_1__/* .rewrites.afterFiles */ .Dg.afterFiles)
          combinedRewrites.push(...private_dot_next_routes_manifest_json__WEBPACK_IMPORTED_MODULE_1__/* .rewrites.fallback */ .Dg.fallback)
        }

        const apiHandler = (0,next_dist_build_webpack_loaders_next_serverless_loader_api_handler__WEBPACK_IMPORTED_MODULE_2__/* .getApiHandler */ .Y)({
          pageModule: __webpack_require__(65280),
          rewrites: combinedRewrites,
          i18n: undefined,
          page: "/api/mutation",
          basePath: "",
          pageIsDynamic: false,
          encodedPreviewProps: {previewModeId:"fcf1499d1ab33b93ac70e4ae50ff4199",previewModeSigningKey:"4cdd613d87d37f11f861baf8ef7a4b1b1ff57f8b8e52225feff52217900743b6",previewModeEncryptionKey:"35aba4e8eb5100f1d027a6b7d0a15cc8821fff08853c3ba54716d72e3e59675c"}
        })
        /* harmony default export */ __webpack_exports__["default"] = (apiHandler);
      

/***/ }),

/***/ 42357:
/***/ (function(module) {

"use strict";
module.exports = require("assert");;

/***/ }),

/***/ 64293:
/***/ (function(module) {

"use strict";
module.exports = require("buffer");;

/***/ }),

/***/ 63129:
/***/ (function(module) {

"use strict";
module.exports = require("child_process");;

/***/ }),

/***/ 76417:
/***/ (function(module) {

"use strict";
module.exports = require("crypto");;

/***/ }),

/***/ 40881:
/***/ (function(module) {

"use strict";
module.exports = require("dns");;

/***/ }),

/***/ 28614:
/***/ (function(module) {

"use strict";
module.exports = require("events");;

/***/ }),

/***/ 35747:
/***/ (function(module) {

"use strict";
module.exports = require("fs");;

/***/ }),

/***/ 98605:
/***/ (function(module) {

"use strict";
module.exports = require("http");;

/***/ }),

/***/ 57211:
/***/ (function(module) {

"use strict";
module.exports = require("https");;

/***/ }),

/***/ 11631:
/***/ (function(module) {

"use strict";
module.exports = require("net");;

/***/ }),

/***/ 12087:
/***/ (function(module) {

"use strict";
module.exports = require("os");;

/***/ }),

/***/ 85622:
/***/ (function(module) {

"use strict";
module.exports = require("path");;

/***/ }),

/***/ 71191:
/***/ (function(module) {

"use strict";
module.exports = require("querystring");;

/***/ }),

/***/ 92413:
/***/ (function(module) {

"use strict";
module.exports = require("stream");;

/***/ }),

/***/ 24304:
/***/ (function(module) {

"use strict";
module.exports = require("string_decoder");;

/***/ }),

/***/ 4016:
/***/ (function(module) {

"use strict";
module.exports = require("tls");;

/***/ }),

/***/ 33867:
/***/ (function(module) {

"use strict";
module.exports = require("tty");;

/***/ }),

/***/ 78835:
/***/ (function(module) {

"use strict";
module.exports = require("url");;

/***/ }),

/***/ 31669:
/***/ (function(module) {

"use strict";
module.exports = require("util");;

/***/ }),

/***/ 78761:
/***/ (function(module) {

"use strict";
module.exports = require("zlib");;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/******/ 	// the startup function
/******/ 	__webpack_require__.x = function() {
/******/ 		// Load entry module and return exports
/******/ 		// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 		var __webpack_exports__ = __webpack_require__.O(undefined, [826,694,130,824,277,971,155], function() { return __webpack_require__(90563); })
/******/ 		__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 		return __webpack_exports__;
/******/ 	};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	!function() {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = function(result, chunkIds, fn, priority) {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var chunkIds = deferred[i][0];
/******/ 				var fn = deferred[i][1];
/******/ 				var priority = deferred[i][2];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every(function(key) { return __webpack_require__.O[key](chunkIds[j]); })) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					result = fn();
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	!function() {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = function(chunkId) {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce(function(promises, key) {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	!function() {
/******/ 		// This function allow to reference async chunks and sibling chunks for the entrypoint
/******/ 		__webpack_require__.u = function(chunkId) {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + ".js";
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	                // Font manifest declaration
/******/ 	                __webpack_require__.__NEXT_FONT_MANIFEST__ = [];
/******/ 	            // Enable feature:
/******/ 	            process.env.__NEXT_OPTIMIZE_FONTS = JSON.stringify(true);/* webpack/runtime/require chunk loading */
/******/ 	!function() {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded chunks
/******/ 		// "1" means "loaded", otherwise not loaded yet
/******/ 		var installedChunks = {
/******/ 			343: 1
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.O.require = function(chunkId) { return installedChunks[chunkId]; };
/******/ 		
/******/ 		var installChunk = function(chunk) {
/******/ 			var moreModules = chunk.modules, chunkIds = chunk.ids, runtime = chunk.runtime;
/******/ 			for(var moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 				}
/******/ 			}
/******/ 			if(runtime) runtime(__webpack_require__);
/******/ 			for(var i = 0; i < chunkIds.length; i++)
/******/ 				installedChunks[chunkIds[i]] = 1;
/******/ 			__webpack_require__.O();
/******/ 		};
/******/ 		
/******/ 		// require() chunk loading for javascript
/******/ 		__webpack_require__.f.require = function(chunkId, promises) {
/******/ 			// "1" is the signal for "already loaded"
/******/ 			if(!installedChunks[chunkId]) {
/******/ 				if(true) { // all chunks have JS
/******/ 					installChunk(require("../../chunks/" + __webpack_require__.u(chunkId)));
/******/ 				} else installedChunks[chunkId] = 1;
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		// no external install chunk
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/startup chunk dependencies */
/******/ 	!function() {
/******/ 		var next = __webpack_require__.x;
/******/ 		__webpack_require__.x = function() {
/******/ 			__webpack_require__.e(826);
/******/ 			__webpack_require__.e(694);
/******/ 			__webpack_require__.e(130);
/******/ 			__webpack_require__.e(824);
/******/ 			__webpack_require__.e(277);
/******/ 			__webpack_require__.e(971);
/******/ 			__webpack_require__.e(155);
/******/ 			return next();
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// run startup
/******/ 	var __webpack_exports__ = __webpack_require__.x();
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;