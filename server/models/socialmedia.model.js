const { Schema, model } = require("mongoose");

const socialMediaSchema = new Schema(
  {
    nama_aplikasi: {
      type: String,
      required: true,
      unique: true,
    },
    keterangan: {
      type: String,
      required: true,
    },
    jumlah_pengguna: {
      type: Number,
      required: true,
    },
    pendiri: {
      type: String,
      required: true,
    },
    tanggal_didirikan: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const SocialMedia = model("SocialMedia", socialMediaSchema);

module.exports = SocialMedia;
