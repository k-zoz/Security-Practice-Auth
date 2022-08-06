const apicache = require("apicache");
const cache = apicache.middleware;

const express = require("express");
const router = express.Router();

const {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
} = require("../../controllers/jobs");

router.get("/", cache("5 minutes"), getAllJobs);
router.get("/:id", getJob);
router.post("/", createJob);
router.delete("/:id", deleteJob);
router.patch("/:id", updateJob);

module.exports = router;
