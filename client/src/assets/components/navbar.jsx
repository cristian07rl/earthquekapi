import { useState } from "react";
import PropTypes from 'prop-types';

const Navbar = ({ pag, setPag, setPer_page, total, magTypes, setMagTypes }) => {
    const [aux, setaux] = useState(2)
    const handleMagTypeChange = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            setMagTypes([...magTypes, value]); // Agregar tipo seleccionado
        } else {
            setMagTypes(magTypes.filter((type) => type !== value)); // Quitar tipo deseleccionado
        }
    };
    const handlebuttonback = () => {
        if (pag == 1) return
        if (pag <= 1) {
            setPag(1)
            return
        }
        else {
            setPag(pag - 1)
        }
    }
    const handlebuttonnex = () => {
        console.log("entra el boton")
        if (total == undefined) return
        if (pag >= total) return
        else {
            setPag(pag + 1)
        }
    }
    const handlePerPageChange = (event) => {
        const inputValue = event.target.value.trim(); // Obtener el valor del campo eliminando espacios al principio y al final

        // Verificar si el inputValue es vacío o un número válido
        if (inputValue === '' || !isNaN(inputValue)) {
            // Convertir el inputValue a un número entero
            const intValue = parseInt(inputValue, 10);

            // Actualizar el estado solo si intValue es un número válido y mayor que cero
            if (!isNaN(intValue) && intValue >= 0) {
                setaux(inputValue); // Actualizar el estado de 'aux'
            }
            else {
                setaux('')
            }
        }
    };

    const handlekeydown = (event) => {
        if (event.key === 'Enter') {
            let value = parseInt(event.target.value, 10);
            if (isNaN(value) || value <= 0) {
                value = 2; // Valor por defecto si la entrada no es válida
            }
            setPer_page(value)
            setaux(value)
            setPag(1)
        }
    }
    const handlePageChange = (event) => {
        const inputValue = event.target.value.trim(); // Obtener el valor del campo eliminando espacios al principio y al final

        // Verificar si el inputValue es vacío o un número válido
        if (inputValue === '' || !isNaN(inputValue)) {
            // Convertir el inputValue a un número entero
            const intValue = parseInt(inputValue, 10);

            // Actualizar el estado solo si intValue es un número válido y mayor que cero
            if (!isNaN(intValue) && intValue >= 0) {
                setPag(inputValue); // Actualizar el estado de 'aux'
            } else {
                setPag(1); // Si el valor no es válido, establecer 'aux' como una cadena vacía
            }
        }
    };
    const handlekeydownPage = (event) => {
        if (event.key === 'Enter') {
            let value = parseInt(event.target.value, 10);
            if (isNaN(value) || value <= 0) {
                value = 2; // Valor por defecto si la entrada no es válida
            }
            setPag(value)
        }
    }

    const handleclickreload = (event) => {
        let value = parseInt(event.target.value, 10);
        if (isNaN(value) || value <= 0) {
            value = 2; // Valor por defecto si la entrada no es válida
        }
        setPer_page(aux)
        setPag(1)
    }
    const handleInputFocus = () => {
        // Resetear el valor del input cuando se selecciona una opción del datalist
        setaux('');
    };



    return (
        <>
            <div className="title">
                <h1>Consulta de Features</h1>
                <input
                    id="perPageInput"
                    type="text"
                    list="defaultNumbers"
                    autoComplete="off"
                    min="1"
                    value={aux}
                    onChange={handlePerPageChange}
                    onKeyDown={handlekeydown}
                    onFocus={handleInputFocus}
                />
                <datalist id="defaultNumbers">
                    <option value="2"></option>
                    <option value="5"></option>
                    <option value="10"></option>
                    <option value="15"></option>
                    <option value="20"></option>
                </datalist>
                <button onClick={handleclickreload}>Actualizar</button>
            </div>
            <div className="pagination">
                <button onClick={handlebuttonback} disabled={pag === 1}>Anterior</button>
                <div>
                    <input
                        id="perPageInput"
                        type="text"
                        autoComplete="off"
                        min="1"
                        value={pag}
                        onChange={handlePageChange}
                        onKeyDown={handlekeydownPage}
                    />
                    <span>of {total}</span>
                </div>


                <button onClick={handlebuttonnex} disabled={pag === total}>Siguiente</button>

            </div>

            <div className="filter-section">
                <h2>Filtrar por Tipo de Magnitud:</h2>
                <div className="checkbox">
                    <label>
                        <input
                            type="checkbox"
                            value="md"
                            checked={magTypes.includes('md')}
                            onChange={handleMagTypeChange}
                        />
                        md
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value="ml"
                            checked={magTypes.includes('ml')}
                            onChange={handleMagTypeChange}
                        />
                        ml
                    </label>

                    <label>
                        <input
                            type="checkbox"
                            value="ms"
                            checked={magTypes.includes('ms')}
                            onChange={handleMagTypeChange}
                        />
                        ms
                    </label>

                    <label>
                        <input
                            type="checkbox"
                            value="mw"
                            checked={magTypes.includes('mw')}
                            onChange={handleMagTypeChange}
                        />
                        mw
                    </label>

                    <label>
                        <input
                            type="checkbox"
                            value="me"
                            checked={magTypes.includes('me')}
                            onChange={handleMagTypeChange}
                        />
                        me
                    </label>

                    <label>
                        <input
                            type="checkbox"
                            value="mi"
                            checked={magTypes.includes('mi')}
                            onChange={handleMagTypeChange}
                        />
                        mi
                    </label>

                    <label>
                        <input
                            type="checkbox"
                            value="mb"
                            checked={magTypes.includes('mb')}
                            onChange={handleMagTypeChange}
                        />
                        mb
                    </label>

                    <label>
                        <input
                            type="checkbox"
                            value="mlg"
                            checked={magTypes.includes('mlg')}
                            onChange={handleMagTypeChange}
                        />
                        mlg
                    </label>


                </div>
            </div>
        </>
    )
}

Navbar.propTypes = {
    pag: PropTypes.number.isRequired,
    setPag: PropTypes.func.isRequired,
    setPer_page: PropTypes.func.isRequired,
    total: PropTypes.number,
    magTypes: PropTypes.array,
    setMagTypes: PropTypes.func.isRequired,
};


export default Navbar