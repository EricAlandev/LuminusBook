
import { useLocation } from "react-router-dom";
import ProductEsque from "../ProductEsque";

const PesquisaEsque = () => {

    const valor = useLocation();

    const resultados = valor.state?.resultados || [];
    const tamanho = valor.state?.tamanho || [];
    return(
        <main className="md:max-w-[960px] md:mx-auto">
            <div className="flex flex-col">
               <h2 className="mt-[50px] font-[Inter] font-medium text-[20px] text-center">Resultados da sua pesquisa</h2>
               <h2 className="font-[Inter] foint-light text-center text-[gray]">({tamanho}) resultados</h2>
            </div>

            <div className="grid grid-cols-2  md:grid-cols-3 grid-rows-2 md:grid-rows-4 mt-[35px] ml-1.5">
                {resultados.map( (item) =>
                    <ProductEsque
                     idKey={item.id}
                     url1={'livro'}
                     idLivro={item.id}
                     fotolivro={item.livroURL}
                     titulo={item.livroNome}

                    />

                )}
            </div>
        </main>
    )
}

export default PesquisaEsque;