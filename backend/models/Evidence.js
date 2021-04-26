const mongoose = require('mongoose');
const { claimTypes } = require('../../config/claimTypes');
const { claimStrength } = require('../../config/claimStrength');
const { softwareDevPractices } = require('../../config/softwareDevPractices');

const EvidenceSchema = new mongoose.Schema({
  author: {
    type: String,
    required: false,
  },
  title: {
    type: String,
    required: true,
  },
  journal: {
    type: String,
    required: false,
  },
  year: {
    type: Number,
    required: false,
  },
  volume: {
    type: Number,
    required: false,
  },
  url: {
    type: String,
    required: true,
  },
  doi: {
    type: String,
    required: false,
  },
  software_dev_practice: {
    type: String,
    enum: [softwareDevPractices],
    required: true,
  },
  claim: {
    type: String,
    /* enum: [claimTypes.CODEQUALITY, claimTypes.PRODUCTQUALITY, claimTypes.TEAMCONFIDENCE], */
    enum: [claimTypes],
    required: true,
  },
  claim_strength: {
    type: String,
    /* enum: [claimStrength.STRONGLYAGAINST, claimStrength.MOSTLYAGAINST, claimStrength.MIXED,
      claimStrength.MOSTLYAGAINST, claimStrength.STRONGLYAGREE], */
    enum: [claimStrength],
    required: true,
  },
  updated_date: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

const Token = mongoose.model('evidence', EvidenceSchema);
module.exports = Token;
