import mongoose from "mongoose";

const companyCollection = "companies";

const companySchema = new mongoose.Schema({ 
    name: String,
    address: String,
    city: String,
    country: String,
    email: String,
});

 const companyModel = mongoose.model(companyCollection, companySchema);
export default companyModel;
