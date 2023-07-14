import { Router } from "express";
import CompaniesManager from "../dao/mongo/manager/companies.js";

const router = Router();
const companiesManager = new CompaniesManager();

router.get("/", async (req, res) => {
    const companies = await companiesManager.getCompanies();
    res.json({status: "ok", data: companies});
});

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    const company = await companiesManager.getCompany(id);
    res.json({status: "ok", data: company});
});

router.post("/", async (req, res) => {
    const company = req.body;
    const createdCompany = await companiesManager.createCompany(company);
    res.json({status: "ok", data: createdCompany});

});

export default router;



