/* eslint-disable react/prop-types */
// FeatureList.js
import { useNavigate } from 'react-router-dom';
const FeatureList = ({ features, setFeaturedata, }) => {

    const navigate = useNavigate()

    const handleclickfeature = (feature) => {
        navigate(`/${feature.attributes.external_id}`);
        setFeaturedata(feature)
    }
    return (
        <>
            <div className="table-container">
                <h2>Lista de Features</h2>
                <table>
                    <thead>
                        <tr>
                            <th>External ID</th>
                            <th>Magnitude</th>
                            <th>Place</th>
                            <th>Time</th>
                            <th>Tsunami</th>
                            <th>Magnitude Type</th>
                            <th>Title</th>
                            <th>Longitude</th>
                            <th>Latitude</th>
                            <th>External URL</th>
                        </tr>
                    </thead>
                    <tbody>
                        {features.map((feature) => (

                            <tr key={feature.id} onClick={() => handleclickfeature(feature)}>
                                <td>{feature.attributes.external_id}</td>
                                <td>{feature.attributes.magnitude}</td>
                                <td>{feature.attributes.place}</td>
                                <td>{feature.attributes.time}</td>
                                <td>{`${feature.attributes.tsunami}`}</td>
                                <td>{feature.attributes.mag_type}</td>
                                <td>{feature.attributes.title}</td>
                                <td>{feature.attributes.coordinates.longitude}</td>
                                <td>{feature.attributes.coordinates.latitude}</td>
                                <td className="tdstring"><a href={feature.links.external_url} target="_blank">{feature.links.external_url}</a></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
};

export default FeatureList;
