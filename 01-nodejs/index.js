const util = require('util')
const obterEnderecoAsync = util.promisify(obterEndereco)
obterEnderecoAsync

function obterUsuario() {
    // quando acontecer algum erro -> reject(erro)
    // quando funcionar -> resolve
    return new Promise(function resolverPromise(resolve, reject) {
        setTimeout(function () {
            return resolve({
                id: 1,
                nome: 'João',
                dataNascimento: new Date()
            })
        }, 1000)
    })
}

function obterTelefone(idUsuario) {
    return new Promise(function resolverPromise(resolve, reject) {
        setTimeout(() => {
            return resolve({
                telefone: '99660022',
                ddd: 11
            })
        }, 2000)
    })
}

function obterEndereco(idUsuario, callback) {
    setTimeout(() => {
        return callback(null, {
            rua: 'dos bobos',
            numero: 0
        })
    }, 2000)
}

// adicionando o async ele retorna uma promise
main()
async function main() {
    try {
        console.time('medida-promise')
        const usuario = await obterUsuario()
        // const telefone = await obterTelefone(usuario.id)
        // const endereco = await obterEnderecoAsync(usuario.id)
        const resultado = await Promise.all([
            obterTelefone(usuario.id),
            obterEnderecoAsync(usuario.id)
        ])
        const endereco = resultado[1]
        const telefone = resultado[0]
        console.log(`
            Nome: ${usuario.nome}
            Endereco: ${endereco.rua},${endereco.numero}
            Telefone: (${telefone.ddd})${telefone.telefone}
        `)
        console.timeEnd('medida-promise')
    } catch (error) {
        console.error('deu ruim', error)
    }
}



// const usuarioPromise = obterUsuario()
// // para manipular o sucesso usamos a função .then
// // para manupular erros usamos o .catch
// usuarioPromise
//     .then(function (usuario) {
//         return obterTelefone(usuario.id)
//             .then(function resolverTelefone(result) {
//                 return {
//                     usuario: {
//                         nome: usuario.nome,
//                         id: usuario.id
//                     },
//                     telefone: result
//                 }
//             })
//     })
//     .then(function (resultado) {
//         const endereco = obterEnderecoAsync(resultado.usuario.id)
//         return endereco.then(function resolverEndereco(result) {
//             return {
//                 usuario: resultado.usuario,
//                 telefone: resultado.telefone,
//                 endereco: result
//             }
//         })
//     })
//     .then(function (resultado) {
//         console.log(`
//                         Nome: ${resultado.usuario.nome}
//                         Endereco: ${resultado.endereco.rua},${resultado.endereco.numero}
//                         Telefone: (${resultado.telefone.ddd})${resultado.telefone.telefone}
//                     `)
//     })
//     .catch(function (error) {
//         console.error('Deu ruim ', error)
//     })





// obterUsuario(function resolverUsuario(error, usuario) {
//     if(error) {
//         console.error('DEU RUIM EM USUARIO', error)
//         return;
//     }
//     obterTelefone(usuario.id, function resolverTelefone(error1, telefone) {
//         if(error1) {
//             console.error('DEU RUIM EM TELEFONE', error)
//             return;
//         }
//         obterEndereco(usuario.id, function resolverEndereco(error2, endereco) {
//             if(error2) {
//                 console.error('DEU RUIM EM ENDERECO', error)
//                 return;
//             }

//             console.log(`
//                 Nome: ${usuario.nome}
//                 Endereco: ${endereco.rua},${endereco.numero}
//                 Telefone: (${telefone.ddd})${telefone.telefone}
//             `)
//         })
//     })
// })
// const telefone = obterTelefone(usuario.id)

// console.log('telefone', telefone)


