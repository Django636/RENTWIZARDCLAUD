// infra/prisma/seed/seed.ts
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // ── Users ──
  const passwordHash = await bcrypt.hash('Test1234!', 12);

  const owner = await prisma.user.upsert({
    where: { email: 'owner@rentwizard.local' },
    update: {},
    create: {
      email: 'owner@rentwizard.local',
      passwordHash,
      firstName: 'Hans',
      lastName: 'Müller',
      phone: '+491701234567',
      role: 'OWNER',
    },
  });

  const manager = await prisma.user.upsert({
    where: { email: 'manager@rentwizard.local' },
    update: {},
    create: {
      email: 'manager@rentwizard.local',
      passwordHash,
      firstName: 'Anna',
      lastName: 'Schmidt',
      role: 'MANAGER',
    },
  });

  const tenant1 = await prisma.user.upsert({
    where: { email: 'mieter1@rentwizard.local' },
    update: {},
    create: {
      email: 'mieter1@rentwizard.local',
      passwordHash,
      firstName: 'Max',
      lastName: 'Meier',
      phone: '+491709876543',
      role: 'TENANT',
    },
  });

  const tenant2 = await prisma.user.upsert({
    where: { email: 'mieter2@rentwizard.local' },
    update: {},
    create: {
      email: 'mieter2@rentwizard.local',
      passwordHash,
      firstName: 'Lisa',
      lastName: 'Weber',
      role: 'TENANT',
    },
  });

  const contractor = await prisma.user.upsert({
    where: { email: 'handwerker@rentwizard.local' },
    update: {},
    create: {
      email: 'handwerker@rentwizard.local',
      passwordHash,
      firstName: 'Karl',
      lastName: 'Braun',
      phone: '+491705555555',
      role: 'CONTRACTOR',
    },
  });

  // ── Property ──
  const property = await prisma.property.upsert({
    where: { id: 'seed-property-1' },
    update: {},
    create: {
      id: 'seed-property-1',
      ownerId: owner.id,
      name: 'Musterhaus Berlin',
      street: 'Musterstraße 42',
      city: 'Berlin',
      state: 'Berlin',
      zipCode: '10115',
      country: 'DE',
    },
  });

  // Assign manager
  await prisma.propertyManager.upsert({
    where: {
      propertyId_userId: { propertyId: property.id, userId: manager.id },
    },
    update: {},
    create: { propertyId: property.id, userId: manager.id },
  });

  // ── Units ──
  const unit1 = await prisma.unit.upsert({
    where: { propertyId_unitNumber: { propertyId: property.id, unitNumber: '1A' } },
    update: {},
    create: {
      propertyId: property.id,
      unitNumber: '1A',
      floor: 1,
      rooms: 3,
      area: 75,
      rentAmount: 850,
      isOccupied: true,
    },
  });

  const unit2 = await prisma.unit.upsert({
    where: { propertyId_unitNumber: { propertyId: property.id, unitNumber: '2B' } },
    update: {},
    create: {
      propertyId: property.id,
      unitNumber: '2B',
      floor: 2,
      rooms: 2,
      area: 55,
      rentAmount: 650,
      isOccupied: true,
    },
  });

  const unit3 = await prisma.unit.upsert({
    where: { propertyId_unitNumber: { propertyId: property.id, unitNumber: '3C' } },
    update: {},
    create: {
      propertyId: property.id,
      unitNumber: '3C',
      floor: 3,
      rooms: 4,
      area: 95,
      rentAmount: 1100,
      isOccupied: false,
    },
  });

  // ── Tenant Assignments ──
  await prisma.unitTenant.createMany({
    data: [
      { unitId: unit1.id, userId: tenant1.id, isActive: true, moveIn: new Date('2024-01-01') },
      { unitId: unit2.id, userId: tenant2.id, isActive: true, moveIn: new Date('2024-06-01') },
    ],
    skipDuplicates: true,
  });

  // ── Sample Tickets ──
  const ticket1 = await prisma.ticket.create({
    data: {
      unitId: unit1.id,
      reporterId: tenant1.id,
      title: 'Wasserhahn tropft in der Küche',
      description: 'Der Wasserhahn in der Küche tropft seit 2 Tagen durchgehend. Bitte um schnelle Reparatur.',
      category: 'PLUMBING',
      priority: 'HIGH',
      status: 'OPEN',
      slaAckDeadline: new Date(Date.now() + 2 * 60 * 60 * 1000),
      slaResolveDeadline: new Date(Date.now() + 24 * 60 * 60 * 1000),
    },
  });

  await prisma.ticketComment.create({
    data: {
      ticketId: ticket1.id,
      authorId: manager.id,
      content: 'Danke für die Meldung. Wir schicken morgen einen Handwerker vorbei.',
    },
  });

  const ticket2 = await prisma.ticket.create({
    data: {
      unitId: unit2.id,
      reporterId: tenant2.id,
      title: 'Heizung funktioniert nicht im Schlafzimmer',
      description: 'Die Heizung im Schlafzimmer bleibt kalt trotz aufgedrehtem Thermostat.',
      category: 'HVAC',
      priority: 'URGENT',
      status: 'IN_PROGRESS',
      slaAckDeadline: new Date(Date.now() + 30 * 60 * 1000),
      slaResolveDeadline: new Date(Date.now() + 4 * 60 * 60 * 1000),
    },
  });

  await prisma.ticketAssignment.create({
    data: {
      ticketId: ticket2.id,
      contractorId: contractor.id,
      costEstimate: 250,
    },
  });

  const ticket3 = await prisma.ticket.create({
    data: {
      unitId: unit1.id,
      reporterId: tenant1.id,
      title: 'Glühbirne im Flur defekt',
      description: 'Die Deckenlampe im Flur funktioniert nicht mehr.',
      category: 'ELECTRICAL',
      priority: 'LOW',
      status: 'RESOLVED',
      resolvedAt: new Date(),
    },
  });

  console.log('Seed complete!');
  console.log({
    users: { owner: owner.email, manager: manager.email, tenant1: tenant1.email, tenant2: tenant2.email, contractor: contractor.email },
    property: property.name,
    units: [unit1.unitNumber, unit2.unitNumber, unit3.unitNumber],
    tickets: [ticket1.title, ticket2.title, ticket3.title],
  });
  console.log('\nAll test users have password: Test1234!');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
