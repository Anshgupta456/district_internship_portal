const Job = require('../models/Job');

exports.createJob = async (req, res) => {
  const { title, description, eligibilityCriteria, stipend, openings, location } = req.body;
  try {
    const job = new Job({
      title,
      description,
      eligibilityCriteria,
      stipend,
      openings,
      location,
      postedBy: req.user.id
    });
    await job.save();
    res.status(201).json({ message: 'Job created successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate('postedBy', 'name email');
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate('postedBy', 'name email');
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.json(job);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    const { title, description, eligibilityCriteria, stipend, openings, location } = req.body;
    job.title = title || job.title;
    job.description = description || job.description;
    job.eligibilityCriteria = eligibilityCriteria || job.eligibilityCriteria;
    job.stipend = stipend || job.stipend;
    job.openings = openings || job.openings;
    job.location = location || job.location;
    await job.save();
    res.json({ message: 'Job updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    await job.remove();
    res.json({ message: 'Job deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.applyJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    if (!job.applicants.includes(req.user.id)) {
      job.applicants.push(req.user.id);
      await job.save();
      res.json({ message: 'Applied successfully' });
    } else {
      res.status(400).json({ message: 'Already applied' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
