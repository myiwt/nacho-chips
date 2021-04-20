/* eslint-disable no-unused-vars */
import React from 'react';

const express = require('express');
const Evidence = require('../../models/Evidence'); // Load Evidence model

function Result() {
  const router = express.Router();
  // @route GET api/books
  // @description Get all evidence
  // @access Public
  router.get('/', (req, res) => {
    Evidence.find()
      .then((result) => res.json(result))
      .catch((err) => res.status(404).json({ noevidencefound: 'No evidence found' }));
  });

  return (
    <h2>Result</h2>
  );
}

export default Result;
