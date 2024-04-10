import { useState, useEffect, useRef } from "react";
import FeatureList from './assets/components/FeatureList';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from "./assets/components/navbar";
import Feature from "./assets/components/Feature";
import { urlapi } from "./assets/constantes";
function App() {
  const [loading, setLoading] = useState(true);
  const [pag, setPag] = useState(1);
  const [per_page, setPer_page] = useState(2);
  const [total, setTotal] = useState(undefined);
  const [features, setFeatures] = useState(null);
  const [magTypes, setMagTypes] = useState([]);

  const prevPagRef = useRef(undefined);
  const prevPerPageRef = useRef(undefined);
  const prevMagTypesRef = useRef(undefined);
  console.log(urlapi)
  const [featuredata, setFeaturedata] = useState(null)
  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        if (prevPagRef.current === pag && prevPerPageRef.current === per_page && prevMagTypesRef.current === magTypes) {
          return; // Evita hacer una nueva llamada a fetch si no hay cambios relevantes
        }

        const encodedMagTypes = magTypes.map(type => `mag_type[]=${encodeURIComponent(type)}`).join('&');
        const response = await fetch(`${urlapi}?page=${pag}&per_page=${per_page}&${encodedMagTypes}`);
        console.log(`${urlapi}?page=${pag}&per_page=${per_page}&${encodedMagTypes}`)
        if (response.ok) {
          const feature = await response.json();
          setFeatures(feature.data);

          setLoading(false);
          setTotal(feature.pagination.total);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchFeatures();
    prevPagRef.current = pag;
    prevPerPageRef.current = per_page;
    prevMagTypesRef.current = magTypes;
  }, [pag, per_page, magTypes]);

  return (
    <>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <>
          <Router>
            <Routes>
              <Route exact path="/" element={
                <>
                  <nav>
                    <Navbar pag={pag} setPag={setPag} setPer_page={setPer_page} magTypes={magTypes} setMagTypes={setMagTypes} total={total} />
                  </nav>
                  <FeatureList features={features} setFeaturedata={setFeaturedata} />
                </>
              } />
              <Route path="/:usgs_id" element={<Feature data={featuredata} />} />
            </Routes>
          </Router>
        </>
      )}
    </>
  );
}

export default App;

// (
//   !show ? (
//     <>
//       <nav>
//         <Navbar pag={pag} setPag={setPag} setPer_page={setPer_page} magTypes={magTypes} setMagTypes={setMagTypes} total={total} />
//       </nav>
//       <FeatureList features={features} setFeaturedata={setFeaturedata} setShow={setShow} />
//     </>

//   )
//     :
//     (<Feature data={featuredata} setShow={setShow} />)
// )