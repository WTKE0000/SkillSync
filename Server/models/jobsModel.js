import mongoose from "mongoose";

const { Schema } = mongoose;

const jobSchema = new Schema({
    company: { type: Schema.Types.ObjectId, ref: "companies" }, // Corrected 'tpye' and 'comapnies'
    jobTitle: { type: String, required: [true, "Job title is required"] }, // Fixed typo in error message
    location: { type: String, required: [true, "Location is required"] },
    salary: { type: Number, required: [true, "Salary is required"] }, // Corrected error message
    vacancies: { type: Number },
    experiences: { type: Number, default: 0 },
    detail: [{ desc: { type: String }, requirements: { type: String } }],
    application: [{ type: Schema.Types.ObjectId, ref: "Users" }],
}, { timestamps: true });

const Jobs = mongoose.model("Jobs", jobSchema);

export default Jobs;
