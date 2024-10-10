import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
    job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    coverLetter: { type: String }, 
    resume: { type: String },
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
