import { Router } from "express";
import Controller from "./controller.interface";
import Service from "./service";


interface Module {
    router: Router;
    path: string,
    controller: Controller,
}

export default Module