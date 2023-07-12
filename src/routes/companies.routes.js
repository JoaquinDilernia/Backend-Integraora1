import { Router } from "express";
import CompaniesManager from "../dao/mongo/manager/companies";

const router = Router();
const companiesManager = new CompaniesManager();

router.get("/", async (req, res) => {
    const companies = await companiesManager.getCompanies();
    res.json({status: "ok", data: companies});
});

export default router;



