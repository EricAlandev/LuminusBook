

//Esqueleto feito para definir os valores dos inputs

const ValorInput = ({htmlfor,titulo, tipo, nome, idName, valor, onMudanca, placeholder}) => {


    return(
        <div className="flex flex-col">
            <label htmlFor={htmlfor}
            className="  font-[Inter] font-medium text-[18.5px]"
            >
                {titulo}
            </label>

            <input 
            type={tipo}
            name={nome}
            id={idName}
            value={valor}
            onChange={onMudanca}
            placeholder={placeholder}
            className="min-w-[250px] mt-[10px] pl-2 py-2 bg-[#D1D1D1D1]  placeholder:font-[Inter] placeholder:text-[18.5px] rounded-[10px]"
            />
        </div>
    )
}

export default ValorInput