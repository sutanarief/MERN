import React, { useEffect, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Button from "../components/Button";
import ModalAdd from "../components/ModalAdd";
import ModalEdit from "../components/ModalEdit";

const Table = () => {
  const [aplikasi, setAplikasi] = useState([]);
  const [search, setSearch] = useState("");
  const [tableData, setTableData] = useState("");
  const [showEditor, setShowEditor] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    if (search) {
      fetch(`http://localhost:5000/aplikasi?pendiri=${search}`)
        .then(response => {
          if (!response.ok) {
            throw Error(response.statusText);
          }
          return response.json();
        })
        .then(result => {
          setAplikasi([result]);
        });
    } else {
      fetch("http://localhost:5000/aplikasi")
        .then(response => {
          if (!response.ok) {
            throw Error(response.statusText);
          }
          return response.json();
        })
        .then(result => {
          result.sort();
          setAplikasi(result);
        });
    }
  };

  const viewDocument = (e, value) => {
    if (!tableData) {
      const elements = document.getElementById("dataTable");
      const cloneElements = elements.cloneNode(true);
      const exclude = cloneElements.getElementsByClassName("exclude");
      while (exclude.length > 0) {
        exclude[0].parentNode.removeChild(exclude[0]);
      }
      setTableData(cloneElements.outerHTML);
    }
    setShowEditor(value);
  };

  const onChange = e => {
    const { value } = e.target;
    setSearch(value);
  };

  const deleteData = (e, id) => {
    e.preventDefault();
    fetch(`http://localhost:5000/aplikasi/${id}`, {
      method: "DELETE",
      mode: "cors",
    })
      .then(response => response.json())
      .catch(err => console.log(err));
  };

  useEffect(() => {
    if (aplikasi.length > 1 || aplikasi.length === 0) {
      fetch("http://localhost:5000/aplikasi")
        .then(response => {
          if (!response.ok) {
            throw Error(response.statusText);
          }
          return response.json();
        })
        .then(result => {
          result.sort();
          setAplikasi(result);
        });
    }
  }, []);

  return (
    <>
      {showEditor ? (
        <>
          <button
            className="btn btn-primary mt-2 ms-2"
            onClick={e => viewDocument(e, false)}
          >
            Back
          </button>
          <div className="container mt-4">
            <CKEditor editor={ClassicEditor} data={tableData} />
          </div>
        </>
      ) : (
        <>
          <div className="d-flex flex-col justify-content-between">
            <div className="d-flex">
              <ModalAdd
                text="Tambah Aplikasi"
                bootstrap="btn btn-primary mt-2 ms-2"
              />
              <form className="d-flex btn me-2" onSubmit={handleSubmit}>
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  onChange={onChange}
                />
                <button className="btn btn-outline-success" type="submit">
                  Search
                </button>
              </form>
            </div>
            <div>
              <button
                className="btn btn-primary mt-3 me-3"
                table={tableData}
                onClick={e => viewDocument(e, true)}
              >
                View as Document
              </button>
            </div>
          </div>
          <div className="container-fluid w-100 h-100 mt-2">
            <table className="table" id="dataTable">
              <thead className="table-dark">
                <tr>
                  <th scope="col">Nama Aplikasi</th>
                  <th scope="col">Keterangan</th>
                  <th scope="col">Jumlah Pengguna</th>
                  <th scope="col">Pendiri</th>
                  <th scope="col">Tanggal Didirikan</th>
                  <th scope="col" className="exclude">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {aplikasi.map((data, index) => {
                  return (
                    <>
                      {data ? (
                        <tr key={index}>
                          <td>{data.nama_aplikasi}</td>
                          <td>{data.keterangan}</td>
                          <td>{data.jumlah_pengguna}</td>
                          <td>{data.pendiri}</td>
                          <td>
                            {new Date(data.tanggal_didirikan).getDate()}{" "}
                            {new Date(
                              data.tanggal_didirikan
                            ).toLocaleDateString("id", {
                              month: "long",
                            })}{" "}
                            {new Date(data.tanggal_didirikan).getFullYear()}
                          </td>
                          <td className="exclude">
                            <>
                              <ModalEdit
                                text="Edit"
                                bootstrap="btn btn-warning me-2"
                                id={data._id}
                                keyIndex={index}
                              />
                              <Button
                                text="Hapus"
                                bootstrap="btn btn-danger"
                                action={e => deleteData(e, data._id)}
                              />
                            </>
                          </td>
                        </tr>
                      ) : null}
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
};

export default Table;
