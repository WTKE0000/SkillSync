import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    company: {tpye: Schema.Types.ObjectId, ref: "comapnies"},
    jobTitle: { type: String, required: [true, "job tiile is required"]},
    location: {type: String, required: [true, "location is required"]},
    salary: { type: Number, required:[true, "location is required"] },
    vacancies: {type: Number},
    experiences:{type: Number, default: 0},
    detail: [{desc: {type: String}, requirements: {type: String} }],
    application: [{ type: Schema.Types.ObjectId, ref: "Users"}],

},
{timestamps: true}
);

const Jobs = mongoose.model("Jobs", jobSchema);

export default Jobs;