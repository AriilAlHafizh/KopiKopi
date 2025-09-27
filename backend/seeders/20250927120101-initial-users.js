// 'use strict'; // baris ini tidak lagi diperlukan di ES Modules
import argon2 from 'argon2';
import { v4 as uuidv4 } from 'uuid';

/** @type {import('sequelize-cli').Migration} */
// Ganti module.exports menjadi export default
export default {
  async up (queryInterface, Sequelize) {
    const adminPassword = await argon2.hash('admin123');
    const sellerPassword = await argon2.hash('seller123');
    const buyerPassword = await argon2.hash('buyer123');

    await queryInterface.bulkInsert('users', [
      {
        uuid: uuidv4(),
        name: 'Admin Utama',
        email: 'admin@gmail.com',
        alamat: 'Jl. Kantor Pusat No. 1',
        no_tlp: '081234567890',
        password: adminPassword,
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        uuid: uuidv4(),
        name: 'Seller Contoh',
        email: 'seller@gmail.com',
        alamat: 'Jl. Toko No. 2',
        no_tlp: '081234567891',
        password: sellerPassword,
        role: 'seller',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        uuid: uuidv4(),
        name: 'Buyer Contoh',
        email: 'buyer@gmail.com',
        alamat: 'Jl. Rumah No. 3',
        no_tlp: '081234567892',
        password: buyerPassword,
        role: 'buyer',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', {
      email: ['admin@gmail.com', 'seller@gmail.com', 'buyer@gmail.com']
    }, {});
  }
};