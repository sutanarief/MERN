import React, { useState } from "react";

const ModalAdd = props => {
  const initialState = {
    nama_aplikasi: "",
    keterangan: "",
    jumlah_pengguna: 0,
    pendiri: "",
    tanggal_didirikan: "",
  };

  const [formData, setFormData] = useState(initialState);

  const handleSubmit = e => {
    e.preventDefault();
    fetch("http://localhost:5000/aplikasi", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(formData), // body data type must match "Content-Type" header
    })
      .then(response => response.json())
      .catch(err => console.log(err));
    setFormData({ ...initialState });
  };

  const onChange = e => {
    e.preventDefault();
    const { id, value } = e.target;
    switch (id) {
      case "nama_aplikasi":
        setFormData({ ...formData, nama_aplikasi: value });
        break;
      case "keterangan":
        setFormData({ ...formData, keterangan: value });
        break;
      case "jumlah_pengguna":
        setFormData({ ...formData, jumlah_pengguna: value });
        break;
      case "pendiri":
        setFormData({ ...formData, pendiri: value });
        break;
      case "tanggal_didirikan":
        setFormData({ ...formData, tanggal_didirikan: value });
        break;
      default:
        break;
    }
  };

  return (
    <>
      <button
        type="button"
        className={props.bootstrap}
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        {props.text}
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Data Aplikasi
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="nama_aplikasi" className="form-label fw-bold">
                    Nama Aplikasi
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="nama_aplikasi"
                    value={formData.nama_aplikasi}
                    onChange={onChange}
                    required={true}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="keterangan" className="form-label fw-bold">
                    Keterangan
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="keterangan"
                    value={formData.keterangan}
                    onChange={onChange}
                    required={true}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="jumlah_pengguna"
                    className="form-label fw-bold"
                  >
                    Jumlah Pengguna
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="jumlah_pengguna"
                    value={formData.jumlah_pengguna}
                    onChange={onChange}
                    required={true}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="pendiri" className="form-label fw-bold">
                    Pendiri
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="pendiri"
                    value={formData.pendiri}
                    onChange={onChange}
                    required={true}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="tanggal_didirikan"
                    className="form-label fw-bold"
                  >
                    Tanggal Didirikan
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="tanggal_didirikan"
                    value={formData.tanggal_didirikan}
                    onChange={onChange}
                    required={true}
                  />
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalAdd;
