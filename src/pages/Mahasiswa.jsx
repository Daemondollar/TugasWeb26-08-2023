import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import axios from 'axios';

const Mahasiswa = () => {
    
const [data, setData] = useState(null);

    const fetchData = async () => {
    const res = await axios.get("https://strapi-rygs.onrender.com/api/prodis");
    // console.log(res.data.data[0].attributes.prodi[0]);
    setData(res.data.data[0].attributes.prodi[0]);
    }

    useEffect(() => {
    fetchData()
    }, []);

    const obj = useParams();
    const NPM = obj.id;
    let test = 0;

    const tahunMasuk = "20" + NPM.substring(0,2);
    const kodeProdi = NPM.substring(4,6);
    const id = parseInt(NPM.substring(6,10));

    const generateNPM = (tahun_masuk, kode_prodi, kode_unik) => {
        const tahunMasuk = tahun_masuk.slice(-2);
        const tahunLulus = parseInt(tahunMasuk) + 4
        const kodeUnik = ("000" + kode_unik).slice(-4);
        return tahunMasuk + tahunLulus + kode_prodi + kodeUnik
      }
    
    return (
        <div>
          {data?.map((prodi, index) => (
            <div key={index}>    
              {prodi.kode_prodi == kodeProdi ? (
              <div>
              {prodi.mahasiswa.map((angkatan, index) => (
                <div>
                    {angkatan.tahun_masuk === tahunMasuk ? (
                    <div key={index}>
                    {["pagi", "malam", "cuti"].map((kelas, index) => (
                        <div key={index}>   
                        {angkatan.data[kelas].length !== 0 ? (
                            <div>
                                {angkatan.data[kelas].map((mahasiswa, index) => (
                                    <div>    
                                        {mahasiswa.id == id ? (
                                        <div>
                                        <h1><b>Data Mahasiswa</b></h1>
                                        <p>NPM : {NPM}</p>
                                        <p>Nama : {mahasiswa.nama}</p>
                                        <p>Jenis Kelamin : {
                                            mahasiswa.jenis_kelamin === "L" ? "Laki-laki" :
                                                mahasiswa.jenis_kelamin === "P" ? "Perempuan" : "Tidak Diketahui"
                                            }</p>
                                        <p>Alamat : {mahasiswa.alamat}</p>
                                        <p>Hobi : {mahasiswa.hobi.join(", ")}</p>
                                        </div>
                                        ) : null
                                        }
                                        <div className='opacity-0'>
                                        {mahasiswa.id == id ? (test = test + 1) : null}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            null
                        )}
                    </div>
                  ))}
                </div>) : null }
                </div>
                ))}
                </div>) : null}        
            </div>
          ))}
          {test == 0 ? 
          (
          <div>
          <h1><b>Data Mahasiswa</b></h1>
          <p>Mahasiswa Tidak Terdata</p>
          </div>
          ) : null}
        </div>
    )
}


export default Mahasiswa