import { plainToClassFromExist } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';

import 'reflect-metadata';
import HttpException from '../exceptions/http.exception';

async function ValidateDto<T>(dtoClass: any, data: any): Promise<T> {
    const dto: T = plainToClassFromExist(new dtoClass(), data);
    // @ts-ignore
    const errors = await validate(dto, {
        whitelist: true,
    });
    if (errors.length) {
        const errs = getConstraints(errors);
        throw new HttpException(400, errs.join(';'));
    }
    return dto;
}

function getConstraints(errors: ValidationError[]) {
    return errors.map((err) => Object.values(err.constraints || {}).join(','));
}

export default ValidateDto;
