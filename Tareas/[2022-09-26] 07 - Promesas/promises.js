//Legacy
const divPromise = (a, b) => {

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log(`Calculando ${a} / ${b}`);
  
        if (b == 0) {
          reject(new Error("Error: Div entre 0"));
        } else {
          resolve(a / b);
        }
  
      }, 3000);
    });
  
  }
  
  /* const divAsync = (a, b) => {
    return new Promise((resolve, reject) => {
      //Proceso
    })
  }  */
  
  const divAsync = async (a, b) => {
    if(b === 0) {
      throw new Error("Error: Div entre 0");
    } else {
      return a / b;
    } 
  }

  
  
  console.log("------ Antes de la promesa ------");
  
  /*
  divAsync(2, 3)
    .then((result) => {
      console.log(`El resultado 01 es: ${result}`);
      return divAsync(result, 5);
    })
    .then(result => {
      console.log(`El resultado 02 es: ${result}`);
      return divAsync(result, 0);
    })
    .catch((error) => { 
      console.error(error.message);
    }) 
  */
  
  console.log("------ Después de la promesa ------");
  
  const main = () => {
        const numbersArr = [1, 3, 5, 4, 8, 0];
        let acc = numbersArr[0];    

        numbersArr.splice(0,1); 

        console.log("Imprimiendo con forEach"); 

        numbersArr.forEach(async(element) => {
            try {
              acc = await divAsync(acc, element);
              console.log(`El resultado es: ${acc}`); 
            } catch (error) {
                console.error(error.message);
              }
        }); 
  }

  /* El resultado al utilizar un forEach es diferente si utilizamos un bucle for normal
  ya que un forEach espera procesos síncronos y no esperará por procesos asíncronos, y las promesas
  al ser un proceso asíncrono no serán 'esperadas' por el forEach, siendo ejecutadas en último lugar */
  
  main();