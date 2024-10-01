import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
    job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    coverLetter: { type: String }, 
   // resume: { type: String },
    status: { type: String, enum: ['pending', 'accepted', 'rejected', 'canceled'], default: 'pending' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },  // Track updates
    interviewLink: { type: String },
  });
// Add a pre-save hook to automatically update `updatedAt` on document updates
applicationSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
  });
  
  const Application = mongoose.model("Application", applicationSchema);
  export default Application;
