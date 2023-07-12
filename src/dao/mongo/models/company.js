import mongoose from "mongoose";

const companyCollection = "companies";

const companySchema = new mongoose.Schema({ 
    name: String,
    address: String,
    city: String,
    country: String,
    email: {
        type: String,
        unique: true,
    },
});

export const CompanyModel = mongoose.model(companyCollection, companySchema);
