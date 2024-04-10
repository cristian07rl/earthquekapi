import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { urlapi } from "../constantes"

const Feature = ({ data }) => {
    const navigate = useNavigate()
    const { usgs_id } = useParams();
    const [Data, setData] = useState(data)
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    useEffect(() => {
        const Datafecth = async () => {
            const response = await fetch(`${urlapi}/${usgs_id}`)
            if (response.ok) {
                const res = await response.json();
                setData(res)
            }
            else {
                setData(response.status)
            }
        }
        const commets = async () => {
            const response = await fetch(`${urlapi}/${usgs_id}/comments`)
            if (response.ok) {
                const res = await response.json();
                setComments([...res])
            }
            else {
                setComments(response.status)
            }
        }
        if (data == null) {
            Datafecth()
        }
        commets()
    }, [usgs_id, data])
    const handleclickback = () => {
        navigate("/")
    }





    const handleInputChange = (event) => {
        setNewComment(event.target.value);
    };

    const handleAddComment = async () => {
        const coment = { comment: { usgs_id: Data.attributes.external_id, body: newComment } }
        const response = await fetch(`${urlapi}/${Data.attributes.external_id}/comments`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(coment)
            })
        if (newComment.trim() !== '') {

            setNewComment('');
        }
        if (response.status) {
            const res = await response.json();
            setComments([...comments, res]);
            console.log(response.status)
        }
    };
    if (Data != null && (Data == 404)) {
        console.log((Array.isArray(Data)))
        console.log(Data)
        return (<>
            <h1>feature not found</h1>
        </>)
    }
    else {
        return (
            <>
                {(!Data ? (<h1>cargando</h1>) :
                    <div className='showfeature'>
                        <button className='backbutton' onClick={handleclickback}>atras</button>
                        <div className='featurecontainer'>
                            <h1>feature</h1>
                            <p>id: {Data.attributes.external_id}</p>
                            <p>Título: {Data.attributes.title}</p>
                            <p>Magnitude: {Data.attributes.magnitude}</p>
                            <p>Lugar: {Data.attributes.place}</p>
                            <p>hora: {Data.attributes.time}</p>
                            <p>tsunami: {`${Data.attributes.tsunami}`}</p>
                            <p>mag_type: {Data.attributes.mag_type}</p>
                            <p>titulo: {Data.attributes.title}</p>
                            <p>longitud: {Data.attributes.coordinates.longitude}</p>
                            <p>latitud: {Data.attributes.coordinates.latitude}</p>
                            <p className="tdstring"><a href={Data.links.external_url} target="_blank">{Data.links.external_url}</a></p>
                            <hr />
                        </div>
                        <div className='commentscontainer'>
                            <h1>Comentarios</h1>
                            {comments.map((comment, index) => (
                                <h2 key={index}>{comment.body}</h2>
                            ))}
                            <div className='comentsinput'>
                                <textarea
                                    value={newComment}
                                    onChange={handleInputChange}
                                    placeholder="Añadir comentario..."
                                    rows={4} // Puedes ajustar la altura del textarea aquí
                                    cols={50} // Puedes ajustar el ancho del textarea aquí
                                />
                                <button onClick={handleAddComment}>Agregar comentario</button>
                            </div>

                        </div>
                    </div>
                )}

            </>

        );
    }
}

Feature.propTypes = {
    data: PropTypes.object,
    setShow: PropTypes.func
}

export default Feature