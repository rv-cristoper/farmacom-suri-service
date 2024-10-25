import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from '../../schemas/product.schema';
import { Model } from 'mongoose';
import { ProductStock } from '../../schemas/product-stock.schema';
// import { ProductStock } from '../../schemas/product-stock.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private product: Model<Product>,
    @InjectModel(ProductStock.name)
    private productStockModel: Model<ProductStock>,
    // @InjectModel(ProductStock.name)
    // private productStock: Model<ProductStock>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    try {
      const product = new this.product(createProductDto);
      return await product.save();
    } catch (e) {
      if (e.code === 11000) {
        throw new ConflictException({
          message: 'Product name already exists',
        });
      }
      throw e;
    }
  }

  async findAll() {
    const productsWithStock = await this.product
      .aggregate([
        {
          $lookup: {
            from: 'productstocks', // Nombre de la colección ProductStock
            localField: '_id', // Campo en Product que queremos relacionar
            foreignField: 'product', // Campo en ProductStock que referencia al producto
            as: 'stocks', // Nombre del campo donde se almacenarán los registros de stock
          },
        },
      ])
      .exec();

    return productsWithStock;
    // const productsWithStock = await this.product
    //   .aggregate([
    //     {
    //       $lookup: {
    //         from: 'productstocks', // Nombre de la colección ProductStock (en minúsculas y plural)
    //         localField: '_id', // Campo en Product que estamos relacionando
    //         foreignField: 'product', // Campo en ProductStock que referencia al producto
    //         as: 'stock', // El array resultante con los registros de stock
    //       },
    //     },
    //     {
    //       $unwind: {
    //         // Descompone los documentos de stock, asegurando que no haya limitación a un solo documento.
    //         path: '$stock',
    //         preserveNullAndEmptyArrays: true,
    //       },
    //     },
    //     {
    //       $group: {
    //         // Agrupa los productos para que tengan un array `stock` con todos los registros relacionados.
    //         _id: '$_id',
    //         name: { $first: '$name' },
    //         stock: { $push: '$stock' }, // Agrupa todos los registros de stock relacionados
    //       },
    //     },
    //   ])
    //   .exec();
    // const productsWithStock = await this.product
    //   .aggregate([
    //     {
    //       $lookup: {
    //         from: 'productstocks', // Asegúrate de que es el nombre correcto de la colección en MongoDB
    //         localField: '_id', // Campo en Product para el join
    //         foreignField: 'product', // Campo en ProductStock que referencia al producto
    //         as: 'stock', // El array resultante con todos los registros de stock
    //       },
    //     },
    //     {
    //       $addFields: {
    //         // Añadimos un campo stock vacío si no hay coincidencias
    //         stock: { $ifNull: ['$stock', []] },
    //       },
    //     },
    //   ])
    //   .exec();
    // return productsWithStock;
    // return productsWithStock;
    // const productsWithStock = await this.product
    //   .aggregate([
    //     {
    //       $lookup: {
    //         from: 'productstocks', // Nombre de la colección ProductStock (en minúsculas y plural)
    //         localField: '_id', // Campo en Product que estamos relacionando
    //         foreignField: 'product', // Campo en ProductStock que referencia al producto
    //         as: 'stock', // El array resultante con los registros de stock
    //       },
    //     },
    //   ])
    //   .exec();
    // return productsWithStock;
    // return this.product.find();
  }

  async findOne(id: string) {
    try {
      const product = await this.product.findById(id);
      if (!product) throw new Error();
      return product;
    } catch (e) {
      throw new NotFoundException({
        message: 'Product does not exists',
      });
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    try {
      return await this.product.findByIdAndUpdate(id, updateProductDto);
    } catch (e) {
      if (e.code === 11000) {
        throw new ConflictException({
          message: 'Product name already exists',
        });
      }
      throw new NotFoundException({
        message: 'Product does not exists',
      });
    }
  }

  async remove(id: string) {
    try {
      return await this.product.findByIdAndUpdate(id, { isActive: false });
    } catch (e) {
      throw new NotFoundException({
        message: 'Product does not exists',
      });
    }
  }
}
