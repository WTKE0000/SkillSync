import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
    job: { type: mongoose.Schema.Types.ObjectId, ref: 'Jobs', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
    coverLetter: { type: String }, 
    resumeUrl: { type: String },
    status: { type: String, enum: ['pending', 'accepted', 'rejected', 'canceled'], default: 'pending' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }, 
    interviewLink: { type: String },
  });
applicationSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
  });
  
  const Application = mongoose.model("Application", applicationSchema);
  export default Application;
