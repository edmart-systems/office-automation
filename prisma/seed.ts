import { Prisma, PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const main = async () => {
  const roleTable: Prisma.BatchPayload = await prisma.role.createMany({
    data: [
      {
        role_id: 1,
        role: "manager",
        role_desc: "Person that oversees employees",
      },
      {
        role_id: 2,
        role: "employee",
        role_desc: "Person employed by the firm",
      },
    ],
  });

  const statusTable: Prisma.BatchPayload = await prisma.status.createMany({
    data: [
      {
        status_id: 1,
        status: "active",
        status_desc: "Actively working user account",
      },
      {
        status_id: 2,
        status: "blocked",
        status_desc: "User account temporarily suspended",
      },
      {
        status_id: 3,
        status: "pending",
        status_desc: "User account pending activation",
      },
      {
        status_id: 4,
        status: "inactive",
        status_desc: "Employee no longer with the company",
      },
    ],
  });

  const userTable: Prisma.BatchPayload = await prisma.user.createMany({
    data: [
      {
        userId: 1,
        co_user_id: "ESUL0224003",
        firstName: "Mike",
        lastName: "Smith",
        email: "mike.smith@test.com",
        email_verified: 1,
        phone_number: "+256781221212",
        hash: await bcrypt.hash("Psu#sm3RSMgS-92", 2),
        profile_picture: "john_doe_profile.png",
        status_id: 1,
        role_id: 1,
      },
      {
        userId: 2,
        co_user_id: "TEMP0224001",
        firstName: "Jane",
        lastName: "Smith",
        email: "jane.smith@test.com",
        email_verified: 1,
        phone_number: "+256780000000",
        hash: await bcrypt.hash("Psu#sm3RSMgS-91", 2),
        profile_picture: "jane_smith_profile.png",
        status_id: 3,
        role_id: 2,
      },
    ],
  });

  const currencyTable: Prisma.BatchPayload = await prisma.currency.createMany({
    data: [
      {
        currency_id: 1,
        currency_code: "UGX",
        currency_name: "Uganda Shilling",
      },
      {
        currency_id: 2,
        currency_code: "USD",
        currency_name: "US Dollar",
      },
      {
        currency_id: 3,
        currency_code: "EUR",
        currency_name: "Euro",
      },
    ],
  });

  const unitTable: Prisma.BatchPayload = await prisma.unit.createMany({
    data: [
      {
        unit_id: 1,
        name: "Kilogram",
        short_name: "kg",
        unit_desc: "Unit of mass in the metric system",
      },
      {
        unit_id: 2,
        name: "Gram",
        short_name: "g",
        unit_desc:
          "A smaller unit of mass in the metric system, equal to 1/1000 of a kilogram",
      },
      {
        unit_id: 3,
        name: "Meter",
        short_name: "m",
        unit_desc: "Base unit of length in the metric system",
      },
      {
        unit_id: 4,
        name: "Centimeter",
        short_name: "cm",
        unit_desc: "A unit of length equal to 1/100 of a meter",
      },
      {
        unit_id: 5,
        name: "Liter",
        short_name: "L",
        unit_desc:
          "Unit of volume in the metric system, commonly used for liquids",
      },
      {
        unit_id: 6,
        name: "Milliliter",
        short_name: "mL",
        unit_desc:
          "A smaller unit of volume in the metric system, equal to 1/1000 of a liter",
      },
      {
        unit_id: 7,
        name: "Piece",
        short_name: "pc",
        unit_desc: "Unit representing a single item or object",
      },
      {
        unit_id: 8,
        name: "Pack",
        short_name: "pk",
        unit_desc: "Unit representing a group of items packaged together",
      },
    ],
  });

  const quotationTypeTable: Prisma.BatchPayload =
    await prisma.quotation_type.createMany({
      data: [
        {
          type_id: 1,
          name: "Supply of Products",
        },
        {
          type_id: 2,
          name: "Provision of Services",
        },
        {
          type_id: 3,
          name: "Supply of Products And Provision of Services",
        },
      ],
    });

  //Edmart Specific Data
  const quotationTcsTable: Prisma.BatchPayload =
    await prisma.quotation_tcs.createMany({
      data: [
        {
          tc_id: 1,
          quotation_type_id: 1,
          delivery: "Within two (02) days from the date of purchase order",
          validity: "Thirty (30) days from the date of quotation",
          payment_period:
            "30 days after delivery of the items and presentation of a tax invoice",
          payment_details:
            "The payment shall be by Cheque, EFT or RTGS to our account with the following details",
        },
        {
          tc_id: 2,
          quotation_type_id: 2,
          delivery: "Within two (02) days from the date of purchase order",
          validity: "Thirty (30) days from the date of quotation",
          payment_period: "70% on commissioning and 30% on completion of works",
          payment_details:
            "The payment shall be by Cheque, EFT or RTGS to our account with the following details",
        },
        {
          tc_id: 3,
          quotation_type_id: 3,
          delivery: "Within two (02) days from the date of purchase order",
          validity: "Thirty (30) days from the date of quotation",
          payment_period: "70% on commissioning and 30% on completion of works",
          payment_details:
            "The payment shall be by Cheque, EFT or RTGS to our account with the following details",
        },
      ],
    });

  const companyTable: Prisma.BatchPayload = await prisma.company.createMany({
    data: [
      {
        co_id: 1,
        legal_name: "Edmart Systems (U) Limited",
        business_name: "Edmart Systems",
        tin: "1001260908",
        email: "info@edmartsystems.com",
        landline_number: "+256414697063",
        phone_number_1: "+256393255022",
        phone_number_2: "+256773410155",
        logo: "edmart_logo.png",
        web: "www.edmartsystems.com",
      },
    ],
  });

  const companyAddressTable: Prisma.BatchPayload =
    await prisma.company_address.createMany({
      data: [
        {
          co_ad_id: 1,
          co_id: 1,
          branch_number: "001",
          branch_name: "Head Office",
          box_number: "33884",
          street: "Nkrumah Road",
          plot_number: "29/29A",
          building_name: "Karobwa Towers",
          floor_number: 3,
          room_number: "F3-05",
          country: "Uganda",
          district: "Kampala",
          county: "Central",
          subcounty: "Kampala Central",
          village: "Nakasero",
        },
      ],
    });

  const bankTable: Prisma.BatchPayload = await prisma.bank.createMany({
    data: [
      {
        bank_id: 1,
        co_id: 1,
        name: "Stanbic Bank",
        branch_name: "Garden City",
        ac_title: "Edmart Systems Uganda Limited",
        ac_number: "9030005790467",
      },
    ],
  });
  //Edmart Specific Data End
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
