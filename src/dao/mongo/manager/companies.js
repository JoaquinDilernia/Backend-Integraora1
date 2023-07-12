import CompanyModel from "../models/company.js";

export default class CompaniesManager {
    getCompanies = () => {
        return CompanyModel.find();
    }

    getCompany = (id) => {
        return CompanyModel.findById(id);
    }

    createCompany = (company) => {
        return CompanyModel.create(company);
    }

    updateCompany = (id, company) => {
        return CompanyModel.findByIdAndUpdate(id, company);
    }

    deleteCompany = (id) => {
        return CompanyModel.findByIdAndDelete(id);
    }

}