
import {Link} from 'react-router-dom'

const ProductEsque = ({idKey,url1, idLivro,fotolivro, titulo}) => {


    return(
        <Link
        key={idKey}
        to={`/${url1}/${idLivro}`}
        className="block max-w-[220px] mt-[40px]">
            <img src={fotolivro} alt=""/>
            <h2 className="max-w-[200px] text-center mt-[10px] font-[Inter] font-bold ">{titulo}</h2>
        </Link>
    )
}

export default ProductEsque