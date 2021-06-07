require('dotenv').config()


const { leerInput, inquirerMenu, pausa, listarLugares } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");

const main = async() => {
    
    
    const busquedas = new Busquedas();
    let opt;

    do {
        opt = await inquirerMenu();

        switch (opt) {
            case 1:
                //Mostrar mensaje
                const termino = await leerInput('Ciudad: ');
                //Buscar los lugares
                const lugares = await busquedas.ciudad(termino);
                // Seleccionar el lugar
                const id = await listarLugares(lugares);
                if (id === '0') continue;
                const lugarSel = lugares.find(l => l.id === id);
                //Guardar en Db
                busquedas.agregarHistorial(lugarSel.nombre);
                //Clima
                const clima = await busquedas.clima(lugarSel.lat, lugarSel.lng)
                //Mostrar resultados
                console.clear();
                console.log('\n Información de la ciudad \n'.green);
                console.log('Ciudad:', lugarSel.nombre.green);
                console.log('Latitud:', lugarSel.lat);
                console.log('Longitud:', lugarSel.lng);
                console.log('Temperatura:', clima.temp);
                console.log('Mínima:', clima.min);
                console.log('Máxima', clima.max);
                console.log('El clima está:', clima.desc.green);
                break;
            case 2:
                busquedas.historialCapitalizado.forEach((lugar, i) =>{
                    const index = `${i + 1}.`.green;
                    console.log(`${index} ${lugar}`)
                })
                break;
        
            default:
                break;
        }

        if (opt!== 0) await pausa();
    } while (opt != 0);

}

main();

