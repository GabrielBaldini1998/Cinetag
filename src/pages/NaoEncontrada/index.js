import style from './NaoEncontrada.module.css';

function NaoEncontrada() {
    return(
        <section className={style.container}>
            <h2>
                Ops! Página não encontrada.
            </h2>
            <p>
                O conteúdo que você procura não foi encontrado.
            </p>
        </section>
    )
}

export default NaoEncontrada;
