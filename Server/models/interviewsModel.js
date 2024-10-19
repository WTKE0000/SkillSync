import mongoose from "mongoose";

const interviewSchema = new mongoose.Schema({
    job: { type: mongoose.Schema.Types.ObjectId, ref: 'Jobs', required: true },
    applicant: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
    company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
    interviewLink: { type: String, required: true },
    interviewTime: { type: String, required: true },
    interviewDate: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });
interviewSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
  });
  
  const Interview = mongoose.model("Interview", interviewSchema);
  export default Interview;
