const router = require("express").Router();
const SocialMediaController = require("../controllers/socialmedia.controller");

router.get("/aplikasi", SocialMediaController.showSocialMedia);
router.post("/aplikasi", SocialMediaController.addAplikasi);
router.get("/aplikasi/:id", SocialMediaController.aplikasiDetail);
router.delete("/aplikasi/:id", SocialMediaController.deleteAplikasi);
router.put("/aplikasi/:id", SocialMediaController.updateAplikasi);

module.exports = router;
