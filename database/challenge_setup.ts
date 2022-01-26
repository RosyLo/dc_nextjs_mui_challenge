import { PrismaClient } from '@prisma/client';

(async function challenge_setup() {

    const prisma = new PrismaClient()

    // Cleanup database before (re)creation of entries
    await prisma.$transaction([
        prisma.contract.deleteMany(),
        prisma.customer.deleteMany(),
        prisma.address.deleteMany(),
    ]);

    // Create an address 
    let address = await prisma.address.create({
        data: {
            street: "Examplestreet",
            number: "7",
            city: "Old New York",
            country: "GERMANY",
            postcode: "0815",
        }
    })

    // Create customer "Jane"
    let customer = await prisma.customer.create({
        data: {
            addressId: address.id,
            email: "jane@doe.tld",
            firstname: "Jane",
            lastname: "Doe",
            avatar: "/images/profile/jane.jpg",
            birthdate: new Date(1989, 7, 30, 0, 0, 0),
        }
    });

    // Create contracts for Jane
    await prisma.contract.create({
        data: {
            addressId: address.id,
            customerId: customer.id,
            type: "HOME_OWNER",
            currency: "EUR",
            price: 567.89,
            deductible: 300,
            paymentPeriod: "YEAR",
            details: {
                square_meter: 234,
                floors: "2",
                roof_type: "POINTED_ROOF"
            }
        }
    });
    await prisma.contract.create({
        data: {
            addressId: address.id,
            customerId: customer.id,
            type: "HOME_CONTENT",
            currency: "EUR",
            price: 78.89,
            deductible: 150,
            paymentPeriod: "YEAR",
            details: {
                "square_meter": 234,
                "max_value": 55000,
                "jewelry": true
            }
        }
    });
    await prisma.contract.create({
        data: {
            addressId: address.id,
            customerId: customer.id,
            type: "BIKE",
            currency: "EUR",
            price: 7.89,
            deductible: 150,
            paymentPeriod: "MONTH",
            details: {
                bikeValue: 2399.00,
                brand: "Scyt",
                frameSizeInInch: 27,
                electric: false
            }
        }
    });
})()

module.exports = 1;