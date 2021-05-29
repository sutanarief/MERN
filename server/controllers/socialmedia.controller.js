const SocialMedia = require("../models/socialmedia.model");

class SocialMediaController {
  static showSocialMedia(req, res) {
    if (req.query.pendiri) {
      // console.log("masuk, ", req.query.pendiri);
      SocialMedia.findOne({ pendiri: new RegExp(req.query.pendiri, "i") })
        .then(data => res.status(200).json(data))
        .catch(err => res.status(400).json("Error: " + err));
    } else {
      SocialMedia.find({})
        .sort({ createdAt: -1 })
        .then(data => res.status(200).json(data))
        .catch(err => res.status(400).json("Error: " + err));
    }
  }

  static aplikasiDetail(req, res) {
    const id = req.params.id;
    SocialMedia.findById(id)
      .then(data => res.status(200).json(data))
      .catch(err => res.status(400).json("Error: " + err));
  }

  static addAplikasi(req, res) {
    const {
      nama_aplikasi,
      keterangan,
      jumlah_pengguna,
      pendiri,
      tanggal_didirikan,
    } = req.body;

    const newData = new SocialMedia({
      nama_aplikasi,
      keterangan,
      jumlah_pengguna,
      pendiri,
      tanggal_didirikan,
    });

    newData
      .save()
      .then(() => res.status(201).json(`Data Added! ${newData.pendiri}`))
      .catch(err => res.status(400).json("Error: " + err));
  }

  static updateAplikasi(req, res) {
    const newData = req.body;
    const id = req.params.id;
    console.log(newData, id);
    SocialMedia.findByIdAndUpdate(id, newData, { new: true })
      .then(data => res.status(200).json(data))
      .catch(err => res.status(400).json("Error: " + err));
  }

  static deleteAplikasi(req, res) {
    const id = req.params.id;
    SocialMedia.findByIdAndDelete(id)
      .then(() => res.status(200).json("Data Deleted."))
      .catch(err => res.status(400).json("Error: " + err));
  }
}

module.exports = SocialMediaController;
