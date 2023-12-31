import { Router } from "express";
import cartController from "../controllers/cart.controller.js";
import { isUser } from "../middlewares/auth.middleware.js";
import purchaseController from "../controllers/purchase.controller.js";

const cartRouter = Router();

cartRouter.get("/", async (req, res) => {
  try {
    res.status(200).send(await cartController.get());
  } catch (err) {
    res.status(400).send(err);
  }
});

cartRouter.get("/:cid", async (req, res) => {
  try {
    res.status(200).send(await cartController.getById(req.params.cid));
  } catch (err) {
    res.status(400).send(err);
  }
});

cartRouter.post("/", async (req, res) => {
  try {
    res.status(201).send(await cartController.add(req.body));
  } catch (err) {
    res.status(400).send(err);
  }
});

cartRouter.put("/:cid", async (req, res) => {
  try {
    res.status(201).send(await cartController.update(req.params.cid, req.body));
  } catch (err) {
    res.status(400).send(err);
  }
});

cartRouter.delete("/:cid", async (req, res) => {
  try {
    res.status(200).send(await cartController.deleteAllProds(req.params.cid));
  } catch (err) {
    res.status(400).send(err);
  }
});

cartRouter.post("/:cid/product/:pid", isUser, async (req, res) => {
  try {
    res
      .status(201)
      .send(await cartController.addProdtoCart(req.params.cid, req.params.pid));
  } catch (err) {
    res.status(400).send(err);
  }
});

cartRouter.delete("/:cid/product/:pid", async (req, res) => {
  try {
    res
      .status(201)
      .send(
        await cartController.deleteProdfromCart(req.params.cid, req.params.pid)
      );
  } catch (err) {
    res.status(400).send(err);
  }
});

cartRouter.put("/:cid/product/:pid", async (req, res) => {
  try {
    res
      .status(201)
      .send(
        await cartController.updateProdfromCart(
          req.params.cid,
          req.params.pid,
          req.body
        )
      );
  } catch (err) {
    res.status(400).send(err);
  }
});

cartRouter.post("/:cid/purchase", async (req, res) => {
  try {
    const { user } = req.session;
    res.status(201).send(await purchaseController.endPurchase(req.params.cid, user))
  } catch (err) {
    res.status(400).send(err);
  }
});

export default cartRouter;
