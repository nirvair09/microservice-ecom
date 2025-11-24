import {Prisma,prisma} from "@repo/product-db";
import {Request,Response} from "express";

export const createCategory = async(req:Request,res:Response)=>{
    const data :Prisma.CategoryCreateInput = req.body;
    try {
        const category = await prisma.category.create({data});
        return res.status(200).json(category);
    } catch (error) {
        return res.status(500).json(error);
    }
};

export const updateCategory = async (req:Request,res:Response)=>{
    const {id}=req.params;

    const data :Prisma.CategoryUpdateInput = req.body;
    try {
        const updatedCatgory=await prisma.category.update({where:{id:Number(id)},data});

        return res.status(200).json(updatedCatgory);
    } catch (error) {
        return res.status(500).json(error);
    };
};


export const deleteCategory = async(req:Request,res:Response)=>{
    const {id}=req.params;

    try {
        const deletedCategory=await prisma.category.delete(
           { where:{id:Number(id)},}
        );

        return res.status(200).json(deletedCategory);
    } catch (error) {
        return res.status(500).json(error);
    }
};


export const getCategories = async(req:Request,res:Response)=>{
    try {
        const categories = await prisma.category.findMany();
        return res.status(200).json(categories);
    } catch (error) {
        return res.status(500).json(error);
    }
};

