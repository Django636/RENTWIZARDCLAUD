import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async getStats(user: any) {
    const propertyWhere = user.role === 'OWNER'
      ? { ownerId: user.id }
      : user.role === 'MANAGER'
        ? { managers: { some: { userId: user.id } } }
        : {};

    const [openTickets, urgentTickets, totalProperties, totalUnits, occupiedUnits, recentTickets] =
      await Promise.all([
        this.prisma.ticket.count({
          where: { status: { in: ['OPEN', 'IN_PROGRESS', 'ESCALATED'] }, unit: { property: propertyWhere } },
        }),
        this.prisma.ticket.count({
          where: { priority: 'URGENT', status: { notIn: ['RESOLVED', 'CLOSED'] }, unit: { property: propertyWhere } },
        }),
        this.prisma.property.count({ where: propertyWhere }),
        this.prisma.unit.count({ where: { property: propertyWhere } }),
        this.prisma.unit.count({ where: { property: propertyWhere, isOccupied: true } }),
        this.prisma.ticket.findMany({
          where: { unit: { property: propertyWhere } },
          orderBy: { createdAt: 'desc' },
          take: 5,
          include: {
            reporter: { select: { firstName: true, lastName: true } },
            unit: { select: { unitNumber: true, property: { select: { name: true } } } },
          },
        }),
      ]);

    const occupancyRate = totalUnits > 0 ? Math.round((occupiedUnits / totalUnits) * 100) : 0;

    return {
      openTickets,
      urgentTickets,
      totalProperties,
      totalUnits,
      occupancyRate,
      recentTickets,
    };
  }
}
